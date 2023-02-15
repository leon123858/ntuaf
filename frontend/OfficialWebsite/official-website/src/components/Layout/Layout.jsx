import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import FourCircle from "../FourCircle/FourCircle.jsx"
import styles from "./Layout.module.css"
import Footer from "../Footer/Footer"


const Layout = ({ initItem }) => {
	return (
		<div className={styles.layout}>
			<Header initItem={initItem} />
			<FourCircle/>
			<Outlet />
			<Footer/>
		</div>

	);
};
export default Layout;
