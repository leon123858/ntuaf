import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Footer from '../Footer/Footer';

const Layout = () => {
	return (
		<div
			className={styles.layout}
			style={{
				backgroundImage: "url('/background/c1.png')",
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
