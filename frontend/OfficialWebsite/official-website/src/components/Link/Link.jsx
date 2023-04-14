import React from 'react';
import style from './Link.module.css';
import { Button } from 'antd';

const Link = ({ url, title }) => {
	return (
		<div className={style.container}>
			<a href={url}>
				<button className={style.btn}>
					{title}
				</button>
			</a>
		</div>
	);
};

export default Link;
