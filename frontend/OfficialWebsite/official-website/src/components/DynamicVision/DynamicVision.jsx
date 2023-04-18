import styles from './DynamicVision.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { useContext } from 'react';
const DynamicVision = () => {
	const { inBreakPoint } = useContext(BreakPointContext);
	/*
		<video
			src={'/dynamicVision/dynamicVision.mp4'}
			width={'100%'}
			autoPlay
			muted
			preload
			loop
			playsInline
			poster={'/dynamicVision/preview.jpeg'}
			className={styles.dynamicVision}
		></video>
	*/
	return (
		<div className={styles.Wrapper}>
			{inBreakPoint ? (
				<img
					src={'/dynamicVision/dynamicVision.webp'}
					alt='dv'
					className={styles.dynamicVision}
				></img>
			) : (
				<img
					src={'/dynamicVision/lgDynamicVision.webp'}
					alt='dv'
					className={styles.lgDynamicVision}
				></img>
			)}
		</div>
	);
};
export default DynamicVision;
