import { FC, PropsWithChildren } from 'react';
import Navigation from '~/components/navigation';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<div className="pt-10 pb-20">{children}</div>
			<Navigation />
		</>
	);
};

export default MainLayout;
