import React, { useEffect, useState, useContext } from 'react';
import style from './Display.module.css';
import BlockInterpreter from '../utils/blockInterpreter';
import { BlOCK_TYPE, getEvent } from '@leon123858/ntuaf-sdk';
import Textbox from '../components/Textbox/TextBox';
import ImageBox from '../components/ImageBox/ImageBox';
import Video from '../components/VideoBox/VideoBox';
import ImageList from '../components/ImageList/ImageList';
import Link from '../components/Link/Link';
import Map from '../components/Map/Map';
import { useParams } from 'react-router-dom';
import { Image, message } from 'antd';
import { BreakPointContext } from '../useBreakPoint';

const block2element = {
	[BlOCK_TYPE.TEXT_A]: ({ text, title, url, key }) => {
		return (
			<Textbox
				key={key}
				text={{
					type: BlOCK_TYPE.TEXT_A,
					title: title,
					text: text,
					url: url,
				}}
			/>
		);
	},
	[BlOCK_TYPE.TEXT_B]: ({ text, title, key }) => {
		return (
			<Textbox
				key={key}
				text={{
					type: BlOCK_TYPE.TEXT_B,
					title: title,
					text: text,
				}}
			/>
		);
	},
	[BlOCK_TYPE.TEXT_C]: ({ text, title, key }) => {
		return (
			<Textbox
				key={key}
				text={{
					type: BlOCK_TYPE.TEXT_C,
					title: title,
					text: text,
				}}
			/>
		);
	},
	[BlOCK_TYPE.TEXT_D]: ({ text, key, url }) => {
		return (
			<Textbox
				key={key}
				text={{
					type: BlOCK_TYPE.TEXT_D,
					text: text,
					url: url,
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_A]: ({ text, url, key }) => {
		return (
			<ImageBox
				key={key}
				image={{
					type: BlOCK_TYPE.IMAGE_A,
					text: text,
					url: url,
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_B]: ({ text, url, key }) => {
		return (
			<ImageBox
				key={key}
				image={{
					type: BlOCK_TYPE.IMAGE_B,
					text: text,
					url: url,
				}}
			/>
		);
	},
	[BlOCK_TYPE.LINK_A]: ({ url, title, key }) => {
		return <Link url={url} title={title} key={key} />;
	},
	[BlOCK_TYPE.MAP_A]: ({ text, url, key }) => {
		return <Map key={key} type={[BlOCK_TYPE.MAP_A]} url={url} text={text} />;
	},
	[BlOCK_TYPE.MAP_B]: ({ text, url, key }) => {
		return <Map key={key} type={[BlOCK_TYPE.MAP_B]} url={url} text={text} />;
	},
	[BlOCK_TYPE.VIDEO_A]: ({ title, url, key, text }) => {
		return <Video url={url} title={title} text={text} key={key} />;
	},
	[BlOCK_TYPE.IMAGE_LIST_A]: ({ title, items, key }) => {
		return (
			<>
				<ImageList
					key={key}
					data={{
						type: [BlOCK_TYPE.IMAGE_LIST_A],
						topic: title,
						items: items,
					}}
				/>
			</>
		);
	},
	[BlOCK_TYPE.IMAGE_LIST_B]: ({ title, url, items, text, key }) => {
		return (
			<ImageList
				key={key}
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
	[BlOCK_TYPE.IMAGE_LIST_C]: ({ title, url, items, text, key }) => {
		return (
			<ImageList
				key={key}
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
	[BlOCK_TYPE.IMAGE_LIST_D]: ({ title, items, key }) => {
		return (
			<ImageList
				key={key}
				data={{
					type: [BlOCK_TYPE.IMAGE_LIST_D],
					topic: title,
					items: items,
				}}
			/>
		);
	},
	[BlOCK_TYPE.IMAGE_LIST_E]: ({ title, items, key }) => {
		return (
			<ImageList
				key={key}
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
	const [messageApi, contextHolder] = message.useMessage();
	const { inBreakPoint } = useContext(BreakPointContext);

	useEffect(() => {
		(async function () {
			try {
				const event = await getEvent(displayId);
				setEventState(event);
			} catch {
				messageApi.error('資料版本有誤');
			}
		})();
	}, [displayId, messageApi]);

	return eventState ? (
		<>
			{contextHolder}
			<Image
				preview={false}
				src={eventState.image?.banner}
				fallback='/loading.jpg'
				width={'100%'}
			/>
			<h1 style={{ textAlign: 'center', margin: '8% 0', fontWeight: '500' }}>
				{eventState.title}
			</h1>
			<div
				className={style.APP}
				style={
					inBreakPoint
						? { maxWidth: 800, margin: '0 auto', width: '86%' }
						: { maxWidth: 800, margin: '0 auto', width: '80%' }
				}
			>
				{interpreter.transfer(eventState.blocks)}
			</div>
		</>
	) : (
		<div className={style.Spin}>
			{contextHolder}
			<img src={'/loading.gif'} style={{ width: '18vw' }} alt='loading...' />
		</div>
	);
}

export default Display;
