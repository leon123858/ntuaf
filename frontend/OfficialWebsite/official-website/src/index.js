import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './error-page';
import reportWebVitals from './reportWebVitals';
import Home from './routers/Home';
import Display from './routers/Display';
import Introduce from './routers/Introduce';
import Calendar from './routers/Calendar';
import About from './routers/About';
import History from './routers/History';
import Layout from './components/Layout/Layout';
import { BreakPointProvider } from './useBreakPoint.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		loader: async () => {
			return {};
		},
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/introduce/:type',
				element: <Introduce />,
			},
			{
				path: '/calendar',
				element: <Calendar />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/history',
				element: <History />,
			},
		],
		errorElement: <ErrorPage />,
	},
	{
		path: 'display/:displayId',
		element: (
			<>
				<Layout />
				<Display />
			</>
		),
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BreakPointProvider>
			<RouterProvider router={router} />
		</BreakPointProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
