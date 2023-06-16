export type Category = {
	id: string;
	name: string;
};

export type Todo = {
	id: string;
	description: string;
	category: Category;
	categoryId: string;
	isDone: boolean;
	userId: string;
	dueAt: date;
};
