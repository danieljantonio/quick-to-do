import { Category, Todo } from '~/types';

import axios from 'axios';

const user1Token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl5OGJwc2cwMDA2dHlyZnBzenN3ZmN1IiwiaWF0IjoxNjg2OTM3MDUzLCJleHAiOjE2ODY5NTg2NTN9.oIeh22BKfPrCeIUkgATV_Hi5ztegSqrj-G51y1svBFY';
const user2Token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl5OGJwc2cwMDA2dHlyZnBzenN3ZmN1IiwiaWF0IjoxNjg2OTA1ODQ3LCJleHAiOjE2ODY5MDk0NDd9.aEaXbkodwIY0xN5kYK1SoZPyGjsnKS_1AYKShWkTxVk';
const adminToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl5OGJwc2cwMDA2dHlyZnBzenN3ZmN1IiwiaWF0IjoxNjg2OTA1ODQ3LCJleHAiOjE2ODY5MDk0NDd9.aEaXbkodwIY0xN5kYK1SoZPyGjsnKS_1AYKShWkTxVk';

const config = {
	headers: {
		Authorization: 'Bearer ' + user1Token,
	},
};

export const getCategories = async () => {
	return axios.get<Category[]>('http://localhost:5000/categories');
};

export const getTodos = async () => {
	return axios.get<Todo[]>('http://localhost:5000/todos', config);
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
