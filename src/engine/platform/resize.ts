import { canvas, context } from './canvas';
import Camera from '../render/camera';

function onresize(canvas: HTMLCanvasElement, camera: Camera) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context.imageSmoothingEnabled = false;

  camera.resize();
};

export default onresize;