import React, { useEffect, useState } from 'react';
import style from './Display.module.css';
import BlockInterpreter from '../utils/blockInterpreter';
import { BlOCK_TYPE, ITEM_TYPE, getEvent } from '@leon123858/ntuaf-sdk';
import Textbox from '../components/Textbox/TextBox';
import ImageBox from '../components/ImageBox/ImageBox';
import Video from '../components/VideoBox/videoBox';
import ImageList from '../components/ImageList/ImageList';
import { useParams } from 'react-router-dom';
import { Spin, Image } from 'antd';

const block2element = {
	[BlOCK_TYPE.TEXT_A]: ({ text, title }) => {
		return (
			<Textbox
				text={{
					type: BlOCK_TYPE.TEXT_A,
					topic: title,
					content: text,
				}}
			/>
		);
	},
	[BlOCK_TYPE.TEXT_B]: ({ text, title }) => {
		return (
			<Textbox
				text={{
					type: BlOCK_TYPE.TEXT_B,
					topic: title,
					content: text,
				}}
			/>
		);
	},
	[BlOCK_TYPE.TEXT_C]: ({ text, title }) => {
		return (
			<Textbox
				text={{
					type: BlOCK_TYPE.TEXT_C,
					topic: title,
					content: text,
				}}
			/>
		);
	},
	[BlOCK_TYPE.TEXT_D]: ({ text, title }) => {
		return (
			<Textbox
				text={{
					type: BlOCK_TYPE.TEXT_D,
					topic: title,
					content: text,
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_A]: ({ text, url }) => {
		return (
			<ImageBox
				images={{
					type: BlOCK_TYPE.IMAGE_A,
					images: [
						{
							src: url,
							content: text,
						},
					],
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_B]: ({ text, url }) => {
		return (
			<ImageBox
				images={{
					type: BlOCK_TYPE.IMAGE_B,
					images: [
						{
							src: url,
							content: text,
						},
					],
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_C]: ({ text, url }) => {
		return (
			<ImageBox
				images={{
					type: BlOCK_TYPE.IMAGE_C,
					images: [
						{
							src: url,
							content: text,
						},
					],
				}}
			/>
		);
	},
	[BlOCK_TYPE.VIDEO_A]: ({ text, url }) => {
		return <Video />;
	},
	[BlOCK_TYPE.IMAGE_LIST_A]: ({ text, url, title, items }) => {
		return (
			<ImageList
				data={{
					type: [BlOCK_TYPE.IMAGE_LIST_A],
					topic: title,
					images: items,
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_LIST_B]: ({ text, url, title, items }) => {
		return (
			<ImageList
				data={{
					type: [BlOCK_TYPE.IMAGE_LIST_B],
					topic: title,
					images: items,
				}}
			/>
		);
	},
};
const item2element = {
	[ITEM_TYPE.作者]: ({ url, name, key }) => {
		return (
			<div key={key}>
				<h1>作者{name}</h1>;<h2>{url}</h2>;
			</div>
		);
	},
	[ITEM_TYPE.社團]: ({ url, name, key }) => {
		return (
			<div key={key}>
				<h1>社團{name}</h1>;<h2>{url}</h2>;
			</div>
		);
	},
};

function Display() {
	const { displayId } = useParams();
	const interpreter = new BlockInterpreter(block2element, item2element);
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
