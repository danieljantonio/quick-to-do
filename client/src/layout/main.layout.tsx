import { FC, PropsWithChildren } from 'react';
import Navigation from '~/components/navigation';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<div className="h-full py-10">{children}</div>
			<nav className="w-full">
				<Navigation />
			</nav>
		</>
	);
};

export default MainLayout;
