import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config';

type JwtPayload = {
    id: string,
    username: string
}

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
  };

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: config.get<string>('AT_SECRET')
        })
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}