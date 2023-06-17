import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';

import { CreateTodoDto } from './dto/create-todo.dto';
import { FindTodoDto } from './dto/list-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqUser } from 'src/users/users.service';
import { Request } from 'express';
import { UpdateTodoDto } from './dto/update-todo.dto';

export const setDateStart = (date: Date) => {
	date.setHours(0, 0, 0, 0);
	return date.toUTCString();
};

export const setDateEnd = (date: Date) => {
	date.setHours(23, 59, 59, 999);
	return date.toUTCString();
};

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

	adminFindAll(req: Request, query: FindTodoDto) {
		const _user = req.user as ReqUser;
		if (!_user) throw new BadRequestException(`No user found`);

		if (_user.role !== 'ADMIN')
			throw new UnauthorizedException('Insufficient Access');

		return this.prisma.todo.findMany({
			where: {
				dueAt: {
					gte: query.dateStart
						? new Date(setDateStart(new Date(query.dateStart)))
						: undefined,
					lte: query.dateEnd
						? new Date(setDateEnd(new Date(query.dateEnd)))
						: undefined,
				},
				isDone: query.isDone ? !!parseInt(query.isDone) : undefined,
			},
			orderBy: {
				dueAt:
					!query.sortDesc || !!!parseInt(query.sortDesc)
						? 'asc'
						: 'desc',
			},
			include: { category: true, user: true },
		});
	}

	findAll(req: Request, query: FindTodoDto) {
		const _user = req.user as ReqUser;
		if (!_user) throw new BadRequestException(`No user found`);

		return this.prisma.todo.findMany({
			where: {
				userId: _user.id,
				dueAt: {
					gte: query.dateStart
						? new Date(setDateStart(new Date(query.dateStart)))
						: undefined,
					lte: query.dateEnd
						? new Date(setDateEnd(new Date(query.dateEnd)))
						: undefined,
				},
				isDone: query.isDone ? !!parseInt(query.isDone) : undefined,
			},
			orderBy: {
				dueAt:
					!query.sortDesc || !!!parseInt(query.sortDesc)
						? 'asc'
						: 'desc',
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

	async remove(id: string) {
		const removed = await this.prisma.todo.delete({ where: { id } });
		return { removed: removed ? true : false };
	}

	async getAdminStatistics(req: Request, query: FindTodoDto) {
		const _user = req.user as ReqUser;
		if (!_user) throw new BadRequestException(`No user found`);

		if (_user.role !== 'ADMIN')
			throw new UnauthorizedException('Insufficient Access');

		const count = await this.prisma.todo.count({
			where: {
				dueAt: {
					gte: query.dateStart
						? new Date(setDateStart(new Date(query.dateStart)))
						: undefined,
					lte: query.dateEnd
						? new Date(setDateEnd(new Date(query.dateEnd)))
						: undefined,
				},
			},
		});

		return { count };
	}
}
