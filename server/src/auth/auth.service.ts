import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '..//prisma/prisma.service';
import { AuthDto, SignInDto, SignOutDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
        ) {}

    async signupLocal(dto: AuthDto) {

        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { username: dto.username },
                    { email: dto.email }
                ]
            }
        })


        if (user?.username === dto.username) throw new ForbiddenException('Username already taken');
        if (user?.email === dto.email) throw new ForbiddenException('Email already taken');


        const hash = await this.hashData(dto.password);

        const newUser = await this.prisma.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                hash,
            }
        })

        await this.prisma.stats.create({
            data: {
                userid: newUser.id
            }
        })

        const tokens = await this.getTokens(newUser.id, newUser.username);
        await this.updateRtHash(newUser.id, tokens.refresh_token);
        return tokens;
    }

    async updateRtHash(userId: number, rt: string) {
        const hash = await this.hashData(rt);
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hashedRt: hash
            }
        })
    }   

    async signinLocal(dto: SignInDto){

        const DK = await this.prisma.daily_krypto.findFirst({
            orderBy: {
                created_at: 'desc'
            }
        })

        const user = await this.prisma.user.findUnique({
            where: {
                username: dto.username
            },
            include: {
                solutions: {
                    select: {
                        solution_formatted: true
                    },
                    where: {
                        daily_krypto_id: DK.id
                    }
                }
            }
        })

        if (!user) throw new ForbiddenException('Access Denied');


        const passwordMatches = await bcrypt.compare(dto.password, user.hash);

        if (!passwordMatches) throw new ForbiddenException('Access Denied')

        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRtHash(user.id, tokens.refresh_token);

        const formattedSolutions = user.solutions.map((s) => s.solution_formatted);

        const userData = {
            solveStreak: user.daily_streak,
            currentSeconds: user.solve_timer_seconds,
            solutions: formattedSolutions
        }

        return { tokens, userData };
    }

    async logout(userId: number, dto: SignOutDto) {

        await this.prisma.user.update({
            where: {
                id: userId,
                hashedRt: {
                    not: null
                }
            },
            data: {
                solve_timer_seconds: dto.currentSeconds,
                hashedRt: null
            }
        })
    }

    async refreshTokens(userId: number, rt: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        
        if(!user || !user.hashedRt) throw new ForbiddenException('Access Denied')
        
        const rtMatches = await bcrypt.compare(rt, user.hashedRt)
        if (!rtMatches) throw new ForbiddenException('Access Denied')

        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    
    }

    hashData(data: string)  {
        return bcrypt.hash(data,10)
    }

    async getTokens(userId: number, username: string) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                id: userId,
                username,
            }, {
                secret: this.config.get<string>('AT_SECRET'),
                expiresIn:  60 * 15
            }),
            this.jwtService.signAsync({
                id: userId,
                username,
            }, {
                secret: this.config.get<string>('RT_SECRET'),
                expiresIn:  60 * 60 * 24 * 7
            })
        ])
        
        return {
            access_token: at,
            refresh_token: rt
        }
    }

}
