import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
type JwtPayload = {
    id: string;
    username: string;
};
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};
