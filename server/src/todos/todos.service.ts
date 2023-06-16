import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateTodoDto } from './dto/create-todo.dto';
import { FindTodoDto } from './dto/list-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqUser } from 'src/users/users.service';
import { Request } from 'express';
import { UpdateTodoDto } from './dto/update-todo.dto';

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

	findAll(req: Request, query: FindTodoDto) {
		const _user = req.user as ReqUser;
		if (!_user) throw new BadRequestException(`No user found`);

		return this.prisma.todo.findMany({
			where: {
				userId: _user.id,
				dueAt: {
					gte: new Date(query.dateStart) || undefined,
					lte: new Date(query.dateEnd) || undefined,
				},
			},
			orderBy: {
				dueAt: query.sortDesc ? 'desc' : 'asc',
			},
			include: { category: true },
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
