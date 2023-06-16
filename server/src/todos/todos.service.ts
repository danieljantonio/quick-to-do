import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

import { CreateTodoDto } from './dto/create-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqUser } from 'src/users/users.service';
import { Request } from 'express';
import { UpdateTodoDto } from './dto/update-todo.dto';
import date from 'date-and-time';

@Injectable()
export class TodosService {
	constructor(private prisma: PrismaService) {}
	async create(createTodoDto: CreateTodoDto, req: Request) {
		const _user = req.user as ReqUser;
		if (!_user) throw new BadRequestException(`No user found`);

		return this.prisma.todo.create({
			data: {
				...createTodoDto,
				userId: _user.id,
			},
		});
	}

	findAll(req: Request) {
		const _user = req.user as ReqUser;
		if (!_user) throw new BadRequestException(`No user found`);

		console.log({
			where: { userId: _user.id },
			orderBy: {
				dueAt: 'asc',
			},
			include: { category: true },
		});

		return this.prisma.todo.findMany({
			where: { userId: _user.id },
			orderBy: {
				dueAt: 'asc',
			},
			include: { category: true },
		});
	}

	findAllToday() {
		return this.prisma.todo.findMany({
			where: {
				dueAt: {
					gte: date.format(new Date(), 'YYYY-MM-DD'),
					lt: date.format(date.addDays(new Date(), 1), 'YYYY-MM-DD'),
				},
			},
		});
	}

	findOne(id: string) {
		return this.prisma.todo.findUnique({ where: { id } });
	}

	update(id: string, updateTodoDto: UpdateTodoDto) {
		return this.prisma.todo.update({
			where: { id },
			data: updateTodoDto,
		});
	}

	remove(id: string) {
		return this.prisma.todo.delete({ where: { id } });
	}
}
