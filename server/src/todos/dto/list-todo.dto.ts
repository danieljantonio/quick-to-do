import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
	@ApiProperty({ required: false })
	categoryId?: string;
}
