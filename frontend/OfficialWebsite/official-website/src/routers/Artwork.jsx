import React from 'react';
import style from './Artwork.module.css';
// import { Link } from 'react-router-dom';
import ArtEvent from '../components/ArtWork/ArtWork';

function Artwork() {
	return (
		<>
			<div className={style.APP}>
				<ArtEvent />
			</div>
			{/* <Link to={'/artworkList'}>看其他人的作品</Link> */}
		</>
	);
}

export default Artwork;
