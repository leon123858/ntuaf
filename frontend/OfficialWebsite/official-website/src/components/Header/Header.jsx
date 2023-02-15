import React, { useState, useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Menu as AntdMenu } from 'antd';
import { BreakPointContext } from '../../useBreakPoint';

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
	const { toggleInBreakPoint } = useContext(BreakPointContext);
	toggleInBreakPoint();
	console.log(useLoaderData());
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
