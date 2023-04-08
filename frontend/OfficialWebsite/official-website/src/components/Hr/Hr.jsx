import React from 'react';

const Hr = ({ title }) => {
	return (
		<>
			<h5 style={{ color: '#000000', fontSize: '20px', paddingBottom: '5px' }}>
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
