import { CalendarCheck, CellSignalFull, House } from '@phosphor-icons/react';
import Link from 'next/link';

const Navigation = () => {
	return (
		<div className="fixed w-full bg-white h-16 bottom-0">
			<div className="btm-nav w-2/5 mx-auto">
				<Link href="/">
					<House size={32} />
				</Link>
				<Link href="/todos">
					<CalendarCheck size={32} />
				</Link>
				<button>
					<CellSignalFull size={32} />
				</button>
			</div>
		</div>
	);
};

export default Navigation;
