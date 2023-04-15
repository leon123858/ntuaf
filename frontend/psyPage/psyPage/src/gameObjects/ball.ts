import { GameObject } from '@eva/eva.js';
import { Img } from '@eva/plugin-renderer-img'

interface BallParams {
  transform?: object;
}
export default function createBall({transform = {}}:BallParams) {
  console.log(transform);
  const ball = new GameObject('ball', {
    size: { width: 79, height: 79 },
    ...transform
  });

  ball.addComponent(
    new Img({
      resource: 'basketball',
    })
  );
  return ball;
}
