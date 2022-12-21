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
import Map from './routers/Map';
import About from './routers/About';
import History from './routers/History';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/introduce',
		element: <Introduce />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/calendar',
		element: <Calendar />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/map',
		element: <Map />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/about',
		element: <About />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/history',
		element: <History />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'display/:displayId',
		element: <Display />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
