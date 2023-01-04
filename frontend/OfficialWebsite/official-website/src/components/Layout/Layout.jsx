import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import "./Layout.css"

const Layout = ({ initItem }) => {
	return (
		<div className='screen'>
			<Header initItem={initItem} />
			{/* <Outlet /> */}
		</div>
	);
};
export default Layout;
