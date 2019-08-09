import { canvas } from './canvas';

function onresize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener('resize', onresize);

export default onresize;