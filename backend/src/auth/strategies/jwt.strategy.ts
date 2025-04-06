import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AccessTokenPayload } from "../types/access-token-payload";
import { JWT_STRATEGY } from "src/common/constants";

export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
    constructor(
        secretOrKey:string
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey,
        });
    }

    async validate(payload: AccessTokenPayload) {
        return { email: payload.email, name: payload.name };
    }
}