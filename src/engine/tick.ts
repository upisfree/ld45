import gl from './gl';
import Vector2 from './math/vector2';
import Color from './math/color';
import { keyboardListeners } from './platform/keyboard';
import { mouseListeners, clearMouse } from './platform/mouse';

function tick(callback) {
  keyboardListeners.forEach(listener => listener());
  mouseListeners.forEach(listener => listener());
  clearMouse();

  gl.clear();

  callback(); // gameLogicTick()?

  requestAnimationFrame(tick.bind(this, callback));
}

export default tick;