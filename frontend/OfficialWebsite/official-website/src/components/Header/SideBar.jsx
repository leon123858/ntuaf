import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {useSwipeable} from "react-swipeable"
import styles from "./SideBar.module.css"
import { Collapse, theme, Drawer, Input } from 'antd';
import {SearchOutlined} from "@ant-design/icons"
import LoginButton from "./LoginButton.jsx"
const { Panel } = Collapse;


const LinkGroup = ()=> {
	const panelStyle = {
		padding: "0px",
		// backgroundColor:"red",
		// padding: "5px",
	};
	return (
		<div className={styles.sideBarWrapper}>
			<Collapse  ghost>
				<Panel header={<div className={styles.headerWrapper}><Link className={styles.link} to={'/about'}>關於我們</Link></div>} key="2" showArrow={false} />
				<Panel header={<div className={styles.headerWrapper}><Link className={styles.link} to={'/calendar'}>展覽/活動</Link></div>} key="3" showArrow={false}>
					<div className={styles.collapseItemWrapper}>
						<Link className={styles.link} to={'/calendar'}>展覽</Link>
						<Link className={styles.link} to={'/calendar'}>活動</Link>
					</div>

				</Panel>
				<Panel header={<div className={styles.headerWrapper}><Link className={styles.link} to={'/map'}>行事曆</Link></div>} key="4" showArrow={false} />
				<Panel header={<div className={styles.headerWrapper}><Link className={styles.link} to={'/map'}>特別企劃</Link></div>} key="5" showArrow={false}>
					<div className={styles.collapseItemWrapper}>
						<Link className={styles.link} to={'/calendar'}>回溯</Link>
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
	const [activeSideBar, setActiveSideBar] = useState(false)

	useEffect(()=>{
		setActiveSideBar(props.activeSideBar)
		console.log(activeSideBar)
	}, [props.activeSideBar])
	const handlers = useSwipeable({
		// onSwiped: (eventData) => console.log("User Swiped!", eventData),
		onSwipedRight: ()=>{if(window.innerWidth<769){setActiveSideBar(false)}}
	});

	useEffect(()=>{
		//todo swipte for deactivate sidebar 
		setActiveSideBar(props.activeSideBar)
		
		//info click non element to deactivate sidebar
		let sideBarWrapperE = document.getElementsByClassName(styles.drawerBodyWrapper)
		// console.log(document.getElementsByTagName("div"))
		console.log(styles.sideBarWrapper, sideBarWrapperE)
		// sideBarWrapperE.addEventListener("click", (evt) => {
		// 	const searchElement = document.getElementsByClassName(styles.header)[0]
		// 	console.log(searchElement)
		// 	let triggerE = evt.target; // clicked element      

		// 	//* maybe the trigger element which takes less area is the decendent of target element
		// 	//* this is, triiger is smaller than target
		// 	do{
		// 		if (triggerE === searchElement) {
		// 			return;
		// 		}
		// 		triggerE = triggerE.parentNode;
		// 	}while(triggerE)
		// 	setActiveSideBar(false)
		// });
	}, [])

	return (
			<Drawer id={"drawer"} placement="right" open={activeSideBar} closable={false} {...handlers} width={"100vw"}>
			<div className={styles.drawerBodyWrapper}>
				<div className={styles.header}>
					<SearchOutlined style={{fontSize:"32px"} }onClick={()=>{setActiveSearch(!activeSearch)}}/>
					<div className={activeSearch?styles.input:styles.defaultInput}><Input placeholder="input search text"/></div>
					<LoginButton/>
				</div>
				<div>
					<LinkGroup/>
				</div>
				<div className={styles.closeIcon}>
					<span style={{fontSize:"32px", width:"32px"}} onClick={props.onClose}>X</span>
				</div>
				</div>
			</Drawer>
		
	)
}
export default SideBar