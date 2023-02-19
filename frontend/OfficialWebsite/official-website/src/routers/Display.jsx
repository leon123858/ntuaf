import React, { useEffect, useState } from 'react';
import style from './Display.module.css';
import BlockInterpreter from '../utils/blockInterpreter';
import { BlOCK_TYPE, getEvent } from '@leon123858/ntuaf-sdk';
import Textbox from '../components/Textbox/TextBox';
import ImageBox from '../components/ImageBox/ImageBox';
import Video from '../components/VideoBox/VideoBox';
import ImageList from '../components/ImageList/ImageList';
import Link from '../components/Link/Link'
import Map from '../components/Map/Map';
import { useParams } from 'react-router-dom';
import { Spin, Image } from 'antd';

const block2element = {
	[BlOCK_TYPE.TEXT_A]: ({ text, title, url }) => {
		return (
			<Textbox
				key={0}
				text={{
					type: BlOCK_TYPE.TEXT_A,
					title: title,
					text: text,
					url: url
				}}
			/>
		);
	},
	[BlOCK_TYPE.TEXT_B]: ({ text, title }) => {
		return (
			<Textbox
				key={1}
				text={{
					type: BlOCK_TYPE.TEXT_B,
					title: title,
					text: text,
				}}
			/>
		);
	},
	[BlOCK_TYPE.TEXT_C]: ({ text, title }) => {

		return (
			<Textbox
				key={2}
				text={{
					type: BlOCK_TYPE.TEXT_C,
					title: title,
					text: text,
				}}
			/>
		);
	},
	[BlOCK_TYPE.TEXT_D]: ({ text }) => {
		return (
			<Textbox
				key={3}
				text={{
					type: BlOCK_TYPE.TEXT_D,
					text: text,
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_A]: ({ text, url }) => {
		return (
			<ImageBox
				key={4}
				image={{
					type: BlOCK_TYPE.IMAGE_A,
					text: text,
					url: url,
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_B]: ({ text, url }) => {
		return (
			<ImageBox
				key={5}
				image={{
					type: BlOCK_TYPE.IMAGE_B,
					text: text,
					url: url,
				}}
			/>
		);
	},
	[BlOCK_TYPE.LINK_A]: ({ url, title }) => {
		return (
			<Link url={url} title={title} />
		);
	},
	[BlOCK_TYPE.MAP_A]: ({ text, url }) => {
		return (
			<Map
				key={3}
				type={[BlOCK_TYPE.MAP_A]}
				url={url}
				text={text}
			/>
		);
	},
	[BlOCK_TYPE.MAP_B]: ({ text, url }) => {
		return (
			<Map
				key={3}
				type={[BlOCK_TYPE.MAP_B]}
				url={url}
				text={text}
			/>
		);
	},
	[BlOCK_TYPE.VIDEO_A]: ({ title, url }) => {
		return <Video url={url} text={title} key={7} />;
	},

	[BlOCK_TYPE.IMAGE_LIST_A]: ({ text, url, title, items }) => {
		return (
			<h1>hi</h1>
		);
	},
	[BlOCK_TYPE.IMAGE_LIST_B]: ({ text, url, title, items }) => {
		return (
			<ImageList
				key={9}
				data={{
					type: [BlOCK_TYPE.IMAGE_LIST_B],
					topic: title,
					images: items,
				}}
			/>
		);
	},
};

function Display() {
	const { displayId } = useParams();
	const interpreter = new BlockInterpreter(block2element);
	const [eventState, setEventState] = useState(undefined);
	useEffect(() => {
		(async function () {
			const event = await getEvent(displayId);
			setEventState(event);
		})();
	}, [displayId]);

	return eventState ? (
		<>
			<Image
				className={style.Image}
				preview={false}
				src={eventState.image?.banner}
				fallback='https://fakeimg.pl/1900x500/?text=WrongImage'
			/>
			<div className={style.APP}>{interpreter.transfer(eventState.blocks)}</div>
		</>
	) : (
		<div className={style.Spin}>
			<Spin></Spin>
		</div>
	);
}

export default Display;
