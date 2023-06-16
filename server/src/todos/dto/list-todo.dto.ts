import { ApiProperty } from '@nestjs/swagger';

export class FindTodoDto {
	@ApiProperty({ required: false })
	dateStart?: string;

	@ApiProperty({ required: false })
	dateEnd?: string;

	@ApiProperty({ required: false })
	sortDesc?: string;

	@ApiProperty({ required: false })
	isDone?: string;
}
