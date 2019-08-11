import { canvas } from './canvas';
import Camera from '../camera';

function onresize(canvas: HTMLCanvasElement, camera: Camera) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  camera.resize();
};

export default onresize;