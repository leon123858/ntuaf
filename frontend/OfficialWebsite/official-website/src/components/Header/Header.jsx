import React, { useEffect, useState } from 'react';
import styles from "./Header.module.css"
import SideBar from "./SideBar.jsx"
import { Menu, Input, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from "@ant-design/icons"
import LoginButton from "./LoginButton.jsx"

const items1 = [
	{
		key: '1',
		label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
				1st menu item
			</a>
		),
	},
	{
		key: '1',
		label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
				1st menu item
			</a>
		),
	}
]
const items = [
	{
		label: <Link className={styles.link} to={'/about'}>關於我們</Link>,
		key: 'about',

	},
	{
		label: <Link className={styles.link} to={'/calendar'}>展覽/活動</Link>,
		key: 'event',
		children: [
			{
			  label: '展覽',
			  key: 'event',
			},
			{
			  label: '活動',
			  key: 'activity',
			},
		  ],

	},
	{
		label: <Link className={styles.link} to={'/about'}>行事曆</Link>,
		key: 'calendar',
	},
	{
		label: <Link className={styles.link} to={'/about'}>特別企劃</Link>,
		key: 'special',
		children: [
			{
			  label: '回溯',
			  key: 'backward',
			},
			{
			  label: '藝術季地圖',
			  key: 'afMap',
			},
			{
				label: '心理測驗',
				key: 'psychoTest',
			  },
		  ],

	},
]
const SearchBar = () => {
	const [searchBarActive, setSearchBarActive] = useState(false)
	return (
		<div className={searchBarActive ? styles.searchIconWrapperActive : styles.searchIconWrapper}>
			<div onClick={() => { setSearchBarActive(false) }} className={styles.exitButton}>X</div>
			<div className={searchBarActive ? "" : styles.hidden}><Input placeholder="input search text" /></div>
			<SearchOutlined onClick={() => { setSearchBarActive(true) }} style={{ fontSize: "1rem", width: "32px", color: "black" }} />
		</div>
	)
}
const MenuM = () => {

	return (
		<div className={styles.menuWrapper}>
			<Link className={styles.link} to={'/about'}>關於我們</Link>
			{/* <Dropdown menu={{ items1 }}>
			</Dropdown> */}
			<Link className={styles.link} to={'/calendar'}>展覽/活動</Link>
			<Link className={styles.link} to={'/about'}>行事曆</Link>
			<Link className={styles.link} to={'/about'}>特別企劃</Link>
			<SearchBar />
		</div>
	)
}
const Header = () => {
	// const [item, setItem] = useState(initItem);
	const [sideBarActive, setSideBarActive] = useState(false)
	const [searchBarActive, setSearchBarActive] = useState(false)
	const onClose = () => {
		setSideBarActive(false)
	}
	useEffect(()=>{
		const headerE = document.getElementsByClassName(styles.menuWrapper)[0]
		console.log(styles.menuWrapper, headerE)
		const add_class_on_scroll = () => {
			headerE.classList.add(styles.menuWrapperTransparent)
		}
		const remove_class_on_scroll = () => {
			headerE.classList.remove(styles.menuWrapperTransparent)
		}
		window.addEventListener('scroll', function() {
			let offsetChangeHeader = 10 
			let scrollpos = window.scrollY;
			console.log(scrollpos)
			if (scrollpos>offsetChangeHeader){
				add_class_on_scroll()
			}else{
				remove_class_on_scroll()
			}
			// if (scrollpos >= scrollChange) { add_class_on_scroll() }
			// else { remove_class_on_scroll() }
			
		})
	}, [])
	
	return (
		<div className={styles.totalWrapper}>
			<div className={styles.headerWrapper}>
				<div className={styles.logo}>LOGO</div>
				<h1 className={styles.title}>台大藝術季28th</h1>
				<div className={styles.menuWrapper}>
					<Menu selectable={false} selectedKeys={"1"}multiple={true} mode="horizontal" items={items} style={{backgroundColor:"rgba(0, 0, 0,0)", border:"none"}} inlineCollapsed={false} disabledOverflow={true}/>
					<SearchBar />
				</div>
				{/* <MenuM /> */}
				<div className={styles.hidden}><LoginButton /></div>

				<div className={styles.iconContainer} onClick={() => { setSideBarActive(!sideBarActive) }}>
					<div className={styles.bar1}></div>
					<div className={styles.bar2}></div>
					<div className={styles.bar3}></div>
				</div>
				<SideBar activeSideBar={sideBarActive} onClose={onClose}></SideBar>

			</div>
		</div>
	);
};
export default Header;
