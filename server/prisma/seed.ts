// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
const date = require('date-and-time');

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
	const newDate = new Date();

	const category1 = await prisma.category.upsert({
		where: { name: 'Personal' },
		update: {},
		create: {
			name: 'Personal',
		},
	});

	const category2 = await prisma.category.upsert({
		where: { name: 'Work' },
		update: {},
		create: {
			name: 'Work',
		},
	});

	const category3 = await prisma.category.upsert({
		where: { name: 'Family' },
		update: {},
		create: {
			name: 'Family',
		},
	});

	const user1 = await prisma.user.upsert({
		where: { username: 'daniel' },
		update: {},
		create: {
			username: 'daniel',
			name: 'Daniel',
			role: 'USER',
		},
	});

	const user2 = await prisma.user.upsert({
		where: { username: 'robert' },
		update: {},
		create: {
			username: 'robert',
			name: 'Robert',
			role: 'USER',
		},
	});

	const user3 = await prisma.user.upsert({
		where: { username: 'admin' },
		update: {},
		create: {
			username: 'admin',
			name: 'Admin',
			role: 'ADMIN',
		},
	});

	const todo1 = await prisma.todo.create({
		data: {
			description: 'Perform interview',
			dueAt: date.addHours(newDate, 5).toISOString(),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	const todo2 = await prisma.todo.create({
		data: {
			description: 'Perform surgery',
			dueAt: date.addDays(date.addHours(newDate, 5), 3),
			userId: user1.id,
			categoryId: category2.id,
		},
	});

	const todo3 = await prisma.todo.create({
		data: {
			description: 'Workout',
			dueAt: newDate,
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	const todo4 = await prisma.todo.create({
		data: {
			description: 'Brain Surgery',
			dueAt: newDate,
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	const pastTodo1 = await prisma.todo.create({
		data: {
			description: 'Workout',
			isDone: true,
			dueAt: date.addHours(newDate, -1),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	const pastTodo2 = await prisma.todo.create({
		data: {
			description: 'Workout',
			isDone: true,
			dueAt: date.addHours(newDate, -3),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	const pastTodo3 = await prisma.todo.create({
		data: {
			description: 'Workout',
			isDone: true,
			dueAt: date.addHours(newDate, -5),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	const pastTodo4 = await prisma.todo.create({
		data: {
			description: 'Workout',
			isDone: true,
			dueAt: date.addHours(newDate, -2),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	const pastTodo5 = await prisma.todo.create({
		data: {
			description: 'Workout',
			isDone: true,
			dueAt: date.addHours(newDate, -3),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	const pastTodo6 = await prisma.todo.create({
		data: {
			description: 'Workout',
			isDone: true,
			dueAt: date.addHours(newDate, -8),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	const pastTodo7 = await prisma.todo.create({
		data: {
			description: 'Interview new employee',
			isDone: true,
			dueAt: date.addHours(newDate, -4),
			userId: user2.id,
			categoryId: category2.id,
		},
	});

	console.log('DB has been seeded');
}

// execute the main function
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		// close Prisma Client at the end
		await prisma.$disconnect();
	});
