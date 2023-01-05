import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Menu as AntdMenu, Input } from 'antd';
import styles from "./Header.module.css"
import {useSwipeable} from "react-swipeable"
const { Search } = Input
const LinkGroup = ({css})=> {
	return (
		<div className={css}>
			<Link className={styles.link} to={'/'}>首頁</Link>
			<Link className={styles.link} to={'/introduce'}>展覽介紹</Link>
			<Link className={styles.link} to={'/calendar'}>行事曆</Link>
			<Link className={styles.link} to={'/map'}>地圖</Link>
			<Link className={styles.link} to={'/about'}>關於我們</Link>
			<Link className={styles.link} to={'/history'}>歷屆回顧</Link>
		</div>
	)
}

const SideBar = ({ sideBarActive, setSideBarActive }) => {
	const handlers = useSwipeable({
		// onSwiped: (eventData) => console.log("User Swiped!", eventData),
		onSwipedRight: ()=>{if(window.innerWidth<769){setSideBarActive(false)}}
	});
	useEffect(()=>{
		//info click non element to deactivate sidebar
		let sideBarWrapperE = document.getElementsByClassName(styles.sideBarWrapper)[0]
		sideBarWrapperE.addEventListener("click", (evt) => {
			const searchElement = document.getElementsByClassName(styles.searchIcon)[0]
			let triggerE = evt.target; // clicked element      

			//* maybe the trigger element which is take less area is the decendent of target element
			//* this is, triiger is smaller than target
			do{
				if (triggerE == searchElement) {
					return;
				}
				triggerE = triggerE.parentNode;
			}while(triggerE)
			setSideBarActive(false)
		});
	}, [])

	return (
		<div className={sideBarActive ? `${styles.sideBarWrapperActive} ${styles.sideBarWrapper}`: styles.sideBarWrapper}  {...handlers}>
			{/* <div className='search'>&#xf002;</div> */}
			<div className={styles.searchIcon}>
				<Search placeholder="input search text" style={{width: 200,}}/>
			</div>
			<LinkGroup css={styles.linkGroupMobile}/>
			<div className={styles.closeIcon}>
				<div>X</div>
			</div>

		</div>
		
	)
}
const Menu = () => {
	// const [item, setItem] = useState(initItem);
	const [sideBarActive, setSideBarActive] = useState(false)
	
	return (
		<div className={styles.totalWrapper}>
			<SideBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive} />

			<div className={styles.headerWrapper}>
				<div className={styles.logo}>LOGO</div>
				<h1 className={styles.title}>台大藝術季28th</h1>
				<div className={styles.iconContainer} onClick={() => { setSideBarActive(!sideBarActive) }}>
					<div className={styles.bar1}></div>
					<div className={styles.bar2}></div>
					<div className={styles.bar3}></div>
				</div>

				<LinkGroup css={styles.linkGroupWeb}/>

			</div>
		</div>
	);
};
export default Menu;
