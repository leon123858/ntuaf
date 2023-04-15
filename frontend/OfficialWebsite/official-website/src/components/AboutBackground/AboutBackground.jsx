import styles from './AboutBackground.module.css';
import { useContext } from 'react';
import { BreakPointContext } from '../../useBreakPoint';
const AboutBackground = () => {
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
export default AboutBackground;