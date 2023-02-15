import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import "./Layout.css"
import styles from "./Layout.module.css"
import Footer from "../Footer/Footer"


const Layout = ({ initItem }) => {
	return (
		<div className={styles.layout}>
			<Header initItem={initItem} />
			<Outlet />
			<Footer/>
		</div>
	);
};
export default Layout;
