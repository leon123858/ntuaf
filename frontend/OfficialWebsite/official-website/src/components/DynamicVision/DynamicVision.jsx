import styles from './DynamicVision.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { useContext } from 'react';
const DynamicVision = () => {
	const { inBreakPoint } = useContext(BreakPointContext);
	return (
		<div className={styles.Wrapper}>
			{inBreakPoint ? (
				<img
					src='https://drive.google.com/uc?export=view&id=1ywFn4Q82LNivQ-4yEyODJeJZ_jpdIpXS'
					alt='dv'
				></img>
			) : (
				// <>helo</>
				<img
					src='https://drive.google.com/uc?export=view&id=1mZvb9NhPA-XW2_4OynsnBFd9oHVjsCLT'
					alt='dv'
				></img>
			)}
		</div>
	);
};
export default DynamicVision;
