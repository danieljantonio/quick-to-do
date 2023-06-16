import AdminLayout from '~/layout/admin.layout';

const Report = () => {
	return (
		<AdminLayout>
			<p className="w-3/5 text-3xl">User Report</p>
			<div className="divider w-3/5 mx-auto"></div>
			<>
				<div className="w-3/5 gap-4 flex">
					<button className="btn btn-info">Last 7 Days</button>
					<button className="btn btn-info btn-outline">
						Next 7 Days
					</button>
				</div>
			</>
		</AdminLayout>
	);
};

export default Report;
