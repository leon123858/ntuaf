import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Share() {
	const { type } = useParams();
	const [src, setSrc] = useState('/心理測驗(結果)_A.jpg');
	useEffect(() => {
		switch (type) {
			case 'A':
				setSrc('/心理測驗(結果)_A.jpg');
				break;
			case 'B':
				setSrc('/心理測驗(結果)_B.jpg');
				break;
			case 'C':
				setSrc('/心理測驗(結果)_C.jpg');
				break;
			default:
				break;
		}
	}, [type]);

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<img alt='' style={{ maxHeight: '100vh' }} src={src} />
		</div>
	);
}
export default Share;
