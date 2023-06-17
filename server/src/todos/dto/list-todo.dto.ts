import { ApiProperty } from '@nestjs/swagger';

export class FindTodoDto {
	@ApiProperty({ required: false })
	dateStart?: string;

	@ApiProperty({ required: false })
	dateEnd?: string;

	@ApiProperty({ required: false })
	createdStart?: string;

	@ApiProperty({ required: false })
	createdEnd?: string;

	@ApiProperty({ required: false })
	sortDesc?: string;

	@ApiProperty({ required: false })
	isDone?: string;
}
