import { render, screen } from '@testing-library/react';
import App from './Home';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('renders learn react link', () => {
	const history = createMemoryHistory({ initialEntries: ['/home'] });
	render(
		<Router location={history.location} navigator={history}>
			<App />
		</Router>
	);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
