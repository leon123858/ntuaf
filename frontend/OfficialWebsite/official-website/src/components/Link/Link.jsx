import React from 'react';
import style from './Link.module.css';

const Link = ({ url, title }) => {
	return (
		<div className={style.container}>
			<a href={url}>
				<button className={style.btn}>
					<p className={style.content}>{title}</p>
				</button>
			</a>
		</div>
	);
};

export default Link;
