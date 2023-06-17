import { TodoQuery, getAdminTodos } from '~/api/router';
import { useEffect, useState } from 'react';

import AdminLayout from '~/layout/admin.layout';
import { Todo } from '~/types';
import TodoFilter from '~/components/todo-filter';
import TodoItem from '~/components/todo-item';
import { useQuery } from 'react-query';

const Manage = () => {
	const [filters, setFilters] = useState<TodoQuery>({});

	const { isLoading, data, refetch } = useQuery({
		queryKey: ['admin-todos'],
		queryFn: () => getAdminTodos(filters),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		refetch();
	}, [filters]);

	const notDoneFirst = (data?: Todo[]) => {
		if (!data) return [];
		return data.sort((todo) => (todo.isDone ? 1 : -1));
	};

	return (
		<AdminLayout>
			<div className="w-3/5 flex justify-between">
				<p className="w-3/5 text-3xl">Manage Users' Todos</p>
				<div className="flex gap-4"></div>
			</div>
			<div className="w-3/5 mx-auto">
				<div className="divider"></div>
				<TodoFilter filters={filters} setFilters={setFilters} />
			</div>
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
