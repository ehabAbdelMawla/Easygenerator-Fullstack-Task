import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { SignupDto } from "./dtos/signup.dto";
import { AuthServiceInterface } from "./interfaces/auth.interface";
import { AuthResponse } from "./types/auth.response";
import { UserRepository } from "src/users/repositories/users.repository";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { UserDocument } from "src/users/schemas/users.schema";
import { AccessTokenPayload } from "./types/access-token-payload";
import { ACCESS_TOKEN_LIFETIME } from "src/common/constants";

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(private readonly usersRepository: UserRepository, private readonly jwtService: JwtService) { }

    async signUp(signupDto: SignupDto): Promise<AuthResponse> {
        try {
            const createdUser = await this.usersRepository.create({ ...signupDto, password: await this.hashPassword(signupDto.password) });
            return { accessToken: this.getAccessToken(createdUser), email: createdUser.email, name: createdUser.name }
        } catch (error) {
            console.log({ error })
            if (error.code == 11000) {
                // Handle MongoDB duplicate key error 
                throw new HttpException('Email already exists', 409);
            } throw error
        }
    }

    async signIn(loginDto: LoginDto): Promise<AuthResponse> {
        const user = await this.usersRepository.findByEmail(loginDto.email);
        if (!user || !await this.validPassword(loginDto.password, user?.password)) throw new UnauthorizedException()
        return { accessToken: this.getAccessToken(user), email: user.email, name: user.name }
    }

    private getAccessToken(user: UserDocument): string {
        return this.jwtService.sign(this.getAccessTokenPayload(user), {
            expiresIn: ACCESS_TOKEN_LIFETIME
        })
    }

    private getAccessTokenPayload(user: UserDocument): AccessTokenPayload {
        return { sub: String(user._id), name: user.name, email: user.email }
    }

    private validPassword(plainPassword: string, hashedPassword): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword)
    }

    private hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

}