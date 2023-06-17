import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { TodoQuery, getAdminTodos } from '~/api/router';

import AdminLayout from '~/layout/admin.layout';
import { FunnelSimple } from '@phosphor-icons/react';
import { Todo } from '~/types';
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

const TodoFilter: FC<{
	filters: TodoQuery;
	setFilters: Dispatch<SetStateAction<TodoQuery>>;
}> = ({ filters, setFilters }) => {
	const [show, setShow] = useState(false);

	return (
		<>
			{/* Open the modal using ID.showModal() method */}
			<input
				type="checkbox"
				readOnly
				checked={show}
				className="modal-toggle"
			/>
			<div className="modal !mt-0">
				<div className="modal-box relative">
					<label
						className="btn text-white btn-error btn-sm btn-circle absolute right-3 top-3"
						onClick={() => setShow(false)}>
						✕
					</label>
					<h3 className="font-bold text-lg">Filters</h3>
					<p className="text-md">Filter by due date</p>
					<div className="join w-full">
						<button className="btn btn-disabled text-white join-item w-1/4 rounded-r-full">
							Start
						</button>
						<input
							onChange={(e) =>
								setFilters({
									...filters,
									dateStart: e.target.value,
								})
							}
							type="date"
							className="input input-bordered w-full join-item"
						/>
					</div>
					<div className="join w-full pb-2">
						<button className="btn btn-disabled text-white join-item w-1/4 rounded-r-full">
							End
						</button>
						<input
							onChange={(e) =>
								setFilters({
									...filters,
									dateEnd: e.target.value,
								})
							}
							type="date"
							className="input input-bordered w-full join-item"
						/>
					</div>
				</div>
			</div>
			<button
				className="hover:text-gray-600 w-fit float-right"
				onClick={() => setShow(true)}>
				<FunnelSimple size={32} weight="fill" />
			</button>
		</>
	);
};

export default Manage;
