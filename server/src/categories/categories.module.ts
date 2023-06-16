import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	controllers: [CategoriesController],
	providers: [CategoriesService],
	imports: [PrismaModule],
})
export class CategoriesModule {}
