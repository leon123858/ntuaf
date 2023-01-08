import { React, createContext, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';

const BreakPointContext = createContext({
    inBreakPoint: true,
    toggleInBreakPoint: () => {},
});

function BreakPointProvider({ children }) {
    const [inBreakPoint, setInBrealPoint] = useState(true);
    const width = useWindowWidth();
    
    const toggleInBreakPoint = () => {
        if (width > 834) {
            setInBrealPoint(false);
        } else {
            setInBrealPoint(true);
        }
    }
    const defaultValue = {
        inBreakPoint,
        toggleInBreakPoint
      };

    return (
        <BreakPointContext.Provider value={defaultValue}>
            {children}
        </BreakPointContext.Provider>
    );
}

export { BreakPointProvider, BreakPointContext };
