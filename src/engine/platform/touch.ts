import Vector2 from '../math/vector2';
import Angle from '../math/angle';

const TOUCH_STATE = {
  active: false,
  start: new Vector2(0, 0),
  current: new Vector2(0, 0),
  distance: 0,
  rotation: 0
};

function touchstart(e: TouchEvent) {
  TOUCH_STATE.active = true;

  TOUCH_STATE.start.x = e.touches[0].clientX;
  TOUCH_STATE.start.y = e.touches[0].clientY;
}

function touchmove(e: TouchEvent) {
  TOUCH_STATE.current.x = e.touches[0].clientX;
  TOUCH_STATE.current.y = e.touches[0].clientY;

  TOUCH_STATE.distance = Vector2.distance(TOUCH_STATE.start, TOUCH_STATE.current);
  TOUCH_STATE.rotation = Angle.betweenTwoPoints(TOUCH_STATE.start, TOUCH_STATE.current);
}

function touchend(e: TouchEvent) {
  TOUCH_STATE.active = false;

  TOUCH_STATE.start.x = 0;
  TOUCH_STATE.start.y = 0;
  TOUCH_STATE.current.x = 0;
  TOUCH_STATE.current.y = 0;

  TOUCH_STATE.distance = 0;
  TOUCH_STATE.rotation = 0;
}

export {
  TOUCH_STATE as default,
  touchstart,
  touchmove,
  touchend
};