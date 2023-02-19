import React from 'react';
// import style from './Home.module.css';
// import { Card } from 'antd';


const Map = (props) => {
	console.log(props);
	const { inputValue, width, height, font } = props;
	console.log(props.width);
	return (
		<>

			<div style={{ textAlign: 'center', marginBottom: 20, width: 'props.width' }}>藝術家地圖</div>
			<iframe src={inputValue} width={width} height={height} loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="myFrame"></iframe>
		</>
	);
}


export default Map;