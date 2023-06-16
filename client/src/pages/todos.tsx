import { type NextPage } from 'next';
import Head from 'next/head';
import TodoItem from '~/components/todo-item';
import date from 'date-and-time';

const Todos: NextPage = () => {
	const today = new Date();
	return (
		<>
			<Head>
				<title>All Tasks - Quick Todo</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex flex-col items-center justify-center h-full">
				<p className="w-3/5 text-3xl">All Tasks</p>
				<div className="w-full">
					<div className="divider w-3/5 mx-auto">
						Due Today - {date.format(today, 'D MMM')}
					</div>
				</div>
				<TodoItem />
				<TodoItem />
				<TodoItem />
				<div className="w-full">
					<div className="divider w-3/5 mx-auto">
						{date.format(date.addDays(today, 1), 'D MMM')}
					</div>
				</div>
				<TodoItem />
				<div className="w-full">
					<div className="divider w-3/5 mx-auto">
						{date.format(date.addDays(today, 2), 'D MMM')}
					</div>
				</div>
				<TodoItem />
				<TodoItem />
				<div className="w-full">
					<div className="divider w-3/5 mx-auto">
						{date.format(date.addDays(today, 3), 'D MMM')}
					</div>
				</div>
				<TodoItem />
				<TodoItem />
			</main>
		</>
	);
};

export default Todos;
