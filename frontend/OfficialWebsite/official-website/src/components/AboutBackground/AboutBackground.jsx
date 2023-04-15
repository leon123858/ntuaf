import styles from './AboutBackground.module.css';
import { useContext } from 'react';
import { BreakPointContext } from '../../useBreakPoint';
const AboutBackground = () => {
	const { inBreakPoint } = useContext(BreakPointContext);
	return (
		<div className={styles.Wrapper}>
			<img
				src={inBreakPoint ? '/about/環-手機版.svg' : '/about/環.svg'}
				alt='BackGround'
				style={{ width: '100%' }}
			/>
		</div>
	);
};
export default AboutBackground;
