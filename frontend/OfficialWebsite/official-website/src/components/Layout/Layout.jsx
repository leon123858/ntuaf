import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = ({ initItem }) => {
	return (
		<>
			<Header initItem={initItem} />
			{/* <Outlet /> */}
		</>
	);
};
export default Layout;
