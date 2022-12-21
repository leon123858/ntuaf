import { render } from '@testing-library/react';
import App from './Header';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('renders learn react link', () => {
	const history = createMemoryHistory({ initialEntries: ['/home'] });
	render(
		<Router location={history.location} navigator={history}>
			<App />
		</Router>
	);
});
