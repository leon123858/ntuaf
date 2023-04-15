import React from 'react';
import { useContext } from 'react';
import { BreakPointContext } from '../../useBreakPoint';


const Hr = ({ title }) => {
	const {inBreakPoint} = useContext(BreakPointContext)
	return (
		<>
			<h5 style={{ color: '#000000', fontSize: inBreakPoint?"16px":"18px", paddingBottom: '5px' ,letterSpacing:"2px"}}>
				{title}
			</h5>
			<div>
				<hr
					style={{
						background: 'linear-gradient(to left, #A9CF59, #E73273, #25499D)',
						height: '2px',
						border: '0px',
					}}
				/>
			</div>
		</>
	);
};
export default Hr;
