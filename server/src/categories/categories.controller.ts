import { Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Get()
	findAll() {
		return this.categoriesService.findAll();
	}
}
