import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from "../Footer/Footer"

const Layout = ({ initItem }) => {
	return (
		<>
			<Header initItem={initItem} />
			<Outlet />
			<Footer/>
		</>
	);
};
export default Layout;
