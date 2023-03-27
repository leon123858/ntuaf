import React from 'react';
import style from './Link.module.css';
import { Button } from 'antd';

const Link = ({ url, title }) => {
	return (
		<div className={style.container}>
			<a href={url}>
				<Button className={style.btn}>
					{title} {'>'}
				</Button>
			</a>
		</div>
	);
};

export default Link;
