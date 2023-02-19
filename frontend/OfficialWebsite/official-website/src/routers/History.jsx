import React from 'react';
import style from './Home.module.css';
import UploadForm from '../components/UploadForm/UploadForm';

function History() {
	return (
		<>
			<div className={style.APP}>
				<UploadForm />
			</div>
		</>
	);
}

export default History;
