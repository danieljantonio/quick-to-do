import { BellRinging, ListPlus } from '@phosphor-icons/react';
import {
	CategoryStats,
	getCategories,
	getNextWeekStats,
	getPastWeekStats,
} from '~/api/router';
import { FC, useState } from 'react';

import AdminLayout from '~/layout/admin.layout';
import { Category } from '~/types';
import { Pie } from 'react-chartjs-2';
import { useQuery } from 'react-query';

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

	const { isLoading: catIsLoading, data: catData } = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
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
					<div className="w-3/5 flex justify-between">
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
									: nwData?.data.count}{' '}
								todos
							</div>
							<div className="stat-desc text-sm">
								{isPastStats
									? 'added the past week'
									: 'due next week'}
							</div>
						</div>

						{catData?.data && pwData?.data && nwData?.data ? (
							isPastStats ? (
								<PieChart
									categories={catData?.data || []}
									chartData={
										pwData?.data.categoryWithCount || []
									}
								/>
							) : (
								<PieChart
									categories={catData?.data || []}
									chartData={
										nwData?.data.categoryWithCount || []
									}
								/>
							)
						) : null}
					</div>
				)}
			</>
		</AdminLayout>
	);
};

type ChartProps = {
	categories: Category[];
	chartData: CategoryStats[];
};

const PieChart: FC<ChartProps> = ({ categories, chartData }) => {
	const labels: string[] = [];
	const datas: number[] = [];

	categories.forEach((category) => {
		labels.push(category.name);
		chartData.forEach((data) => {
			if (data.categoryId === category.id)
				datas.push(data._count.categoryId);
		});
		if (labels.length !== datas.length) datas.push(0);
	});

	const data = {
		labels: labels,
		datasets: [
			{
				data: datas,
				hoverOffset: 4,
			},
		],
	};

	return (
		<div className="w-1/2">
			<Pie data={data} />
		</div>
	);
};

export default Report;
