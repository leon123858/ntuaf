import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Footer from '../Footer/Footer';

const Layout = () => {
	return (
		<div className={styles.layout}>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};
export default Layout;
