import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('users')
@ApiBearerAuth()
export class UsersController {
    @Get('info')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Get User Info' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getUserInfo(@Req() request) {
        return request.user
    }
}