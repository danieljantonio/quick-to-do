import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
	@ApiProperty()
	description: string;

	@ApiProperty({ required: false })
	categoryId?: string;

	@ApiProperty({ required: false })
	isDone: boolean;

	@ApiProperty()
	userId: string;

	@ApiProperty()
	dueAt: Date;
}
