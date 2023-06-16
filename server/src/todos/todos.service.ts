import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
	constructor(private prisma: PrismaService) {}
	create(createTodoDto: CreateTodoDto) {
		return this.prisma.todo.create({ data: createTodoDto });
	}

	findAll() {
		return this.prisma.todo.findMany();
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
