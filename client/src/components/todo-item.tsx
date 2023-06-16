import { CheckCircle, Circle } from '@phosphor-icons/react';

import { FC } from 'react';
import { Todo } from '~/types';
import date from 'date-and-time';

const TodoItem: FC<Todo> = ({ description, isDone, dueAt, category }) => {
	const finishTask = () => {
		console.log(description);
	};

	return (
		<div
			className={`card w-1/2 bg-base-100 shadow-sm hover:shadow-md border my-1 ${
				isDone ? 'bg-gray-200' : ''
			}`}>
			<div className="card-body p-8 flex-row">
				{isDone ? (
					<button className="relative" onClick={finishTask}>
						<CheckCircle size={32} />
					</button>
				) : (
					<button className="relative" onClick={finishTask}>
						<Circle size={32} />
					</button>
				)}
				<div className="w-full flex justify-between">
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
		</div>
	);
};

export default TodoItem;
