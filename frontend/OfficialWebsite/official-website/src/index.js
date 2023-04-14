import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	useLocation,
} from 'react-router-dom';
import './index.css';
import ErrorPage from './error-page';
import reportWebVitals from './reportWebVitals';
import Home from './routers/Home';
import Display from './routers/Display';
import Introduce from './routers/Introduce';
import Calendar from './routers/Calendar';
import About from './routers/About';
import History from './routers/History';
import Artwork from './routers/Artwork';
import ArtworkList from './routers/ArtworkList';
import Map from './routers/Map';
import PsyTest from './routers/PsyTest';
import Layout from './components/Layout/Layout';
import { BreakPointProvider } from './useBreakPoint.jsx';
import Artworkupload from './routers/Artworkupload';
import { getMonthsEventsType } from '@leon123858/ntuaf-sdk';

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<>
				<ScrollToTop />
				<Layout />
			</>
		),
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
				loader: async () => {
					const [month4, month5] = await Promise.all([
						await getMonthsEventsType(4),
						await getMonthsEventsType(5),
					]);
					return {
						4: month4,
						5: month5,
					};
				},
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
			{
				path: '/artwork',
				element: <Artwork />,
			},
			{
				path: '/artwork/upload',
				element: <Artworkupload />,
			},
			{
				path: '/artworkList',
				element: <ArtworkList />,
			},
			{
				path: '/map',
				element: <Map />,
			},
			{
				path: 'display/:displayId',
				element: <Display />,
			},
			{
				path: '/psyTest',
				element: <PsyTest/>
			}
		],
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BreakPointProvider>
			<RouterProvider
				fallbackElement={
					<img
						src={'/loading.gif'}
						style={{ width: '18vw' }}
						alt='loading...'
					/>
				}
				router={router}
			/>
		</BreakPointProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
