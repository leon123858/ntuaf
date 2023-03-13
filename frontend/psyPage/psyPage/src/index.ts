import createBackground from './gameObjects/background';
import createBasketFront from './gameObjects/board/basketFront';
import createBoard from './gameObjects/board/board';
import createBall from './gameObjects/ball';
import createBtn from './gameObjects/btn';
import resources from './resources';

import { Game, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { ImgSystem } from '@eva/plugin-renderer-img';
import { EventSystem } from '@eva/plugin-renderer-event';
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { RenderSystem } from '@eva/plugin-renderer-render';
import { TransitionSystem, Transition } from '@eva/plugin-transition';
import { GraphicsSystem } from '@eva/plugin-renderer-graphics';
import { TextSystem } from '@eva/plugin-renderer-text';

resource.addResource(resources);

const game = new Game({
	systems: [
		new RendererSystem({
			canvas: document.querySelector('#canvas'),
			width: 750,
			height: 1484,
			antialias: true,
		}),
		new ImgSystem(),
		new TransitionSystem(),
		new SpriteAnimationSystem(),
		new RenderSystem(),
		new EventSystem(),
		new GraphicsSystem(),
		new TextSystem(),
	],
});

game.scene.transform.size.width = 750;
game.scene.transform.size.height = 1484;

const pos = {
	x: 500,
	y: 1100,
};

let isBallExist = true;

let ball = createBall(pos);
const { basetFront, playAnim } = createBasketFront();
const btn = createBtn({
	text: '讓球消失出現',
	transform: {
		position: {
			x: 0,
			y: -120,
		},
		origin: {
			x: 0.5,
			y: 0.5,
		},
		anchor: {
			x: 0.5,
			y: 1,
		},
	},
	callback: () => {
		if (isBallExist) {
			ball.remove();
			isBallExist = false;
		} else {
			ball = createBall(pos);
			game.scene.addChild(ball);
			isBallExist = true;
		}
		// alert('还没做呢～一起来完善吧');
	},
});

const btn2 = createBtn({
	text: '換場景',
	transform: {
		position: {
			x: 0,
			y: -300,
		},
		origin: {
			x: 0.5,
			y: 0.5,
		},
		anchor: {
			x: 0.5,
			y: 1,
		},
	},
	callback: () => {
		animation.play('move', 1);
		animation.on('finish', (name) => {
			// name === 'move' && animation.play('back', 1);
		});
	},
});

const background = createBackground();
const animation = background.addComponent(new Transition());
animation.group = {
	back: [
		{
			name: 'position.x',
			component: background.transform,
			values: [
				{
					time: 0,
					value: 1,
					tween: 'ease-out',
				},
				{
					time: 300,
					value: 0,
					tween: 'ease-in',
				},
			],
		},
		{
			name: 'position.y',
			component: background.transform,
			values: [
				{
					time: 0,
					value: 1,
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
			name: 'position.x',
			component: background.transform,
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
			component: background.transform,
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
const background2 = createBackground();
game.scene.addChild(background2);
game.scene.addChild(background);
game.scene.addChild(createBoard());
game.scene.addChild(ball);
game.scene.addChild(basetFront);
game.scene.addChild(btn);
game.scene.addChild(btn2);

window.playAnim = playAnim;
window.game = game;
