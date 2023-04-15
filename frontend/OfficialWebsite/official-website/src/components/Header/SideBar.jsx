import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './SideBar.module.css';
import { Collapse, Drawer, Input } from 'antd';
import LoginButton from './LoginButton.jsx';
const { Panel } = Collapse;

const LinkGroup = ({ setSideBarActive }) => {
	const handleClickLink = () => {
		setSideBarActive(false);
	};
	return (
		<div className={styles.sideBarWrapper}>
			<Collapse ghost accordion>
				<Panel
					header={
						<div className={styles.headerWrapper}>
							<Link
								className={styles.link}
								to={'/about'}
								onClick={handleClickLink}
							>
								<div className={styles.chineseTab}>關於我們</div>
								<div className={styles.engTab}>ABOUT</div>
							</Link>
						</div>
					}
					key='2'
					showArrow={false}
					collapsible='icon'
				/>
				<Panel
					header={
						<div className={styles.headerWrapper}>
							<Link className={styles.link}>
								<div className={styles.chineseTab}>展覽/活動</div>
								<div className={styles.engTab}>EVENTS</div>
							</Link>
						</div>
					}
					key='3'
					showArrow={false}
				>
					<div className={styles.collapseItemWrapper}>
						<Link
							className={styles.subLink}
							to={'/introduce/exhibition'}
							onClick={handleClickLink}
						>
							<div className={styles.chineseSubTab}>展覽</div>
							<div className={styles.engSubTab}>EXHIBITIONS</div>
						</Link>
						<Link
							className={styles.subLink}
							to={'/introduce/activity'}
							onClick={handleClickLink}
						>
							<div className={styles.chineseSubTab}>活動</div>
							<div className={styles.engSubTab}>ACTIVITIES</div>
						</Link>
					</div>
				</Panel>
				<Panel
					header={
						<div className={styles.headerWrapper}>
							<Link
								className={styles.link}
								to={'/calendar'}
								onClick={handleClickLink}
							>
								<div className={styles.chineseTab}>行事曆</div>
								<div className={styles.engTab}>CALENDAR</div>
							</Link>
						</div>
					}
					key='4'
					showArrow={false}
					collapsible='icon'
				/>
				<Panel
					header={
						<div className={styles.headerWrapper}>
							<Link className={styles.link}>
								<div className={styles.chineseTab}>特別企劃</div>
								<div className={styles.engTab}>SPECIALS</div>
							</Link>
						</div>
					}
					key='5'
					showArrow={false}
				>
					<div className={styles.collapseItemWrapper}>
						<Link
							className={styles.subLink}
							to={'/artwork'}
							onClick={handleClickLink}
						>
							<div className={styles.chineseSubTab}>尋洄地圖</div>
							<div className={styles.engSubTab}>Map of ArtFest</div>
						</Link>
						<Link
							className={styles.subLink}
							to={'/map'}
							onClick={handleClickLink}
						>
							<div className={styles.chineseSubTab}>心理測驗</div>
							<div className={styles.engSubTab}>Reply 2023</div>
						</Link>
						<Link className={styles.subLink} to={'/'} onClick={handleClickLink}>
							<div className={styles.chineseSubTab}>洄溯展覽暨比賽</div>
							<div className={styles.engSubTab}>Throwback</div>
						</Link>
					</div>
				</Panel>
			</Collapse>
		</div>
	);
};
const SideBar = (props) => {
	// eslint-disable-next-line no-unused-vars
	const [activeSearch, _] = useState(false);
	// const [activeSideBar, setActiveSideBar] = useState(false)
	const [searchWord, setSearchWord] = useState('');
	const search = (e) => {
		if (e.key === 'Enter') {
			alert(searchWord);
		}
	};
	//info swipe for disabling sideBar
	const handlers = useSwipeable({
		onSwipedRight: () => {
			if (window.innerWidth < 769) {
				props.setSideBarActive(false);
			}
		},
	});
	// const handleClickLink = () => { setActiveSearch(false); };
	return (
		<Drawer
			placement='right'
			open={props.activeSideBar}
			closable={false}
			width={'100vw'}
			mask={false}
			bodyStyle={
				activeSearch ? { backgroundColor: 'gray', transition: 'all 1s' } : {}
			}
		>
			<div className={styles.drawerBodyWrapper} {...handlers}>
				<div className={styles.header}>
					{/* <SearchOutlined
						style={{ fontSize: '32px' }}
						onClick={() => {
							setActiveSearch(!activeSearch);
						}}
					/> */}
					<div
						id={'inputSearch'}
						className={activeSearch ? styles.input : styles.defaultInput}
					>
						<Input
							placeholder='input search text'
							value={searchWord}
							onChange={(e) => {
								setSearchWord(e.target.value);
							}}
							onKeyDown={search}
						/>
					</div>
					<div className={styles.loginWrapper}>
						<LoginButton />
					</div>
				</div>

				<LinkGroup setSideBarActive={props.setSideBarActive} />
				{/* <div className={styles.closeIcon}> */}

				<img
					alt='sidebar'
					onClick={props.onClose}
					className={styles.closeIcon}
					src='https://drive.google.com/uc?export=view&id=1cP59d2uWfbFBoflyGC0dVDHfARRahUWF'
				></img>
				{/* </div> */}
			</div>
		</Drawer>
	);
};
export default SideBar;
