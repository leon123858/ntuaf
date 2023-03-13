import { GameObject } from '@eva/eva.js';
import { Img } from '@eva/plugin-renderer-img';
import { Transition } from '@eva/plugin-transition';
export default function createBackground() {
	const bg = new GameObject('bg', {
		size: { width: 750, height: 1624 },
		origin: { x: 0.5, y: 1 },
		position: {
			x: 0,
			y: 120,
		},
		anchor: {
			x: 0.5,
			y: 1,
		},
	});

	bg.addComponent(
		new Img({
			resource: 'bg',
		})
	);

	const animation = bg.addComponent(new Transition());

	animation.group = {
		move: [
			{
				name: 'position.x',
				component: bg.transform,
				values: [
					{
						time: 0,
						value: 0,
						tween: 'ease-out',
					},
					{
						time: 1000,
						value: 800,
						tween: 'ease-in',
					},
				],
			},
			{
				name: 'position.y',
				component: bg.transform,
				values: [
					{
						time: 0,
						value: 0,
						tween: 'ease-in',
					},
					{
						time: 300,
						value: 0,
					},
				],
			},
		],
	};
	return { background: bg, animation };
}
