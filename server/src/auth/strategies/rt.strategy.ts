import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from "@nestjs/common";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'rt-secret',
            passReqToCalllback: true
        })
    }

    validate(req: Request, payload: any) {
        const resfreshToken = req.get('authorization').replace('Bearer','').trim()
        return {
            ...payload,
            resfreshToken
        };
    }
}