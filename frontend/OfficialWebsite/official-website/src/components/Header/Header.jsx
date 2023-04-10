import React, { useEffect, useState, useContext } from 'react';
import styles from './Header.module.css';
import SideBar from './SideBar.jsx';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton.jsx';
import Logo from './Logo';
import { BreakPointContext } from '../../useBreakPoint';

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
			<Link className={styles.link} to={'/introduce/exhibition'}>
				展覽/活動
			</Link>
		),
		key: 'event',
		children: [
			{
				label: (
					<div className={styles.subMenu}>
						<Link to='/introduce/exhibition'>展覽</Link>
					</div>
				),
				key: 'show',
			},
			{
				label: (
					<div className={styles.subMenu}>
						<Link to='/introduce/activity'>活動</Link>
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
		label: <p className={styles.link}>特別企劃</p>,
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
				label: (
					<div className={styles.subMenu}>
						<Link to={'/psyTest'}>心理測驗</Link>
					</div>
				),
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
	const { inBreakPoint } = useContext(BreakPointContext);

	useEffect(() => {
		const add_class_on_scroll = (element, className) => {
			if (element) {
				element.classList.add(className);
			}

		};
		const remove_class_on_scroll = (element, className) => {
			if (element) {
				element.classList.remove(className);
			}

		};
		window.addEventListener('scroll', function () {
			if (!inBreakPoint) {
				const menuE = document.getElementsByClassName(styles.menu)[0];
				const headerE = document.getElementsByClassName(styles.headerWrapper)[0];
				let offsetChangeHeader = 10;
				let scrollpos = window.scrollY;
				if (scrollpos > offsetChangeHeader) {
					remove_class_on_scroll(menuE, styles.menu);
					add_class_on_scroll(menuE, styles.scrollMenu);
					add_class_on_scroll(headerE, styles.scrollHeader);
				} else {
					remove_class_on_scroll(menuE, styles.scrollMenu);
					remove_class_on_scroll(headerE, styles.scrollHeader);
					add_class_on_scroll(menuE, styles.menu);
				}
			}
		});
	}, [inBreakPoint]);

	return (
		<div className={styles.totalWrapper}>

			<div className={styles.headerWrapper}>
				<Logo />
				{
					(inBreakPoint)
						? (
							<div
								className={styles.iconContainer}
								onClick={() => {
									setSideBarActive(!sideBarActive);
								}}
								style={(sideBarActive) ? { display: 'none' } : {}}
							>
								<svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon}>
									<path d="M0 0.5H22" stroke="black" />
									<path d="M0 9.5H22" stroke="black" />
									<path d="M0 18.5H22" stroke="black" />
								</svg>

							</div>
						)
						: (
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<div className={styles.menuWrapper}>
									<Menu
										selectable={false}
										selectedKeys={'1'}
										multiple={true}
										mode='horizontal'
										items={items}
										disabledOverflow={true}
										className={styles.menu}
									/>
								</div>
								<div>
									<LoginButton />
								</div>
							</div>
						)
				}

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
