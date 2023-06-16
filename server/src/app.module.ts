import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
	imports: [PrismaModule, TodosModule, UsersModule, AuthModule, CategoriesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
