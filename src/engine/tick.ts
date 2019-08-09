import gl from './gl';
import Vector2 from './math/vector2';
import Color from './math/color';

function tick(callback) {
  gl.clear();

  callback(); // другое название?

  requestAnimationFrame(tick.bind(this, callback));
}

export default tick;