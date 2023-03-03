import React, { useEffect, useState } from 'react';
import style from './Display.module.css';
import BlockInterpreter from '../utils/blockInterpreter';
import { BlOCK_TYPE, getEvent } from '@leon123858/ntuaf-sdk';
import Textbox from '../components/Textbox/TextBox';
import ImageBox from '../components/ImageBox/ImageBox';
import Video from '../components/VideoBox/videoBox';
import ImageList from '../components/ImageList/ImageList';
import Link from '../components/Link/Link';
import Map from '../components/Map/Map';
import { useParams } from 'react-router-dom';
import { Spin, Image } from 'antd';

const block2element = {
	[BlOCK_TYPE.TEXT_A]: ({ text, title, url }) => {
		return (
			<Textbox
				key={[BlOCK_TYPE.TEXT_A]}
				text={{
					type: BlOCK_TYPE.TEXT_A,
					title: title,
					text: text,
					url: url,
				}}
			/>
		);
	},
	[BlOCK_TYPE.TEXT_B]: ({ text, title }) => {
		return (
			<Textbox
				key={BlOCK_TYPE.TEXT_B}
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
				key={BlOCK_TYPE.TEXT_C}
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
				key={BlOCK_TYPE.TEXT_D}
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
				key={BlOCK_TYPE.IMAGE_A}
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
				key={BlOCK_TYPE.IMAGE_B}
				image={{
					type: BlOCK_TYPE.IMAGE_B,
					text: text,
					url: url,
				}}
			/>
		);
	},
	[BlOCK_TYPE.LINK_A]: ({ url, title }) => {
		return <Link url={url} title={title} key={BlOCK_TYPE.LINK_A} />;
	},
	[BlOCK_TYPE.MAP_A]: ({ text, url }) => {
		return (
			<Map
				key={BlOCK_TYPE.MAP_A}
				type={[BlOCK_TYPE.MAP_A]}
				url={url}
				text={text}
			/>
		);
	},
	[BlOCK_TYPE.MAP_B]: ({ text, url }) => {
		return (
			<Map
				key={BlOCK_TYPE.MAP_B}
				type={[BlOCK_TYPE.MAP_B]}
				url={url}
				text={text}
			/>
		);
	},
	[BlOCK_TYPE.VIDEO_A]: ({ title, url, items, text }) => {
		return <Video url={url} text={title} key={BlOCK_TYPE.VIDEO_A} />;
	},
	[BlOCK_TYPE.IMAGE_LIST_A]: ({ title, items }) => {
		return (
			<ImageList
				key={[BlOCK_TYPE.IMAGE_LIST_A]}
				data={{
					type: [BlOCK_TYPE.IMAGE_LIST_A],
					topic: title,
					items: items,
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_LIST_B]: ({ title, url, items, text }) => {
		return (
			<ImageList
				key={9}
				data={{
					type: [BlOCK_TYPE.IMAGE_LIST_B],
					title: title,
					items: items,
					url: url,
					text: text,
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_LIST_C]: ({ title, url, items, text }) => {
		return (
			<ImageList
				key={[BlOCK_TYPE.IMAGE_LIST_C]}
				data={{
					type: [BlOCK_TYPE.IMAGE_LIST_C],
					title: title,
					items: items,
					url: url,
					text: text,
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_LIST_D]: ({ title, items }) => {
		return (
			<ImageList
				key={[BlOCK_TYPE.IMAGE_LIST_D]}
				data={{
					type: [BlOCK_TYPE.IMAGE_LIST_A],
					topic: title,
					items: items,
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_LIST_E]: ({ title, items }) => {
		return (
			<ImageList
				key={[BlOCK_TYPE.IMAGE_LIST_E]}
				data={{
					type: [BlOCK_TYPE.IMAGE_LIST_E],
					topic: title,
					items: items,
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
			console.log(event);
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
