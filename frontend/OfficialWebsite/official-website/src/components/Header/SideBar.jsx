import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useSwipeable } from "react-swipeable"
import styles from "./SideBar.module.css"
import { Collapse, Drawer, Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons"
import LoginButton from "./LoginButton.jsx"
const { Panel } = Collapse;


const LinkGroup = () => {
	return (
		<div className={styles.sideBarWrapper}>
			<Collapse ghost>
				<Panel header={<div className={styles.headerWrapper}><Link className={styles.link} to={'/about'}>關於我們</Link></div>} key="2" showArrow={false} />
				<Panel header={<div className={styles.headerWrapper}><Link className={styles.link} to={'/introduce'}>展覽/活動</Link></div>} key="3" showArrow={false}>
					<div className={styles.collapseItemWrapper}>
						<Link className={styles.link} to={'/introduce/1'}>展覽</Link>
						<Link className={styles.link} to={'/introduce/2'}>活動</Link>
					</div>

				</Panel>
				<Panel header={<div className={styles.headerWrapper}><Link className={styles.link} to={'/calendar'}>行事曆</Link></div>} key="4" showArrow={false} />
				<Panel header={<div className={styles.headerWrapper}><Link className={styles.link} to={'/history'}>特別企劃</Link></div>} key="5" showArrow={false}>
					<div className={styles.collapseItemWrapper}>
						<Link className={styles.link} to={'/calendar'}>洄溯</Link>
						<Link className={styles.link} to={'/calendar'}>藝術季地圖</Link>
						<Link className={styles.link} to={'/calendar'}>心理測驗</Link>
					</div>

				</Panel>
			</Collapse>
		</div>
	)
}
const SideBar = (props) => {
	const [activeSearch, setActiveSearch] = useState(false)
	// const [activeSideBar, setActiveSideBar] = useState(false)
	const [searchWord, setSearchWord] = useState("")
	const search = (e)=>{
		if (e.key === 'Enter') {
			alert(searchWord)
		}

	}
	//info swipe for disabling sideBar
	const handlers = useSwipeable({
		onSwipedRight: () => { if (window.innerWidth < 769) { props.setSideBarActive(false) } }
	});


	return (
		<Drawer placement="right" open={props.activeSideBar} closable={false} width={"100vw"} mask={false} bodyStyle={activeSearch?{backgroundColor:"gray", transition:"all 1s"}:{}}>
			<div className={styles.drawerBodyWrapper} {...handlers}>
				<div className={styles.header}>
					<SearchOutlined style={{ fontSize: "32px" }} onClick={() => { setActiveSearch(!activeSearch) }} />
					<div id={"inputSearch"}className={activeSearch ? styles.input : styles.defaultInput}><Input placeholder="input search text" value={searchWord} onChange={(e)=>{setSearchWord(e.target.value)}} onKeyDown={search}/></div>
					<LoginButton />
				</div>
				<div>
					<LinkGroup />
				</div>
				<div className={styles.closeIcon}>
					<span style={{ fontSize: "32px", width: "32px" }} onClick={props.onClose}>X</span>
				</div>
			</div>
		</Drawer>
	)
}
export default SideBar