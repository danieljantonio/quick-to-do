import { CheckCircle, Circle, XCircle } from '@phosphor-icons/react';
import { deleteTodo, updateTodoStatus } from '~/api/router';
import { useMutation, useQueryClient } from 'react-query';

import { FC } from 'react';
import { Todo } from '~/types';
import date from 'date-and-time';
import { useRouter } from 'next/router';

const TodoItem: FC<Todo> = ({ id, description, isDone, dueAt, category }) => {
	const queryClient = useQueryClient();
	const { pathname } = useRouter();

	const { mutate: mutateDelete } = useMutation({
		mutationFn: deleteTodo,
		onSuccess: () => {
			if (pathname === '/')
				queryClient.invalidateQueries({
					queryKey: ['todos-today'],
				});
			else
				queryClient.invalidateQueries({
					queryKey: ['todos'],
				});
		},
	});

	const updateTask = useMutation({
		mutationFn: updateTodoStatus,
		onSuccess: () => {
			if (pathname === '/')
				queryClient.invalidateQueries({
					queryKey: ['todos-today'],
				});
			else
				queryClient.invalidateQueries({
					queryKey: ['todos'],
				});
		},
	});

	const toggleTask = () => {
		updateTask.mutate({ id, isDone: !isDone });
	};

	const deleteTask = () => {
		mutateDelete(id);
	};

	return (
		<div
			className={`group indicator card relative w-1/2 bg-base-100 shadow-sm hover:shadow-md border my-2 ${
				isDone ? 'bg-gray-200' : ''
			}`}>
			<div className="card-body p-4 flex-row">
				{isDone ? (
					<button className="relative" onClick={toggleTask}>
						<CheckCircle size={32} />
					</button>
				) : (
					<button className="relative" onClick={toggleTask}>
						<Circle size={32} />
					</button>
				)}
				<div className="w-full flex justify-between my-4 mx-4">
					<div>
						<p className="align-middle leading-8">{description}</p>
						<p className="align-middle leading-8 text-sm">
							{date.format(new Date(dueAt), 'D MMM HH:MM')}
						</p>
					</div>
					<div className="flex items-center">
						<p className="align-middle leading-8">
							{category.name}
						</p>
					</div>
				</div>
			</div>
			<button
				className="indicator-item invisible group-hover:visible hover:cursor-pointer text-red-600 hover:text-red-700"
				onClick={deleteTask}>
				<XCircle size={28} weight="fill" />
			</button>
		</div>
	);
};

export default TodoItem;
