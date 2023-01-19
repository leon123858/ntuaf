import React, { useEffect, useState } from 'react';
import styles from "./Header.module.css"
import SideBar from "./SideBar.jsx"
import { Menu, Input, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from "@ant-design/icons"
import LoginButton from "./LoginButton.jsx"
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
			  label: <div className={styles.subMenu}>展覽</div>,
			  key: 'event',
			},
			{
			  label: <div className={styles.subMenu}>活動</div>,
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
			  label: <div className={styles.subMenu}>洄溯</div>,
			  key: 'backward',
			},
			{
			  label: <div className={styles.subMenu}>藝術季地圖</div>,
			  key: 'afMap',
			},
			{
				label: <div className={styles.subMenu}>心理測驗</div>,
				key: 'psychoTest',
			  },
		  ],

	},
]
const SearchBar = () => {
	const [searchBarActive, setSearchBarActive] = useState(false)
	let className="{searchBarActive ? styles.searchBarWrapperActive : styles.searchBarWrapper}"
	const onClick = ()=>{
		if (searchBarActive){

		}else{
			setSearchBarActive(true)
		}
		
	}
	return (
		<div className={searchBarActive ? styles.searchBarWrapperActive :styles.searchBarWrapper}>
			<div className={searchBarActive?styles.exitButton:styles.exitButtonHidden} onClick={() => { setSearchBarActive(false) }} >X</div>
			<div className={searchBarActive ? "" : styles.inputWrapperHidden}><Input placeholder="input search text" /></div>
			<div className={styles.searchIconWrapper}>
				<SearchOutlined onClick={onClick} style={{ fontSize: "1rem", width: "32px", color: "black" }} />
			</div>
			
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
