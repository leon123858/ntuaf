import styles from './FrontCard.module.css';
import { Image } from 'antd';
import { useContext } from 'react';
import { BreakPointContext } from '../../useBreakPoint';
const FrontCard = ({ FrontCardContent, setFlip, closeModel }) => {
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
					className={styles.frontCardWrapper}
					style={{
						backgroundImage: `url("${FrontCardContent.frontCardBackgroundUrl}")`,
					}}
					onClick={handleFlip}
				>
					<div
						className={styles.title}
						style={{
							backgroundImage: `url("${FrontCardContent.iconTextUrl}")`,
						}}
					></div>
					<div className={styles.discription}>
						{FrontCardContent.discription}
					</div>
					<div className={styles.flipButton}>
						<Image
							src={
								'https://drive.google.com/uc?export=view&id=1kMG-u5ilEWa3i2_CSuxAEP9xS2JVekDl'
							}
							alt={'loading'}
							preview={false}
							fallback='/loading.jpg'
							rel='preload'
						></Image>
					</div>
				</div>
			) : (
				<div
					className={styles.lgFrontCardWrapper}
					style={{
						backgroundImage: `url("${FrontCardContent.frontCardBackgroundUrl}")`,
					}}
					onClick={handleFlip}
				>
					<div
						className={styles.lgTitle}
						style={{
							backgroundImage: `url("${FrontCardContent.iconTextUrl}")`,
						}}
					></div>
					<div className={styles.discription}>
						{FrontCardContent.discription}
					</div>
					<div className={styles.flipButton}>
						<Image
							src={
								'https://drive.google.com/uc?export=view&id=1kMG-u5ilEWa3i2_CSuxAEP9xS2JVekDl'
							}
							alt={'loading'}
							preview={false}
							fallback='/loading.jpg'
							rel='preload'
						></Image>
					</div>
				</div>
			)}
		</>
	);
};
export default FrontCard;
