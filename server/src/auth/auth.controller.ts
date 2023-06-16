import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	login(@Body() { username }: LoginDto) {
		return this.authService.login(username);
	}

	@Get('/')
	authorizeUser(@Req() req: Request) {
		return this.authService.authorizeUser(req);
	}
}
