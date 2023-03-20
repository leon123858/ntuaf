import { React, createContext, useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { subscriptAuthState } from '@leon123858/ntuaf-sdk';

const BreakPointContext = createContext({
	inBreakPoint: true,
	isLogin: false,
	breakPoint: 834,
	handleLogout: () => {}
});

function BreakPointProvider({ children }) {
	const [inBreakPoint, setInBreakPoint] = useState(true);
	const [isLogin, setLogin] = useState(false);
	const breakPoint = 834;
	const width = useWindowWidth();

	useEffect(() => {
		subscriptAuthState(() => {
			setLogin(true);
		});
	}, []);

	useEffect(() => {
		if (width > breakPoint) {
			setInBreakPoint(false);
		} else {
			setInBreakPoint(true);
		}
	}, [width]);

	const handleLogout = () => {
		setLogin(false);
	}

	const defaultValue = {
		inBreakPoint,
		isLogin,
		breakPoint,
		handleLogout
	};

	return (
		<BreakPointContext.Provider value={defaultValue}>
			{children}
		</BreakPointContext.Provider>
	);
}

export { BreakPointProvider, BreakPointContext };
