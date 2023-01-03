import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Menu as AntdMenu, Input} from 'antd';
import "./Header.css"
const {Search} = Input
const defaultItems = [
	{
		label: <Link to={'/'}>首頁</Link>,
		key: 'home',
	},
	{
		label: <Link to={'/introduce'}>展覽介紹</Link>,
		key: 'introduce',
	},
	{
		label: <Link to={'/calendar'}>行事曆</Link>,
		key: 'calendar',
	},
	{
		label: <Link to={'/map'}>地圖</Link>,
		key: 'map',
	},
	{
		label: <Link to={'/about'}>關於我們</Link>,
		key: 'about',
	},
	{
		label: <Link to={'/history'}>歷屆回顧</Link>,
		key: 'history',
	},
];

const SideBar = ({setSideBarActive})=>{
	return(
		<div className='sideBarWrapper'>
			{/* <div className='search'>&#xf002;</div> */}
			<Search placeholder="input search text"
				style={{
					width: 200,
				}}
				/>
			<Link className="link" to={'/'}>首頁</Link>
			<Link className="link" to={'/introduce'}>展覽介紹</Link>
			<Link className="link" to={'/calendar'}>行事曆</Link>
			<Link className="link" to={'/map'}>地圖</Link>
			<Link className="link" to={'/about'}>關於我們</Link>
			<Link className="link" to={'/history'}>歷屆回顧</Link>
			<div className='closeIcon' onClick={()=>{setSideBarActive((prev)=>(!prev))}}>X</div>

		</div>
	)
}
const Menu = ({ initItem, content, items = defaultItems }) => {
	const [item, setItem] = useState(initItem);
	const [sideBarActive, setSideBarActive] = useState(false)

	return (
		<>
		{sideBarActive?<SideBar setSideBarActive={setSideBarActive}/>:<></>}
		<div className='headerWrapper'>
			<div className='logo'>LOGO</div>
			<h1 className='title'>台大藝術季28th</h1>
			<div className="iconContainer" onClick={()=>{setSideBarActive(!sideBarActive)}}>
				<div className="bar1"></div>
				<div className="bar2"></div>
				<div className="bar3"></div>
			</div>
			
			{/* <div class="overlay">
				<div class="text">Hello World</div>
			</div> */}
			
		</div>
		</>
		// <AntdMenu
		// 	selectedKeys={[item]}
		// 	mode='horizontal'
		// 	items={items}
		// 	onClick={(e) => {
		// 		setItem(e.key);
		// 	}}
		// />
	);
};
export default Menu;
