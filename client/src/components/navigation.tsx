import { CalendarCheck, CellSignalFull, House } from '@phosphor-icons/react';

const Navigation = () => {
	return (
		<div className="btm-nav w-2/5 mx-auto">
			<button>
				<House size={32} />
			</button>
			<button>
				<CalendarCheck size={32} />
			</button>
			<button>
				<CellSignalFull size={32} />
			</button>
		</div>
	);
};

export default Navigation;
