// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
const date = require('date-and-time');

// initialize Prisma Client
const prisma = new PrismaClient();

const getDate = (dPlus: number) => {
	const newDate = date.addDays(new Date(), dPlus);
	return new Date(newDate);
};

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
			dueAt: getDate(1),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Perform surgery',
			dueAt: getDate(3),
			userId: user1.id,
			categoryId: category2.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Workout',
			dueAt: new Date(),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Brain Surgery',
			dueAt: getDate(3),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Doctor Appointment for surgery',
			isDone: true,
			dueAt: getDate(-5),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Meet mr. robert for surgery brief',
			isDone: true,
			dueAt: getDate(-5),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Workout',
			isDone: true,
			dueAt: getDate(-6),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Hiking Trip with Medical Team',
			isDone: true,
			dueAt: getDate(-10),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Family Dinner',
			isDone: true,
			dueAt: getDate(-8),
			userId: user1.id,
			categoryId: category3.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Workout',
			isDone: true,
			dueAt: getDate(-8),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Interview new employee',
			dueAt: getDate(4),
			userId: user2.id,
			categoryId: category2.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Hiking Trip 2 with Medical Team (Professor A is joining)',
			dueAt: getDate(6),
			userId: user2.id,
			categoryId: category1.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Team bonding dinner',
			dueAt: getDate(4),
			userId: user1.id,
			categoryId: category2.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Dinner with In-Laws',
			dueAt: getDate(4),
			userId: user1.id,
			categoryId: category3.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Dinner with Parents',
			isDone: true,
			dueAt: getDate(-3),
			userId: user1.id,
			categoryId: category3.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Dinner with Parents',
			dueAt: getDate(7),
			userId: user1.id,
			categoryId: category3.id,
		},
	});

	await prisma.todo.create({
		data: {
			description: 'Date with fiance',
			dueAt: getDate(6),
			userId: user2.id,
			categoryId: category3.id,
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
