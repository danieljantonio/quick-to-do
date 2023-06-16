import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
	@ApiProperty()
	title: string;

	@ApiProperty({ required: false })
	categoryId?: string;

	@ApiProperty()
	userId: string;

	@ApiProperty()
	dueAt: Date;
}
