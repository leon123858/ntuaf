import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import "./Layout.css"

const Layout = ({ initItem }) => {
	return (
		<div className='screen'>
			<Header initItem={initItem} />
			{/* <div style={{width:"100vw", height:"1500px", background:"linear-gradient(#F00, #FF0)"}}></div> */}
			{/* <Outlet /> */}
		</div>
	);
};
export default Layout;
