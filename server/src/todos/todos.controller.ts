import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Req,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('todos')
@ApiTags('todos')
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
		return this.todosService.create(createTodoDto, req);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	findAll(@Req() req: Request) {
		return this.todosService.findAll(req);
	}

	@Get('/today')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	findAllToday() {
		return this.todosService.findAllToday();
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	findOne(@Param('id') id: string) {
		return this.todosService.findOne(id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
		return this.todosService.update(id, updateTodoDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	remove(@Param('id') id: string) {
		return this.todosService.remove(id);
	}
}
