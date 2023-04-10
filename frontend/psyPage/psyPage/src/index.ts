import createBackground from './gameObjects/background';

import createBall from './gameObjects/ball';
import createBtn from './gameObjects/btn';
import createBgm from './gameObjects/bgm';

import resources from './resources';

import { Game, resource } from '@eva/eva.js';
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



const renderer = new RendererSystem({
	width: 900, // the initial width of the canvas
	height: 1640, // the initial height of the canvas
	canvas: document.querySelector('#canvas'), // the HTML canvas element
	resolution: window.devicePixelRatio, // the resolution of the canvas
});
  
console.log(renderer);

let A =0;
let B =0;
let C =0;

// basic setting
resource.addResource(resources);
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

function updateScale() {
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;

	const scaleX = windowWidth / renderer.params.width ;
	const scaleY = windowHeight / renderer.params.height;
	console.log("scale x =",scaleX);
	console.log("scale y =",scaleY);


	game.scene.transform.scale.x = scaleX;
	//game.scene.transform.scale.y = scaleY;
}


window.addEventListener('resize', () => {
	//updateScale();
	//console.log(window.outerWidth);
	//renderer.resize(window.outerWidth, window.outerWidth*16/9);
});
  

const bgSound = createBgm();
bgSound.play();


game.scene.transform.size.width = 700;
game.scene.transform.size.height = game.scene.transform.size.width*16/9;
window.game = game;

// ball
const balltrans = {
	position: {
		x: 200,
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
};


const numberOfScene = 6;



const changeScenefunt = ()=>{
	const animate = backgroundList[sceneIndex].animation;
	animate.play('move',1);
	console.log("A = ",A,",B = ",B,",C = ",C);

	btns.forEach((btn)=>{
		const disappear = btn.transition;
		disappear.play('disappear',1);
		//btn.button.remove()
	})
	//console.log(""animate.play('fadeOut',1));
	console.log("scene",backgroundList[sceneIndex]);
	if(sceneIndex==1){
		console.log("start result");
		backgroundList[sceneIndex-1].background.removeComponent("Img");
		let resource;
		if(A >= B && A >= C)
			resource = "bg6"
		else if(B>=A && B >=C)
			resource = "bg7"
		else if(C >=A && C >=B)
			resource = "bg8"
		const img = new Img({
			resource: resource,
		});
		backgroundList[sceneIndex-1].background.addComponent(img);
	}
	animate.on('finish', (name) => {
		backgroundList[sceneIndex].background.remove();

		btns.forEach((btn)=> btn.button.remove() )
		btn_index+=1;
		if(sceneIndex==1)
			return;
		btns = [...btnLists[btn_index]].map( (value,_)=> createBtn(value));
		console.log("index = ",btn_index);
		btns.forEach((btn) => game.scene.addChild(btn.button));
		console.log(btns);
		sceneIndex--;
	});
}


const btnLists = [
[
	{
		name : 'startTest',
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
		callback: () => {
			changeScenefunt();
		},
	},
],
[
	{
		name : 'Q1Op1',
		name2 : 'Q1Op1tap',
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
		callback: () => {
			A+=1;
			changeScenefunt()
		},
	},
	{
		name : 'Q1Op2',
		name2 : 'Q1Op2tap',
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
		callback: () => {
			B+=1;
			changeScenefunt()
		},
	},
	{
		name : 'Q1Op3',
		name2 : 'Q1Op3tap',
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
		callback: () => {
			C+=1;
			changeScenefunt()
		},
	}
],
[
	{
		name : 'Q2Op1',
		name2 : 'Q2Op1tap',
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
		callback: () => {
			A+=1;
			changeScenefunt()
		},
	},
	{
		name : 'Q2Op2',
		name2 : 'Q2Op2tap',
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
		callback: () => {
			B+=1;
			changeScenefunt()
		},
	},
	{
		name : 'Q2Op3',
		name2 : 'Q2Op3tap',
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
		callback: () => {
			C+=1;
			changeScenefunt()
		},
	}
],
[
	{
		name : 'Q3Op1',
		name2 : 'Q3Op1tap',
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
		callback: () => {
			A+=1;
			changeScenefunt()
		},
	},
	{
		name : 'Q3Op2',
		name2 : 'Q3Op2tap',
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
		callback: () => {
			B+=1;
			changeScenefunt()
		},
	},
	{
		name : 'Q3Op3',
		name2 : 'Q3Op3tap',
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
		callback: () => {
			C+=1
			changeScenefunt()
		},
	},
],
[
	{
		name : 'Q4Op1',
		name2 : 'Q4Op1tap',
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
				height: 250,
			},
		},
		callback: () => {
			A+=1;
			changeScenefunt()
		},
	},
	{
		name : 'Q4Op2',
		name2 : 'Q4Op2tap',
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
		callback: () => {
			B+=1;
			changeScenefunt()
		},
	},
	{
		name : 'Q4Op3',
		name2 : 'Q4Op3tap',
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
		callback: () => {
			C+=1;
			changeScenefunt()
		},
	},
],
[
	{
		name : 'Q5Op1',
		name2 : 'Q5Op1tap',
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
				height: 200,
			},
		},
		callback: () => {
			A+=1;
			changeScenefunt()
		},
	},
	{
		name : 'Q5Op2',
		name2 : 'Q5Op2tap',
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
				height: 150,
			},
		},
		callback: () => {
			B+=1;
			changeScenefunt()
		},
	},
	{
		name : 'Q5Op3',
		name2 : 'Q5Op3tap',
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
		callback: () => {
			C+=1;
			changeScenefunt()
		},
	},
],

]

let btn_index =0;


// background
let sceneIndex = numberOfScene;
const backgroundList = [...new Array(numberOfScene+1)].map((_,index) => createBackground(numberOfScene-index));


// BasketFront
// const { basetFront, playAnim } = createBasketFront();
// window.playAnim = playAnim;

/**
 * add child
 */
backgroundList.forEach((item) => game.scene.addChild(item.background));

let btns = [...btnLists[btn_index]].map( (value,_)=> createBtn(value))
//game.scene.addChild(createBoard());
//game.scene.addChild(basetFront);
btns.forEach((btn) => game.scene.addChild(btn.button));
//game.scene.addChild(changeSceneBtn);

