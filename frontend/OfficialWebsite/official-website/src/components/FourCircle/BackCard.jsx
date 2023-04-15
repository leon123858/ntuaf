import styles from './BackCard.module.css';
import { Image } from 'antd';
import { useContext } from 'react';
import { BreakPointContext } from '../../useBreakPoint';
const BackCard = ({ BackCardContent, setFlip, closeModel }) => {
	const { inBreakPoint } = useContext(BreakPointContext);
	const handleFlip = () => {
		setFlip((prev) => {
			return !prev;
		});
	};
	return (
		<>
			{inBreakPoint ? (
				<div
					className={styles.backCardWrapper}
					style={{
						backgroundImage: `url("${BackCardContent.backCardBackgroundUrl}")`,
					}}
				>
					<div
						className={styles.title}
						style={{ backgroundImage: `url("${BackCardContent.iconUrl}")` }}
					></div>
					<div className={styles.flipButton} onClick={handleFlip}>
						<Image
							src={
								'https://drive.google.com/uc?export=view&id=11lajpr9gX8p5ly6GjC5ALHFosjQ5QOHA'
							}
							alt={'loading'}
							preview={false}
							fallback='/loading.jpg'
						></Image>
					</div>
				</div>
			) : (
				<div
					className={styles.lgBackCardWrapper}
					style={{
						backgroundImage: `url("${BackCardContent.backCardBackgroundUrl}")`,
					}}
				>
					<div
						className={styles.lgTitle}
						style={{ backgroundImage: `url("${BackCardContent.iconUrl}")` }}
					></div>
					<div className={styles.flipButton} onClick={handleFlip}>
						<Image
							src={
								'https://drive.google.com/uc?export=view&id=11lajpr9gX8p5ly6GjC5ALHFosjQ5QOHA'
							}
							alt={'loading'}
							preview={false}
							fallback='/loading.jpg'
						></Image>
					</div>
				</div>
			)}
		</>
	);
};
export default BackCard;
