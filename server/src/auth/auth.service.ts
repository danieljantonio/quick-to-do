import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

import { AuthEntity } from './entity/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqUser } from 'src/users/users.service';
import { Request } from 'express';

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
			accessToken: this.jwtService.sign(
				{ userId: user.id },
				{ expiresIn: '6h' },
			),
		};
	}

	async authorizeUser(req: Request) {
		const _user = req.user as ReqUser;
		console.log(_user);

		if (!_user) throw new BadRequestException(`No user found`);

		const user = await this.prisma.user.findFirst({
			where: { id: _user.id, role: 'ADMIN' },
		});

		if (!user) return false;

		return true;
	}
}
