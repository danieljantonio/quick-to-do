import { type NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { getTodos } from '~/api/router';
import TodoItem from '~/components/todo-item';
import { Todo } from '~/types';

const Home: NextPage = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['todos'],
		queryFn: getTodos,
		refetchOnWindowFocus: false,
	});

	const notDoneFirst = (data?: Todo[]) => {
		if (!data) return [];
		return data.sort((todo) => (todo.isDone ? 1 : -1));
	};

	return (
		<>
			<Head>
				<title>Quick Todo</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex flex-col items-center justify-center h-full">
				<p className="w-3/5 text-3xl">Current Tasks</p>
				<div className="w-full">
					<div className="divider w-3/5 mx-auto">Due Today</div>
				</div>
				{isLoading ? (
					<span className="loading loading-bars loading-lg"></span>
				) : (
					<div className="w-full flex flex-col items-center">
						{notDoneFirst(data?.data).map((todo: Todo) => {
							return <TodoItem key={todo.id} {...todo} />;
						})}
					</div>
				)}
			</main>
		</>
	);
};

export default Home;
