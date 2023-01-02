import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = ({ initItem }) => {
	return (
		<div>
			<Header initItem={initItem} />
			<Outlet />
		</div>
	);
};
export default Layout;
