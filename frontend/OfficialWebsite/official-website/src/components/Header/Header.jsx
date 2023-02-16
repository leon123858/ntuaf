import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import SideBar from './SideBar.jsx';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import LoginButton from './LoginButton.jsx';

const items = [
	{
		label: (
			<Link className={styles.link} to={'/about'}>
				關於我們
			</Link>
		),
		key: 'about',
	},
	{
		label: (
			<Link className={styles.link} to={'/introduce/1'}>
				展覽/活動
			</Link>
		),
		key: 'event',
		children: [
			{
				label: (
					<div className={styles.subMenu}>
						<Link to='/introduce/1'>展覽</Link>
					</div>
				),
				key: 'show',
			},
			{
				label: (
					<div className={styles.subMenu}>
						<Link to='/introduce/2'>活動</Link>
					</div>
				),
				key: 'activity',
			},
		],
	},
	{
		label: (
			<Link className={styles.link} to={'/calendar'}>
				行事曆
			</Link>
		),
		key: 'calendar',
	},
	{
		label: (
			<Link className={styles.link} to={'/about'}>
				特別企劃
			</Link>
		),
		key: 'special',
		children: [
			{
				label: (
					<div className={styles.subMenu}>
						<Link to={'/artwork'}>洄溯</Link>
					</div>
				),
				key: 'backward',
			},
			{
				label: (
					<div className={styles.subMenu}>
						<Link to={'/map'}>藝術季地圖</Link>
					</div>
				),
				key: 'afMap',
			},
			{
				label: <div className={styles.subMenu}>心理測驗</div>,
				key: 'psychoTest',
			},
		],
	},
];

const Header = () => {
	const [sideBarActive, setSideBarActive] = useState(false);
	const onClose = () => {
		setSideBarActive(false);
	};
	useEffect(() => {
		// const headerE = document.getElementsByClassName(styles.menuWrapper)[0]
		const add_class_on_scroll = (element, className) => {
			element.classList.add(className);
		};
		const remove_class_on_scroll = (element, className) => {
			element.classList.remove(className);
		};
		window.addEventListener('scroll', function () {
			const menuE = document.getElementsByClassName(styles.menuWrapper)[0];
			const headerE = document.getElementsByClassName(styles.headerWrapper)[0];
			let offsetChangeHeader = 10;
			let scrollpos = window.scrollY;
			if (scrollpos > offsetChangeHeader) {
				add_class_on_scroll(menuE, styles.menuWrapperTransparent);
				add_class_on_scroll(headerE, styles.headerWrapperTransparent);
			} else {
				remove_class_on_scroll(menuE, styles.menuWrapperTransparent);
				remove_class_on_scroll(headerE, styles.headerWrapperTransparent);
			}
		});
	}, []);

	return (
		<div className={styles.totalWrapper}>
			<div className={styles.headerWrapper}>
				<div className={styles.logo}>LOGO</div>
				<h1 className={styles.title}>台大藝術季28th</h1>
				<div className={styles.menuWrapper}>
					<Menu
						selectable={false}
						selectedKeys={'1'}
						multiple={true}
						mode='horizontal'
						items={items}
						style={{ backgroundColor: 'rgba(0, 0, 0,0)', border: 'none' }}
						disabledOverflow={true}
					/>
					<SearchBar />
				</div>
				<div className={styles.hidden}>
					<LoginButton />
				</div>

				<div
					className={styles.iconContainer}
					onClick={() => {
						setSideBarActive(!sideBarActive);
					}}
				>
					<div className={styles.bar1}></div>
					<div className={styles.bar2}></div>
					<div className={styles.bar3}></div>
				</div>
				<SideBar
					activeSideBar={sideBarActive}
					setSideBarActive={setSideBarActive}
					onClose={onClose}
				></SideBar>
			</div>
		</div>
	);
};
export default Header;
