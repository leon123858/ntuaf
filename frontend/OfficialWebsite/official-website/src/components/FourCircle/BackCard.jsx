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
					onClick={handleFlip}
				>
					<div
						className={styles.title}
						style={{ backgroundImage: `url("${BackCardContent.iconUrl}")` }}
					></div>
					<div className={styles.flipButton} >
						<Image
							src={
								'/cardBackArrow.svg'
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
					onClick={handleFlip}
				>
					<div
						className={styles.lgTitle}
						style={{ backgroundImage: `url("${BackCardContent.iconUrl}")` }}
					></div>
					<div className={styles.flipButton} >
						<Image
							src={
								'/cardBackArrow.svg'
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
