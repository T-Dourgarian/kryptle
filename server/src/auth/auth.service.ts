import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService,
        private jwtService: JwtService
        ) {}

    async signupLocal(dto: AuthDto): Promise<Tokens> {

        const hash = await this.hashData(dto.password)

        const newUser = await this.prisma.user.create({
            data: {
                username: dto.username,
                hash
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

    async signinLocal(dto: AuthDto): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where: {
                username: dto.username
            }
        })

        if (!user) throw new ForbiddenException('Access Denied');


        const passwordMatches = await bcrypt.compare(dto.password, user.hash);

        if (!passwordMatches) throw new ForbiddenException('Access Denied')

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
                sub: userId,
                username,
            }, {
                secret: 'at-secret',
                expiresIn:  60 * 15
            }),
            this.jwtService.signAsync({
                sub: userId,
                username,
            }, {
                secret: 'rt-secret',
                expiresIn:  60 * 60 * 24 * 7
            })
        ])
        
        return {
            access_token: at,
            refresh_token: rt
        }
    }

}
