import styles from './LoginButton.module.css';
import { login } from '@leon123858/ntuaf-sdk';

const LoginButton = () => {
	return (
		<button onClick={async () => await login()} className={styles.loginButton}>
			登入
		</button>
	);
};

export default LoginButton;
