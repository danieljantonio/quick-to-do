import { TodoQuery, getAdminTodos } from '~/api/router';

import AdminLayout from '~/layout/admin.layout';
import { Todo } from '~/types';
import TodoItem from '~/components/todo-item';
import { useQuery } from 'react-query';
import { useState } from 'react';

const Manage = () => {
	const [filters, setFilters] = useState<TodoQuery>({});

	const { isLoading, data } = useQuery({
		queryKey: ['admin-todos'],
		queryFn: () => getAdminTodos(filters),
		refetchOnWindowFocus: false,
	});

	const notDoneFirst = (data?: Todo[]) => {
		if (!data) return [];
		return data.sort((todo) => (todo.isDone ? 1 : -1));
	};

	return (
		<AdminLayout>
			<p className="w-3/5 text-3xl">Manage Users' Todos</p>
			<div className="divider w-3/5 mx-auto"></div>
			{isLoading ? (
				<span className="loading loading-bars loading-lg"></span>
			) : (
				<div className="flex flex-col w-full items-center">
					{notDoneFirst(data?.data).map((todo) => {
						return <TodoItem {...todo} key={todo.id} />;
					})}
				</div>
			)}
		</AdminLayout>
	);
};

export default Manage;
