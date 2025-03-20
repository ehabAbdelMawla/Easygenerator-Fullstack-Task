import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SignupDto } from "./dtos/signup.dto";
import { LoginDto } from "./dtos/login.dto";
import { AuthResponse } from "./types/auth.response";
import { AuthService } from "./auth.service";
import { ApiBody, ApiResponse } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {


    constructor(private readonly authService: AuthService) { }

    @Post("signup")
    @ApiResponse({ status: 200, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 409, description: 'Email is already exists' })
    @ApiBody({ type: SignupDto })
    @HttpCode(HttpStatus.OK)
    signUp(@Body() signupDto: SignupDto): Promise<AuthResponse> {
        return this.authService.signUp(signupDto);
    }

    @Post("signin")
    @ApiResponse({ status: 200, description: 'User Login successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Invalid Credintials' })
    @ApiBody({ type: LoginDto })
    @HttpCode(HttpStatus.OK)
    signIn(@Body() loginDto: LoginDto): Promise<AuthResponse> {
        return this.authService.signIn(loginDto);
    }



}