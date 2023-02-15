import React, { useContext } from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import FourCircle from "../FourCircle/FourCircle.jsx"
import styles from './Layout.module.css';
import Footer from '../Footer/Footer';
import { BreakPointContext } from '../../useBreakPoint';

const Layout = ({ initItem }) => {
	const { toggleInBreakPoint } = useContext(BreakPointContext);
	toggleInBreakPoint();
	return (
		<div className={styles.layout}>
			<Header initItem={initItem} />
			<FourCircle/>
			<Outlet />
			<Footer />
		</div>

	);
};
export default Layout;
