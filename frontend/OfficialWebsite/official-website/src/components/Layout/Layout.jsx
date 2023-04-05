import React, { useContext } from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import { BreakPointContext } from '../../useBreakPoint';

const LAYOUT_BACKGROUND_IMAGE = {
	default: {
		web: '/background/iWebB.png',
		mobile: '/background/iMobileB.png',
	},
	'/calendar': {
		web: '/background/3Web.png',
		mobile: '/background/3Mob.png',
	},
	'/': {
		web: '/background/1Web.png',
		mobile: '/background/1Mob.png',
	},
};

const getBackgroundImage = (path, inBreakPoint) => {
	if (!LAYOUT_BACKGROUND_IMAGE[path]) {
		return inBreakPoint
			? LAYOUT_BACKGROUND_IMAGE.default.mobile
			: LAYOUT_BACKGROUND_IMAGE.default.web;
	}
	if (typeof LAYOUT_BACKGROUND_IMAGE[path] == 'string') {
		return inBreakPoint
			? LAYOUT_BACKGROUND_IMAGE[path].mobile
			: LAYOUT_BACKGROUND_IMAGE[path].web;
	}
	return inBreakPoint
		? LAYOUT_BACKGROUND_IMAGE[path].mobile
		: LAYOUT_BACKGROUND_IMAGE[path].web;
};

const Layout = () => {
	const location = useLocation();
	const { inBreakPoint } = useContext(BreakPointContext);
	return (
		<>
			<Header />
			<div
				className={styles.layout}
				style={{
					backgroundImage: `url('${getBackgroundImage(
						location.pathname,
						inBreakPoint
					)}')`,
					backgroundSize: '100vw 100vh',
					backgroundAttachment: 'fixed',
				}}
			>
				<Outlet />
				<Footer />
			</div>
		</>
	);
};
export default Layout;
