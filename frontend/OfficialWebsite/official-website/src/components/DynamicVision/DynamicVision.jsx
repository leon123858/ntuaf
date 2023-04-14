import styles from './DynamicVision.module.css';
import { useContext } from 'react';
import { BreakPointContext } from '../../useBreakPoint';
const DynamicVision = () => {
	const { inBreakPoint } = useContext(BreakPointContext);
	return (
		<div className={styles.Wrapper}>
			<img
				src={inBreakPoint ? '../../about/環-手機版.svg' : '../../about/環.svg'}
				alt=''
			/>
			{/* <video
				src={'/video.mp4'}
				width={'100%'}
				autoPlay
				muted
				preload
				loop
			></video> */}
		</div>
	);
};
export default DynamicVision;
