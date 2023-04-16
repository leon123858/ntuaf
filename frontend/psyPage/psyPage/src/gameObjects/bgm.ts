import { GameObject } from '@eva/eva.js';
import { Sound } from '@eva/plugin-sound';


export default function createBgm(source : number){
    const bgSoundObj = new GameObject('sound');
    const bgSound = bgSoundObj.addComponent(
    new Sound({ resource: `bgSound${source}` , loop: true, autoplay: false, volume: 0.5 })
    );
    return bgSound;
}
