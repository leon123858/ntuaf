import React, { useContext } from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import { BreakPointContext } from '../../useBreakPoint';

const LAYOUT_BACKGROUND_IMAGE = {
	default: {
		web: '/background/dWebB.webp',
		mobile: '/background/dMobileB.webp',
	},
	// '/calendar': {
	// 	web: '/background/3web.png',
	// 	mobile: '/background/3mob.png',
	// },
	// '/': {
	// 	web: '/background/1web.png',
	// 	mobile: '/background/1mob.png',
	// },
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
	const appendStyle = inBreakPoint
		? {
				position: 'relative',
				minHeight: '100%',
				paddingBottom: '200px',
		  }
		: {};
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
					backgroundSize: '100% 100vh',
					backgroundAttachment: 'scroll',
					...appendStyle,
				}}
			>
				<Outlet />
				<Footer />
			</div>
		</>
	);
};
export default Layout;
