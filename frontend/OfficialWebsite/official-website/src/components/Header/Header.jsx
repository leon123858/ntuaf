import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as AntdMenu } from 'antd';

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
const Menu = ({ initItem, content, items = defaultItems }) => {
	const [item, setItem] = useState(initItem);
	return (
		<AntdMenu
			selectedKeys={[item]}
			mode='horizontal'
			items={items}
			onClick={(e) => {
				setItem(e.key);
			}}
		/>
	);
};
export default Menu;
