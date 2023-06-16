import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthEntity } from './entity/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
	) {}

	async login(username: string): Promise<AuthEntity> {
		const user = await this.prisma.user.findUnique({ where: { username } });
		if (!user) {
			throw new NotFoundException(`No user found for email: ${username}`);
		}

		return {
			accessToken: this.jwtService.sign({ userId: user.id }),
		};
	}
}
