import {
	ChartBar,
	House,
	ListChecks,
	Newspaper,
	PlusSquare,
} from '@phosphor-icons/react';

import Link from 'next/link';
import { authorizeAdmin } from '~/api/router';
import { useQuery } from 'react-query';

const Navigation = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['auth-admin'],
		queryFn: authorizeAdmin,
		refetchOnWindowFocus: false,
	});

	return (
		<div className="fixed w-full bg-white h-16 bottom-0">
			<div className="btm-nav w-2/5 mx-auto">
				<Link href="/new">
					<PlusSquare size={32} />
					<p className="text-sm">New Todo</p>
				</Link>
				<Link href="/">
					<House size={32} />
					<p className="text-sm">Home</p>
				</Link>
				<Link href="/todos">
					<ListChecks size={32} />
					<p className="text-sm">My Todos</p>
				</Link>
				{isLoading || !data?.data ? (
					<></>
				) : (
					<>
						<Link href="/manage">
							<Newspaper size={32} />
							<p className="text-sm">Manage</p>
						</Link>

						<Link href="/report">
							<ChartBar size={32} />
							<p className="text-sm">Stats</p>
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Navigation;
