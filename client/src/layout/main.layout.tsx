import { FC, PropsWithChildren } from 'react';
import Navigation from '~/components/navigation';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			{children}
			<nav className="w-full">
				<Navigation />
			</nav>
		</>
	);
};

export default MainLayout;
