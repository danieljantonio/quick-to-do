import { BellRinging, ListChecks, ListPlus } from '@phosphor-icons/react';
import { getNextWeekStats, getPastWeekStats } from '~/api/router';

import AdminLayout from '~/layout/admin.layout';
import { useQuery } from 'react-query';
import { useState } from 'react';

const Report = () => {
	const [isPastStats, setPastStats] = useState(false);

	const { isLoading: pwStatsLoading, data: pwData } = useQuery({
		queryKey: ['past-week-stats'],
		queryFn: getPastWeekStats,
		refetchOnWindowFocus: false,
	});

	const { isLoading: nwStatsLoading, data: nwData } = useQuery({
		queryKey: ['coming-week-stats'],
		queryFn: getNextWeekStats,
		refetchOnWindowFocus: false,
	});

	return (
		<AdminLayout>
			<p className="w-3/5 text-3xl">User Report</p>
			<div className="divider w-3/5 mx-auto"></div>
			<>
				<div className="w-3/5 gap-4 flex">
					<button
						onClick={() => setPastStats(true)}
						className={`btn btn-info ${
							!isPastStats && 'btn-outline'
						}`}>
						Last 7 Days
					</button>
					<button
						onClick={() => setPastStats(false)}
						className={`btn btn-info ${
							isPastStats && 'btn-outline'
						}`}>
						Next 7 Days
					</button>
				</div>

				{pwStatsLoading || nwStatsLoading ? (
					<span className="loading loading-bars loading-lg"></span>
				) : (
					<div className="w-3/5">
						<div className="stat self-start w-fit border rounded-lg mt-4">
							<div className="stat-figure text-primary">
								{isPastStats ? (
									<ListPlus size={32} />
								) : (
									<BellRinging size={32} />
								)}
							</div>
							<div className="stat-value text-primary">
								{isPastStats
									? pwData?.data.count
									: nwData?.data.count}
							</div>
							<div className="stat-desc text-sm">
								{isPastStats
									? 'Todos added the past week'
									: 'Todos due next week'}
							</div>
						</div>
					</div>
				)}
			</>
		</AdminLayout>
	);
};

export default Report;
