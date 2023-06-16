import axios from 'axios';

const config = {
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGl5OGJwc2cwMDA2dHlyZnBzenN3ZmN1IiwiaWF0IjoxNjg2OTA0NjQyLCJleHAiOjE2ODY5MDQ5NDJ9.TaBevw_y4GQ3POJim0WYXmp4l0PNtqYJnbwqf8SN4us',
	},
};

export const getCategories = async () => {
	return axios.get('http://localhost:5000/categories');
};

export const getTodos = async () => {
	return axios.get('http://localhost:5000/todos', config);
};
