import { GameObject } from '@eva/eva.js';
import { Img } from '@eva/plugin-renderer-img';
import { Transition } from '@eva/plugin-transition';
import { Render } from '@eva/plugin-renderer-render';

export default function createBackground(index : number) {
	const bg = new GameObject('bg', {
		size: { width: 790, height: 1630 },
		position: {
			x: 0,
			y: 0,
		},
		origin: {
			x: 0,
			y: 0,
		},
		anchor: {
			x: 0,
			y: 0,
		},
	});

	
	let string = 'bg'
	console.log(string+index);

	const img = new Img({
		resource: string+index,
	});

	bg.addComponent(new Render({
		alpha: 1, 
	}));

	bg.addComponent(img);
	

	const animation = bg.addComponent(new Transition());

	animation.group = {
		fadeOut: [
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
		move: [
			{
			  name: 'alpha',
			  component: bg.getComponent(Render),
			  values: [
				{ time: 0, value: 1, tween: "linear" },
				{ time: 1000, value: 0, tween: "linear" },
			  ],
			},
		],
	};
	console.log(bg);
	return { background: bg, animation };
}
