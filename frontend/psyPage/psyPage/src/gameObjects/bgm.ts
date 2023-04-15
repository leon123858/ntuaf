import { GameObject } from '@eva/eva.js';
import { Sound } from '@eva/plugin-sound';


export default function createBgm(){
    const bgSoundObj = new GameObject('sound');
    const bgSound = bgSoundObj.addComponent(
    new Sound({ resource: 'bgSound', loop: true, autoplay: true, volume: 0.5 })
    );
    return bgSound;
}
