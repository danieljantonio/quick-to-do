// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
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
			role: 'USER',
		},
	});

	const todo1 = await prisma.todo.create({
		data: {
			title: 'Perform interview',
			dueAt: new Date(),
			userId: user1.id,
			categoryId: category1.id,
		},
	});

	console.log({ category1, category2, category3, user1, user2, user3, todo1 });
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
