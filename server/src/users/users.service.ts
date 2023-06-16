import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export type ReqUser = {
	id: string;
	role: 'ADMIN' | 'USER';
};

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async verifyUser(id: string) {
		const user = await this.prisma.user.findUnique({ where: { id } });
		if (!user) return null;

		return { id, role: user.role };
	}
}
