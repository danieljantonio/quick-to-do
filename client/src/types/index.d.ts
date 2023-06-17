export type Category = {
	id: string;
	name: string;
};

export type User = {
	id: string;
	name: string;
	username: string;
};

export type Todo = {
	id: string;
	description: string;
	category?: Category;
	categoryId?: string;
	isDone: boolean;
	userId: string;
	user?: User;
	dueAt: date;
};
