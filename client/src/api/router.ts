import { Category, Todo } from '~/types';

import axios from 'axios';
import date from 'date-and-time';

// Auth configs
const user1Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl5OGJwc2cwMDA2dHlyZnBzenN3ZmN1IiwiaWF0IjoxNjg3MDI1NjA4LCJleHAiOjE2ODcwNDcyMDh9.VqSz8iN0BTE6wxdV6-KGV--MMxLeLOmDjK6NdSwV4cU';
const user2Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl5OGJwc28wMDA4dHlyZnZwZ3dqZXg2IiwiaWF0IjoxNjg3MDI1NjI5LCJleHAiOjE2ODcwNDcyMjl9.RwW3FR8UvM4GtMHV4Mp20NVgsCkEV9rWcbnsS_OhHwU';
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl6M3hyOGQwMDBhdHl5bmowN3NxNXUyIiwiaWF0IjoxNjg3MDIwNDUyLCJleHAiOjE2ODcwNDIwNTJ9.FMSA47XyeyqldKrXIB04k1iyHGBNLMxbPQ5Pk0VARbg';

const config = {
	headers: {
		Authorization: 'Bearer ' + user1Token,
	},
};

// Types
export type TodoQuery = {
	dateStart?: string;
	dateEnd?: string;
	createdStart?: string;
	createdEnd?: string;
	sortDesc?: '0' | '1';
	isDone?: '0' | '1';
};

export type CategoryStats = {
	_count: { categoryId: number };
	categoryId: string;
};

export type TodoStatsReturn = {
	count: number;
	categoryWithCount: CategoryStats[];
};

// Categories
export const getCategories = () => {
	return axios.get<Category[]>('http://localhost:5000/categories');
};

// To do routers
export const getTodosToday = () => {
	return axios.get<Todo[]>(`http://localhost:5000/todos?dateStart=${new Date(setDateStart(new Date())).toISOString()}&dateEnd=${new Date(setDateEnd(new Date())).toISOString()}`, config);
};

export const getTodos = (query?: TodoQuery) => {
	return axios.get<Todo[]>(`http://localhost:5000/todos?${query ? new URLSearchParams(query).toString() : ''}`, config);
};

export const updateTodoStatus = (data: { id: string; isDone: boolean }) => {
	return axios.patch<Todo>(`http://localhost:5000/todos/${data.id}`, { isDone: data.isDone }, config);
};

export const postTodo = (data: { description: string; dueAt: string; categoryId?: string }) => {
	return axios.post<Todo>('http://localhost:5000/todos', data, config);
};

export const deleteTodo = (id: string) => {
	return axios.delete<{ removed: boolean }>(`http://localhost:5000/todos/${id}`, config);
};

// Admin Routes
export const authorizeAdmin = () => {
	return axios.get<{ authorized: boolean }>('http://localhost:5000/auth', config);
};

export const getAdminTodos = (query?: TodoQuery) => {
	return axios.get<Todo[]>(`http://localhost:5000/todos/admin?${query ? new URLSearchParams(query).toString() : ''}`, config);
};

export const getPastWeekStats = () => {
	const dateEnd = new Date();
	dateEnd.setHours(23, 59, 59, 999);
	const dateStart = date.addDays(dateEnd, -7);
	dateStart.setHours(0, 0, 0, 0);

	return axios.get<TodoStatsReturn>(`http://localhost:5000/todos/stats?createdStart=${dateStart.toISOString()}&createdEnd=${dateEnd.toISOString()}`, config);
};

export const getNextWeekStats = () => {
	const dateStart = date.addDays(new Date(), 1);
	dateStart.setHours(0, 0, 0, 0);
	const dateEnd = date.addDays(dateStart, 7);
	dateEnd.setHours(23, 59, 59, 999);

	return axios.get<TodoStatsReturn>(`http://localhost:5000/todos/stats?dateStart=${dateStart.toISOString()}&dateEnd=${dateEnd.toISOString()}`, config);
};
