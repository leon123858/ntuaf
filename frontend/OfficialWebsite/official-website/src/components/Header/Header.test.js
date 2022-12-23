import { render, screen, waitFor } from '@testing-library/react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Outlet,
	Route,
	RouterProvider,
} from 'react-router-dom';
import App from './Header';

const RoutesJSX = (
	<Route path='/' element={<Outlet />}>
		<Route
			index
			loader={({ request }) => {
				return { testData: 'testData here' };
			}}
			element={<App />}
		></Route>
	</Route>
);

const routes = createRoutesFromElements(RoutesJSX);

const router = createBrowserRouter(routes);

test('renders learn react link', async () => {
	render(<RouterProvider router={router} />);
	await waitFor(() => {
		const linkElement = screen.getByText(/首頁/i);
		expect(linkElement).toBeInTheDocument();
	});
});
