import React from 'react';

const Hr = ({ title }) => {
	return (
		<>
			<h3 style={{ color: '#D7497C' }}>{title}</h3>
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
