import { React, createContext, useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { subscriptAuthState } from '@leon123858/ntuaf-sdk';

const BreakPointContext = createContext({
	inBreakPoint: true,
	isLogin: false,
});

function BreakPointProvider({ children }) {
	const [inBreakPoint, setInBreakPoint] = useState(true);
	const [isLogin, setLogin] = useState(false);
	const width = useWindowWidth();

	useEffect(() => {
		subscriptAuthState(() => {
			setLogin(true);
		});
	}, []);

	useEffect(() => {
		if (width > 834) {
			setInBreakPoint(false);
		} else {
			setInBreakPoint(true);
		}
	}, [width]);

	const defaultValue = {
		inBreakPoint,
		isLogin,
	};

	return (
		<BreakPointContext.Provider value={defaultValue}>
			{children}
		</BreakPointContext.Provider>
	);
}

export { BreakPointProvider, BreakPointContext };
