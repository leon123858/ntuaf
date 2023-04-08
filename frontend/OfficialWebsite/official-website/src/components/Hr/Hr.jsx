import React from 'react';

const Hr = ({ title }) => {
	return (
		<>
			<h5 style={{ color: '#D7497C', fontSize: '20px' }}>{title}</h5>
			<div>
				<hr
					style={{
						background: 'linear-gradient(to right, red, yellow)',
						height: '2px',
						border: '0px',
					}}
				/>
			</div>
		</>
	);
};
export default Hr;
