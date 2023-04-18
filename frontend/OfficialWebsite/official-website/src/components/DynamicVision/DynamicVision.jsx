import styles from './DynamicVision.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { useContext } from 'react';
const DynamicVision = () => {
	const { inBreakPoint } = useContext(BreakPointContext);
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
