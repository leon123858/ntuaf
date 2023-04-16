import createBackground from './gameObjects/background';

import createBtn from './gameObjects/btn';
import createBgm from './gameObjects/bgm';

import resources from './resources';

import { Game, LOAD_EVENT, Transform, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { ImgSystem } from '@eva/plugin-renderer-img';
import { EventSystem } from '@eva/plugin-renderer-event';
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { RenderSystem } from '@eva/plugin-renderer-render';
import { TransitionSystem } from '@eva/plugin-transition';
import { GraphicsSystem } from '@eva/plugin-renderer-graphics';
import { TextSystem } from '@eva/plugin-renderer-text';
import { SoundSystem } from '@eva/plugin-sound';
import { Img } from '@eva/plugin-renderer-img';
import { Event } from '@eva/plugin-renderer-event';

import { Render } from '@eva/plugin-renderer-render';

import $ from 'jquery';

async function load_game() {
	// console.log(resources);

	const canvasElement = document.querySelector('#canvas') as HTMLCanvasElement;

	const canvasStyles = `
  #canvas {
    width: 100%;
    touch-action: auto;
    cursor: inherit;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }
`;

	const styleElement = document.createElement('style');
	styleElement.innerHTML = canvasStyles;
	canvasElement.appendChild(styleElement);

	// console.log(renderer);

	let A = 0;
	let B = 0;
	let C = 0;

	const bgSoundList =[...new Array(7)].map((_,index)=>createBgm(index));
	
	// basic setting

	game.scene.addComponent(
		new Render({
			sortableChildren: true,
		})
	);

	// window.addEventListener('resize', () => {
	// 	//updateScale();
	// 	//// console.log(window.outerWidth);
	// 	//renderer.resize(window.outerWidth, window.outerWidth*16/9);
	// });

	game.scene.transform.size.width = 700;
	game.scene.transform.size.height = (game.scene.transform.size.width * 16) / 9;

	const numberOfScene = 6;

	const changeScenefunt = async () => {
		// console.log(backgroundList);
		// console.log(backgroundList[0])
		const animate = backgroundList[sceneIndex].animation;
		animate.play('move', 1);
		// console.log("A = ",A,",B = ",B,",C = ",C);

		//// console.log(""animate.play('fadeOut',1));
		// console.log("scene",backgroundList[sceneIndex]);
		if (sceneIndex == numberOfScene - 1) {
			// console.log("start result");
			backgroundList[sceneIndex + 1].background.getComponent(
				Transform
			).scale.y = 1.1;
			//game.scene.transform.size.width = game.scene.transform.size.width*17/9;
			backgroundList[sceneIndex + 1].background.removeComponent('Img');
			let resourceIN;
			if (A >= B && A >= C) resourceIN = 'bg6';
			else if (B >= A && B >= C) resourceIN = 'bg7';
			else if (C >= A && C >= B) resourceIN = 'bg8';
			const img = new Img({
				resource: resourceIN,
			});
			backgroundList[sceneIndex + 1].background.addComponent(img);
			//$('#canvas').hide();
			$('#share').show();
		}

		btns.forEach((btn) => {
			const disappear = btn.transition;
			// console.log(btn)
			btn.button.removeComponent(Event);
			disappear.play('disappear', 1);
		});

		animate.on('finish', async () => {
			backgroundList[sceneIndex].background.remove();
			bgSoundList[sceneIndex].stop();
			sceneIndex += 1;
			bgSoundList[sceneIndex].play();
			btns.forEach((btn) => btn.button.remove());
			btn_index += 1;
			if (sceneIndex < numberOfScene) {
				btns = [...btnLists[btn_index]].map((value, _) => createBtn(value));
				// console.log("index = ",btn_index);
				// console.log("scene index = ",sceneIndex);
				btns.forEach((btn) => game.scene.addChild(btn.button));
				// console.log(btns);
			}
		});
	};

	const btnLists = [
		[
			{
				name: 'startTest',
				name2: 'startTest',
				transform: {
					position: {
						x: 0,
						y: 400,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.65,
						y: 0.65,
					},
					size: {
						width: 450,
						height: 200,
					},
				},
				callback: async () => {
					await changeScenefunt();
				},
			},
		],
		[
			{
				name: 'Q1Op1',
				name2: 'Q1Op1tap',
				transform: {
					position: {
						x: 70,
						y: 100,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.7,
						y: 0.5,
					},
					size: {
						width: 350,
						height: 140,
					},
				},
				callback: async () => {
					A += 1;
					await changeScenefunt();
				},
			},
			{
				name: 'Q1Op2',
				name2: 'Q1Op2tap',
				transform: {
					position: {
						x: 10,
						y: 250,
					},
					origin: {
						x: 0.5,
						y: 0.3,
					},
					anchor: {
						x: 0.4,
						y: 0.5,
					},
					size: {
						width: 370,
						height: 170,
					},
				},
				callback: async () => {
					B += 1;
					await changeScenefunt();
				},
			},
			{
				name: 'Q1Op3',
				name2: 'Q1Op3tap',
				transform: {
					position: {
						x: 10,
						y: 700,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.7,
						y: 0.4,
					},
					size: {
						width: 350,
						height: 170,
					},
				},
				callback: async () => {
					C += 1;
					await changeScenefunt();
				},
			},
		],
		[
			{
				name: 'Q2Op1',
				name2: 'Q2Op1tap',
				transform: {
					position: {
						x: 50,
						y: 200,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.75,
						y: 0.6,
					},
					size: {
						width: 400,
						height: 400,
					},
				},
				callback: async () => {
					A += 1;
					await changeScenefunt();
				},
			},
			{
				name: 'Q2Op2',
				name2: 'Q2Op2tap',
				transform: {
					position: {
						x: 50,
						y: 150,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.25,
						y: 0.8,
					},
					size: {
						width: 400,
						height: 400,
					},
				},
				callback: async () => {
					B += 1;
					await changeScenefunt();
				},
			},
			{
				name: 'Q2Op3',
				name2: 'Q2Op3tap',
				transform: {
					position: {
						x: 20,
						y: 200,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.75,
						y: 1.0,
					},
					size: {
						width: 450,
						height: 450,
					},
				},
				callback: async () => {
					C += 1;
					await changeScenefunt();
				},
			},
		],
		[
			{
				name: 'Q3Op1',
				name2: 'Q3Op1tap',
				transform: {
					position: {
						x: 50,
						y: 250,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.6,
						y: 0.45,
					},
					size: {
						width: 750,
						height: 330,
					},
				},
				callback: async () => {
					A += 1;
					await changeScenefunt();
				},
			},
			{
				name: 'Q3Op2',
				name2: 'Q3Op2tap',
				transform: {
					position: {
						x: 80,
						y: 200,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.6,
						y: 0.7,
					},
					size: {
						width: 750,
						height: 310,
					},
				},
				callback: async () => {
					B += 1;
					await changeScenefunt();
				},
			},
			{
				name: 'Q3Op3',
				name2: 'Q3Op3tap',
				transform: {
					position: {
						x: 50,
						y: 240,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.6,
						y: 0.9,
					},
					size: {
						width: 750,
						height: 330,
					},
				},
				callback: async () => {
					C += 1;
					await changeScenefunt();
				},
			},
		],
		[
			{
				name: 'Q4Op1',
				name2: 'Q4Op1tap',
				transform: {
					position: {
						x: 30,
						y: 250,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.3,
						y: 0.4,
					},
					size: {
						width: 900,
						height: 280,
					},
				},
				callback: async () => {
					A += 1;
					await changeScenefunt();
				},
			},
			{
				name: 'Q4Op2',
				name2: 'Q4Op2tap',
				transform: {
					position: {
						x: 80,
						y: 140,
					},
					origin: {
						x: 0.5,
						y: 0.55,
					},
					anchor: {
						x: 0.7,
						y: 0.7,
					},
					size: {
						width: 1000,
						height: 300,
					},
				},
				callback: async () => {
					B += 1;
					await changeScenefunt();
				},
			},
			{
				name: 'Q4Op3',
				name2: 'Q4Op3tap',
				transform: {
					position: {
						x: 40,
						y: 270,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.3,
						y: 0.8,
					},
					size: {
						width: 900,
						height: 260,
					},
				},
				callback: async () => {
					C += 1;
					await changeScenefunt();
				},
			},
		],
		[
			{
				name: 'Q5Op1',
				name2: 'Q5Op1tap',
				transform: {
					position: {
						x: 30,
						y: 250,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.3,
						y: 0.2,
					},
					size: {
						width: 700,
						height: 280,
					},
				},
				callback: async () => {
					A += 1;
					await changeScenefunt();
				},
			},
			{
				name: 'Q5Op2',
				name2: 'Q5Op2tap',
				transform: {
					position: {
						x: 150,
						y: 140,
					},
					origin: {
						x: 0.5,
						y: 0.55,
					},
					anchor: {
						x: 0.7,
						y: 0.5,
					},
					size: {
						width: 600,
						height: 200,
					},
				},
				callback: async () => {
					B += 1;
					await changeScenefunt();
				},
			},
			{
				name: 'Q5Op3',
				name2: 'Q5Op3tap',
				transform: {
					position: {
						x: 0,
						y: 270,
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
					anchor: {
						x: 0.3,
						y: 0.6,
					},
					size: {
						width: 500,
						height: 150,
					},
				},
				callback: async () => {
					C += 1;
					await changeScenefunt();
				},
			},
		],
	];

	let btn_index = 0;

	let sceneIndex = 0;
	const backgroundList: any[] = [];
	for (let index = 0; index < numberOfScene + 1; index++) {
		const bg = await createBackground(index);
		backgroundList.push(bg);
	}
	// console.log(backgroundList);
	async function addchild(index: number) {
		game.scene.addChild(backgroundList[index].background);
	}

	for (let index = 0; index < numberOfScene + 1; index++) {
		const result = await addchild(index);
	}
	let btns = [...btnLists[btn_index]].map((value, _) => createBtn(value));

	btns.forEach((btn) => game.scene.addChild(btn.button));
	bgSoundList[0].play()
}

declare global {
	interface Window {
		resources: any;
	}
}

resource.addResource(resources);
window.resources = resources;

const renderer = new RendererSystem({
	width: 900, // the initial width of the canvas
	height: 1640, // the initial height of the canvas
	canvas: document.querySelector('#canvas'), // the HTML canvas element
	resolution: window.devicePixelRatio, // the resolution of the canvas
});

const game = new Game({
	systems: [
		renderer,
		new ImgSystem(),
		new TransitionSystem(),
		new SpriteAnimationSystem(),
		new RenderSystem(),
		new EventSystem(),
		new GraphicsSystem(),
		new TextSystem(),
		new SoundSystem(),
	],
	autoStart: true,
	frameRate: 60,
});

window.game = game;

resource.on(LOAD_EVENT.COMPLETE, async () => {
	//await load_game();
	$('#loading').hide();
	$('#canvas').show();
});

resource.preload();


const getDeviceType = async() => {
	const ua = navigator.userAgent;
	// console.log(/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
	// 	ua
	//   ))
	if (
	  /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
		ua
	  )
	) {
		await load_game();
		return "mobile";
	}
	else{
		alert("請使用手機")
		//window.history.go(-1);
	}
};
//load_game();
getDeviceType();
  
