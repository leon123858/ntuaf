import styles from './DynamicVision.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { useContext } from 'react';
const DynamicVision = () => {
	const { inBreakPoint } = useContext(BreakPointContext);
	return (
		<div className={styles.Wrapper}>
			{inBreakPoint ? (
				<img
					src='/dynamicVision/dynamicVision.gif'
					alt='dv'
					className={styles.dynamicVision}
				></img>
			) : (
				// <>helo</>
				<img
					src='/dynamicVision/lgDynamicVision.gif'
					alt='dv'
					className={styles.dynamicVision}
				></img>
			)}
		</div>
	);
};
export default DynamicVision;
