import React from 'react';
import style from './Artwork.module.css';
import Form from '../components/ArtWork/Form';
import ArtEvent from '../components/ArtWork/ArtWork';

function Artworkupload() {
	return (
		<>
			<div className={style.APP}></div>
			{/* <ArtEvent/> */}
			<Form/>
		</>
	);
}

export default Artworkupload;