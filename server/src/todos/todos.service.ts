import { CreateTodoDto } from './dto/create-todo.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { UpdateTodoDto } from './dto/update-todo.dto';
import date from 'date-and-time';

@Injectable()
export class TodosService {
	constructor(private prisma: PrismaService) {}
	create(createTodoDto: CreateTodoDto, req: Request) {
		return this.prisma.todo.create({ data: createTodoDto });
	}

	findAll(req: Request) {
		console.log({
			where: { userId: req.user },
			include: { category: true },
		});

		return this.prisma.todo.findMany({
			where: { userId: req.user },
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
		return `This action updates a #${id} todo`;
	}

	remove(id: string) {
		return this.prisma.todo.delete({ where: { id } });
	}
}
