import styles from './ArtBox.module.css';
import React, { useState } from 'react';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import Heart from './Heart';
import ReactTextCollapse from 'react-text-collapse';

const TEXT_COLLAPSE_OPTIONS = {
	collapse: false, // default state when component rendered
	collapseText: '...', // text to show when collapsed
	expandText: 'show less', // text to show when expanded
	minHeight: 100, // component height when closed
	maxHeight: 250, // expanded to
	textStyle: {
		// pass the css for the collapseText and expandText here
		color: 'blue',
		fontSize: '20px',
	},
};

const ArtBox = (props) => {
	const [active, setActive] = useState(false);
	// console.log(props);
	const mystyle = {
		width: `${props.width}%`,
	};
	return (
		<div className={styles.App}>
			<Card style={mystyle} hoverable>
				<Meta
					title={props.artName}
					// description={props.artist}
					style={{
						width: 100,
					}}
					className={styles.left}
				></Meta>
				<div className={styles.text}>
					<ReactTextCollapse
						options={TEXT_COLLAPSE_OPTIONS}
						className={styles.text}
					>
						<p>{props.article}</p>
					</ReactTextCollapse>
				</div>
				<div className={styles.container}>
					<Meta
						description={props.artist}
						style={{
							width: 100,
						}}
					></Meta>
					<Heart
						style={{
							width: 50,
						}}
						isActive={active}
						onClick={() => setActive(!active)}
					/>
				</div>
			</Card>
		</div>
	);
};

export default ArtBox;
