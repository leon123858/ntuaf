import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import FourCircle from "../FourCircle/FourCircle.jsx"
const Layout = ({ initItem }) => {
	return (
		<>
			<Header initItem={initItem} />
			<FourCircle/>
			{/* <Outlet /> */}
		</>
	);
};
export default Layout;
