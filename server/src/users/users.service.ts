import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	verifyUser(id: string) {
		const user = this.prisma.user.findUnique({ where: { id } });
		if (!user) return null;
		return id;
	}
}
