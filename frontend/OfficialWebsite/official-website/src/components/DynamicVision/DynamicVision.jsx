import styles from './DynamicVision.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { useContext } from 'react';
const DynamicVision = () => {
	const { inBreakPoint } = useContext(BreakPointContext);
	return (
		<div className={styles.Wrapper}>
			{inBreakPoint ? (
				<video
					src={'/dynamicVision/dynamicVision.mp4'}
					width={'100%'}
					autoPlay
					muted
					preload
					loop
					poster={'/dynamicVision/preview.jpeg'}
					className={styles.dynamicVision}
				></video>
			) : (
				<video
					src={'/dynamicVision/lgDynamicVision.mp4'}
					width={'100%'}
					autoPlay
					muted
					preload
					loop
					poster={'/dynamicVision/lgPreview.jpeg'}
					className={styles.lgDynamicVision}
				></video>
			)}
		</div>
	);
};
export default DynamicVision;
