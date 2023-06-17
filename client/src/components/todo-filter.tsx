import { Dispatch, FC, SetStateAction, useState } from 'react';

import { FunnelSimple } from '@phosphor-icons/react';
import { TodoQuery } from '~/api/router';

const TodoFilter: FC<{
	filters: TodoQuery;
	setFilters: Dispatch<SetStateAction<TodoQuery>>;
}> = ({ filters, setFilters }) => {
	const [show, setShow] = useState(false);

	return (
		<>
			{/* Open the modal using ID.showModal() method */}
			<input type="checkbox" readOnly checked={show} className="modal-toggle" />
			<div className="modal !mt-0">
				<div className="modal-box relative">
					<label className="btn text-white btn-error btn-sm btn-circle absolute right-3 top-3" onClick={() => setShow(false)}>
						✕
					</label>
					<h3 className="font-bold text-lg">Filters</h3>
					<p className="text-md">Filter by due date</p>
					<div className="flex space-y-4 flex-col">
						<div className="join w-full">
							<button className="btn btn-disabled text-white join-item w-1/4 rounded-r-full">Start</button>
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
							<button className="btn btn-disabled text-white join-item w-1/4 rounded-r-full">End</button>
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
			</div>
			<button className="hover:text-gray-600 w-fit float-right" onClick={() => setShow(true)}>
				<FunnelSimple size={32} weight="fill" />
			</button>
		</>
	);
};

export default TodoFilter;
