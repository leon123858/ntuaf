import { Card, Image } from 'antd';
import styles from './ArtBox.module.css';
import React, { useState } from 'react';
import Heart from './Heart';

const { Meta } = Card;

const ArtBox = (props) => {
	const [active, setActive] = useState(false);

	// console.log(props);
	const mystyle = {
		width: `${props.width}%`,
	};
	// const imageHeight = 12;
	return (
		<div className={styles.App}>
			<Card
				style={mystyle}
				cover={
					<div>
						<Image
							alt='example'
							src={props.arturl}
							style={{
								width: `${props.imageWidth}%`,
								// height : `${imageHeight}%`,
							}}
							fallback='/loadingStatic.webp'
						/>
					</div>
				}
				hoverable
			>
				<div className={styles.container}>
					<Meta
						title={props.artName}
						description={props.artist}
						style={{
							width: 100,
						}}
						className={styles.left}
					></Meta>
					<Heart
						style={{
							width: 50,
						}}
						className={styles.right}
						isActive={active}
						onClick={() => setActive(!active)}
					/>
				</div>
			</Card>
		</div>
	);
};

export default ArtBox;
