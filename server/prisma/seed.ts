// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
const date = require('date-and-time');
const newDate = new Date();

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
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

	await prisma.todo.create({
		data: {
			description: 'Perform interview',
			dueAt: date.addHours(newDate, 1).toISOString(),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Perform surgery',
			dueAt: date.addDays(date.addHours(newDate, 3), 3),
			userId: user1.id,
			categoryId: category2.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Workout',
			dueAt: newDate,
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Brain Surgery',
			dueAt: date.addDays(date.addHours(newDate, 3), 3),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Doctor Appointment for surgery',
			isDone: true,
			dueAt: date.addHours(newDate, -5),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Meet mr. robert for surgery brief',
			isDone: true,
			dueAt: date.addHours(newDate, -5),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Workout',
			isDone: true,
			dueAt: date.addHours(newDate, -6),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Hiking Trip with Medical Team',
			isDone: true,
			dueAt: date.addHours(newDate, -10),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Family Dinner',
			isDone: true,
			dueAt: date.addHours(newDate, -8),
			userId: user1.id,
			categoryId: category3.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Workout',
			isDone: true,
			dueAt: date.addHours(newDate, -8),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
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
