import { Category, Todo } from '~/types';

import axios from 'axios';
import date from 'date-and-time';

const user1Token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl5OGJwc2cwMDA2dHlyZnBzenN3ZmN1IiwiaWF0IjoxNjg2OTM3MDUzLCJleHAiOjE2ODY5NTg2NTN9.oIeh22BKfPrCeIUkgATV_Hi5ztegSqrj-G51y1svBFY';
const user2Token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl5OGJwc28wMDA4dHlyZnZwZ3dqZXg2IiwiaWF0IjoxNjg2OTUyMjc4LCJleHAiOjE2ODY5NzM4Nzh9.3nfy7x1KvI2HIxVmn070W94GdPX9dUGtsW55XLLw0To';
const adminToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl6M3hyOGQwMDBhdHl5bmowN3NxNXUyIiwiaWF0IjoxNjg2OTk4NzI1LCJleHAiOjE2ODcwMjAzMjV9.SyN5xnXWINDT00V75WQiAzReyJ45QOJLTnMykQlWp9U';

const config = {
	headers: {
		Authorization: 'Bearer ' + adminToken,
	},
};

export const getCategories = () => {
	return axios.get<Category[]>('http://localhost:5000/categories');
};

export type TodoQuery = {
	dateStart?: string;
	dateEnd?: string;
	sortDesc?: '0' | '1';
	isDone?: '0' | '1';
};

export const getTodosToday = () => {
	return axios.get<Todo[]>(
		`http://localhost:5000/todos?dateStart=${new Date().toISOString()}&dateEnd=${new Date().toISOString()}`,
		config,
	);
};

export const getTodos = (query?: TodoQuery) => {
	return axios.get<Todo[]>(
		`http://localhost:5000/todos?${
			query ? new URLSearchParams(query).toString() : ''
		}`,
		config,
	);
};

export const updateTodoStatus = (data: { id: string; isDone: boolean }) => {
	return axios.patch<Todo>(
		`http://localhost:5000/todos/${data.id}`,
		{ isDone: data.isDone },
		config,
	);
};

export const postTodo = (data: {
	description: string;
	dueAt: string;
	categoryId?: string;
}) => {
	return axios.post<Todo>('http://localhost:5000/todos', data, config);
};

export const deleteTodo = (id: string) => {
	return axios.delete<{ removed: boolean }>(
		`http://localhost:5000/todos/${id}`,
		config,
	);
};

export const authorizeAdmin = () => {
	return axios.get<{ authorized: boolean }>(
		'http://localhost:5000/auth',
		config,
	);
};

export const getAdminTodos = (query?: TodoQuery) => {
	return axios.get<Todo[]>(
		`http://localhost:5000/todos/admin?${
			query ? new URLSearchParams(query).toString() : ''
		}`,
		config,
	);
};

// add router for past 7 day stats (include today)
export const getPastWeekStats = () => {
	const dateEnd = new Date();
	dateEnd.setHours(23, 59, 59, 999);
	const dateStart = date.addDays(dateEnd, -7);
	dateStart.setHours(0, 0, 0, 0);

	return axios.get<{ count: number }>(
		`http://localhost:5000/todos/stats?createdStart=${dateStart.toISOString()}&createdEnd=${dateEnd.toISOString()}`,
		config,
	);
};

// add router for next 7 day stats (starts from tomorrow)
export const getNextWeekStats = () => {
	const dateStart = date.addDays(new Date(), 1);
	dateStart.setHours(0, 0, 0, 0);
	const dateEnd = date.addDays(dateStart, 7);
	dateEnd.setHours(23, 59, 59, 999);

	return axios.get<{ count: number }>(
		`http://localhost:5000/todos/stats?dateStart=${dateStart.toISOString()}&dateEnd=${dateEnd.toISOString()}`,
		config,
	);
};
