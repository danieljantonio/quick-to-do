import { Category, Todo } from '~/types';

import axios from 'axios';

const user1Token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl5OGJwc2cwMDA2dHlyZnBzenN3ZmN1IiwiaWF0IjoxNjg2OTM3MDUzLCJleHAiOjE2ODY5NTg2NTN9.oIeh22BKfPrCeIUkgATV_Hi5ztegSqrj-G51y1svBFY';
const user2Token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl5OGJwc28wMDA4dHlyZnZwZ3dqZXg2IiwiaWF0IjoxNjg2OTUyMjc4LCJleHAiOjE2ODY5NzM4Nzh9.3nfy7x1KvI2HIxVmn070W94GdPX9dUGtsW55XLLw0To';
const adminToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl6M3hyOGQwMDBhdHl5bmowN3NxNXUyIiwiaWF0IjoxNjg2OTUyNDc1LCJleHAiOjE2ODY5NzQwNzV9.kunZDLz-Ci-IP9-I06dpPUEXbhHdIDZN-f-u6vXZ8qo';

const config = {
	headers: {
		Authorization: 'Bearer ' + adminToken,
	},
};

export const getCategories = async () => {
	return axios.get<Category[]>('http://localhost:5000/categories');
};

export type TodoQuery = {
	dateStart?: string;
	dateEnd?: string;
	sortDesc?: '0' | '1';
	isDone?: '0' | '1';
};

export const getTodosToday = async () => {
	return axios.get<Todo[]>(
		`http://localhost:5000/todos?dateStart=${new Date()}&dateEnd=${new Date()}`,
		config,
	);
};

export const getTodos = async (query?: TodoQuery) => {
	return axios.get<Todo[]>(
		`http://localhost:5000/todos?${
			query ? new URLSearchParams(query).toString() : ''
		}`,
		config,
	);
};

export const updateTodoStatus = async (data: {
	id: string;
	isDone: boolean;
}) => {
	return axios.patch<Todo>(
		`http://localhost:5000/todos/${data.id}`,
		{ isDone: data.isDone },
		config,
	);
};

export const postTodo = async (data: {
	description: string;
	dueAt: string;
	categoryId?: string;
}) => {
	return axios.post<Todo>('http://localhost:5000/todos', data, config);
};

export const deleteTodo = async (id: string) => {
	return axios.delete<{ removed: boolean }>(
		`http://localhost:5000/todos/${id}`,
		config,
	);
};

export const authorizeAdmin = async () => {
	return axios.get<{ authorized: boolean }>(
		'http://localhost:5000/auth',
		config,
	);
};
