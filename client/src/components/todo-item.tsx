import { Circle } from '@phosphor-icons/react';
import { FC } from 'react';
import { Todo } from '~/types';

const TodoItem: FC<Todo> = ({ description }) => {
	const finishTask = () => {
		console.log(description);
	};
	return (
		<div className="card w-1/2 bg-base-100 shadow-sm hover:shadow-md border my-1">
			<div className="card-body p-8 flex-row">
				<button className="relative" onClick={finishTask}>
					<Circle size={32} />
				</button>
				<p className="align-middle leading-8">{description}</p>
			</div>
		</div>
	);
};

export default TodoItem;
