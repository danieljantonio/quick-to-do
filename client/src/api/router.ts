import axios from 'axios';

const user1Token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl5OGJwc2cwMDA2dHlyZnBzenN3ZmN1IiwiaWF0IjoxNjg2OTI4ODU0LCJleHAiOjE2ODY5MzI0NTR9.OGB87vNz3FxVFRTJX058_D5JIpVELIxc26lMz0dYFvQ';
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
	return axios.get('http://localhost:5000/categories');
};

export const getTodos = async () => {
	return axios.get('http://localhost:5000/todos', config);
};
