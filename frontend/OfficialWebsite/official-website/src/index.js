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
import Psyshare from './routers/PsyShare';

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

// image url which want to preload
function preloadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = function () {
			resolve(img);
		};
		img.onerror = function () {
			reject(src);
		};
		img.src = src;
	});
}

const basicLoader = () => {
	return Promise.all([
		preloadImage(
			window.screen.width > 834
				? '/dynamicVision/lgDynamicVision.webp'
				: '/dynamicVision/dynamicVision.webp'
		),
		preloadImage(
			window.screen.width > 834 ? '/about/環.svg' : '/about/環-手機版.svg'
		),
	]);
};

const router = createBrowserRouter([
	{
		path: '/sharePsyPage/:type',
		element: <Psyshare />,
		errorElement: <ErrorPage />,
	},
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
				loader: async () => {
					try {
						await basicLoader();
						return { preload: true };
					} catch (err) {
						return { preload: false };
					}
				},
			},
			{
				path: '/introduce/:type',
				element: <Introduce />,
				loader: async () => {
					try {
						await basicLoader();
						return { preload: true };
					} catch (err) {
						return { preload: false };
					}
				},
			},
			{
				path: '/calendar',
				loader: async () => {
					await basicLoader();
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
				loader: async () => {
					try {
						await basicLoader();
						return { preload: true };
					} catch (err) {
						return { preload: false };
					}
				},
			},
			{
				path: '/history',
				element: <History />,
				loader: async () => {
					try {
						await basicLoader();
						return { preload: true };
					} catch (err) {
						return { preload: false };
					}
				},
			},
			{
				path: '/artwork',
				element: <Artwork />,
				loader: async () => {
					try {
						await basicLoader();
						return { preload: true };
					} catch (err) {
						return { preload: false };
					}
				},
			},
			{
				path: '/artwork/upload',
				element: <Artworkupload />,
				loader: async () => {
					try {
						await basicLoader();
						return { preload: true };
					} catch (err) {
						return { preload: false };
					}
				},
			},
			{
				path: '/artworkList',
				element: <ArtworkList />,
				loader: async () => {
					try {
						await basicLoader();
						return { preload: true };
					} catch (err) {
						return { preload: false };
					}
				},
			},
			{
				path: '/map',
				element: <Map />,
				loader: async () => {
					try {
						await basicLoader();
						return { preload: true };
					} catch (err) {
						return { preload: false };
					}
				},
			},
			{
				path: 'display/:displayId',
				element: <Display />,
			},
			{
				path: '/psyTest',
				element: <PsyTest />,
				loader: async () => {
					try {
						await basicLoader();
						return { preload: true };
					} catch (err) {
						return { preload: false };
					}
				},
			},
		],
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BreakPointProvider>
			<RouterProvider
				fallbackElement={
					<div
						style={{ width: '100%', textAlign: 'center', paddingTop: '40vh' }}
					>
						<img
							src={'/loading.webp'}
							style={
								window.screen.width > 834
									? { width: '12vw' }
									: { width: '20vw' }
							}
							alt='loading...'
						/>
					</div>
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
