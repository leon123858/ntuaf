import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';

const LAYOUT_BACKGROUND_IMAGE = {
	'/calendar': '/background/c1.png',
};

const Layout = () => {
	const location = useLocation();
	return (
		<div
			className={styles.layout}
			style={{
				backgroundImage: `url('${LAYOUT_BACKGROUND_IMAGE[location.pathname]}')`,
				backgroundSize: '100vw 100vh',
			}}
		>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};
export default Layout;
