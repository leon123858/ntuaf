import React, { useContext } from 'react';
import styles from './LoginButton.module.css';
import { login, logout } from '@leon123858/ntuaf-sdk';
import { BreakPointContext } from '../../useBreakPoint';

const LoginButton = () => {
	const { isLogin, handleLogout, inBreakPoint } = useContext(BreakPointContext);

	return (<>{
		!isLogin ? (
			inBreakPoint?
			<button onClick={async () => await login()} className={styles.loginButton}>
			登入
			</button>
			:
			<button onClick={async () => await login()} className={styles.lgLoginButton}>
				登入
			</button>
			
			) : (
			<button
				onClick={async () => {
					await logout();
					handleLogout();
				}}
				className={styles.loginButton}
			>
				登出
			</button>
		)
	}
	</>
	)
};

export default LoginButton;
