import { type AppType } from 'next/dist/shared/lib/utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainLayout from '~/layout/main.layout';
import '~/styles/globals.css';

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</QueryClientProvider>
	);
};

export default MyApp;
