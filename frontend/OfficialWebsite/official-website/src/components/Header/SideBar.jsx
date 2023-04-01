import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './SideBar.module.css';
import { Collapse, Drawer, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import LoginButton from './LoginButton.jsx';
const { Panel } = Collapse;

const LinkGroup = ({ setSideBarActive }) => {
	const handleClickLink = () => {
		setSideBarActive(false);
	};
	return (
		<div className={styles.sideBarWrapper}>
			<Collapse ghost>
				<Panel
					header={
						<div className={styles.headerWrapper}>
							<Link
								className={styles.link}
								to={'/about'}
								onClick={handleClickLink}
							>
								<div>關於我們</div>
								<div>ABOUT</div>
							</Link>
						</div>
					}
					key='2'
					showArrow={false}
				/>
				<Panel
					header={
						<div className={styles.headerWrapper}>
							<Link className={styles.link}>
							<div>展覽/活動</div>
							<div>EVENTS</div>
							</Link>
						</div>
					}
					key='3'
					showArrow={false}
				>
					<div className={styles.collapseItemWrapper}>
						<Link
							className={styles.link}
							to={'/introduce/exhibition'}
							onClick={handleClickLink}
						>
							<div>展覽</div>
							<div>EXHIBITIONS</div>
						</Link>
						<Link
							className={styles.link}
							to={'/introduce/activity'}
							onClick={handleClickLink}
						>
							<div>活動</div>
							<div>ACTIVITIES</div>
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
								<div>行事曆</div>
								<div>CHALENDAR</div>
							</Link>
						</div>
					}
					key='4'
					showArrow={false}
				/>
				<Panel
					header={
						<div className={styles.headerWrapper}>
							<Link className={styles.link}>
								
								<div>特別企劃</div>
								<div>SPECIALS</div>
							</Link>
						</div>
					}
					key='5'
					showArrow={false}
				>
					<div className={styles.collapseItemWrapper}>
						<Link
							className={styles.link}
							to={'/artwork'}
							onClick={handleClickLink}
						>						
							<div>尋洄地圖</div>
							<div>Map of ArtFest</div>
						</Link>
						<Link className={styles.link} to={'/map'} onClick={handleClickLink}>
							<div>心理測驗</div>
							<div>Reply 2023</div>
						</Link>
						<Link className={styles.link} to={'/'} onClick={handleClickLink}>
							<div>洄溯展覽暨比賽</div>
							<div>Throwback</div>
						</Link>
					</div>
				</Panel>
			</Collapse>
		</div>
	);
};
const SideBar = (props) => {
	const [activeSearch, setActiveSearch] = useState(false);
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
					<SearchOutlined
						style={{ fontSize: '32px' }}
						onClick={() => {
							setActiveSearch(!activeSearch);
						}}
					/>
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
					<LoginButton />
				</div>
				<div>
					<LinkGroup setSideBarActive={props.setSideBarActive} />
				</div>
				<div className={styles.closeIcon}>
					<span
						style={{ fontSize: '32px', width: '32px' }}
						onClick={props.onClose}
					>
						X
					</span>
				</div>
			</div>
		</Drawer>
	);
};
export default SideBar;
