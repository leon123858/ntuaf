import { GameObject } from '@eva/eva.js';
import { Event } from '@eva/plugin-renderer-event';
import { Transition } from '@eva/plugin-transition';
import { Render } from '@eva/plugin-renderer-render';
import { Img } from '@eva/plugin-renderer-img';





interface BtnParams {
  name: string;
  name2? :string;
  transform?: object;
  callback: ()=>Promise<void>;
}
export default function createBtn({ name , name2, transform = {}, callback = async()=>{} }: BtnParams) {
  const box = new GameObject('box', {
    ...transform
  });

  box.addComponent(new Render({ alpha: 0, zIndex : 7 }));


  // const btnGO = new GameObject('btn',{
  //   size: {
  //     width: 100,
  //     height: 100,
  //   },
  // });


  let img = new Img({
    resource : name,
  })

  // const { graphics } = btnGO.addComponent(new Graphics());

  // graphics.beginFill(0xFF4510, 0.5);
  // graphics.lineStyle(6, 0xA65A22);
  // graphics.drawRoundedRect(0, 0, 320, 80, 8);
  // graphics.endFill();
  
  // box.addChild(btnGO);
  box.addComponent(img);

  
  const transition = box.addComponent(new Transition({
    group: {
      // idle: [
      //   {
      //     name: 'scale.x',
      //     component: box.transform,
      //     values: [
      //       {
      //         time: 0,
      //         value: 1,
      //         tween: 'ease-out',
      //       },
      //       {
      //         time: 300,
      //         value: 1.2,
      //         tween: 'ease-in',
      //       },
      //       {
      //         time: 600,
      //         value: 1,
      //       },
      //     ],
      //   },
      //   {
      //     name: 'scale.y',
      //     component: box.transform,
      //     values: [
      //       {
      //         time: 0,
      //         value: 1,
      //         tween: 'ease-out',
      //       },
      //       {
      //         time: 300,
      //         value: 1.2,
      //         tween: 'ease-in',
      //       },
      //       {
      //         time: 600,
      //         value: 1,
      //       },
      //     ],
      //   },
      // ],
      appear : [
        {
          name: 'alpha',
          component : box.getComponent(Render),
          values :[
            {
              value : 0,
              time : 0,
              tween : 'linear'
            },
            {
              value : 1,
              time : 1000,
            }
          ]
        },
      ],
      disappear : [
        {
          name: 'alpha',
          component : box.getComponent(Render),
          values :[
            {
              value : 1,
              time : 0,
              tween : 'linear'
            },
            {
              value : 0,
              time : 1000,
            }
          ]
        },
      ],
    },
  }))

  transition.play('idle', Infinity)
  transition.play('appear',1);

  const evt = box.addComponent(new Event)
 
  evt.on('tap', async() => {
    await callback()
    callback = async()=>{}
  })
  .on('touchstart', () => {
    img.resource = name2;
    console.log('The box was clicked!');
  })
  .on('touchmove', () => {
    img.resource = name;
    console.log('The clicked end');
  });
  //console.log(img);
  return { button : box , transition } ;
}
