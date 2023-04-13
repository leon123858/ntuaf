import { SearchOutlined } from "@ant-design/icons"
import React, { useState } from 'react';
import {Input} from "antd"
import styles from "./SearchBar.module.css"

const SearchBar = () => {
	const [searchBarActive, setSearchBarActive] = useState(false)
    const [searchWord, setSearchWord] = useState("")
	const onClick = ()=>{
		if (searchBarActive){
            console.log("search key word", searchWord)
		}else{
			setSearchBarActive(true)
		}
		
	}
	return (
		<div className={searchBarActive ? styles.searchBarWrapperActive :styles.searchBarWrapper}>
			<div className={searchBarActive?styles.exitButton:styles.exitButtonHidden} onClick={() => { setSearchBarActive(false) }} >X</div>
			<div className={searchBarActive ? "" : styles.inputWrapperHidden}><Input placeholder="input search text" value={searchWord} onChange={(e)=>{setSearchWord(e.target.value)}}/></div>
			<div className={styles.searchIconWrapper}>
				<SearchOutlined onClick={onClick} style={{ fontSize: "1rem", width: "32px", color: "black" }} />
			</div>
			
		</div>
	)
}

export default SearchBar