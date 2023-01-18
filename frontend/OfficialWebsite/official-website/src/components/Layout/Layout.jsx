import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import styles from "./Layout.module.css"

const Layout = ({ initItem }) => {
	return (
		<div className={styles.layout}>
			<Header initItem={initItem} />
			<Outlet />
		</div>
	);
};
export default Layout;
