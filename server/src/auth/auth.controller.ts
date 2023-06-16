import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	login(@Body() { username }: LoginDto) {
		return this.authService.login(username);
	}
}
