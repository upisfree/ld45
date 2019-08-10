import gl from './gl';
import Vector2 from './math/vector2';
import Color from './math/color';
import { keyboardListeners } from './platform/keyboard';

function tick(callback) {
  keyboardListeners.forEach(listener => listener());

  gl.clear();

  callback(); // gameLogicTick()?

  requestAnimationFrame(tick.bind(this, callback));
}

export default tick;