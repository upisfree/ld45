// почему не простой mousemove, если он и так достаточно часто срабатывает,
// а заёб с состоянием мыши, как и у клавиатуры? а потому что потом пересесть на
// pointer lock api будет расплюнуть, и с кликами один и тот же интерфейс,
// и с клавой логика одна

const MOUSE_STATE = {
  movementX: 0,
  movementY: 0
};

const mouseListeners = [];

function onmousemove(event: MouseEvent) {
  // event.preventDefault();

  MOUSE_STATE.movementX = event.movementX;
  MOUSE_STATE.movementY = event.movementY;
};

function initMouse() {
  window.addEventListener('mousemove', onmousemove);
};

function addMouseListener(listener) {
  mouseListeners.push(listener);
};

// т.к. тик выполняется быстрее mousemove, а что-то типа mousemovend нет,
// нам надо вручную обнулять состояние мыши каждый тик после срабатывания слушателей
function clearMouse() {
  MOUSE_STATE.movementX = 0;
  MOUSE_STATE.movementY = 0;
};

// function removeMouseListener(listener) {
//   code?)))
// }

export {
  MOUSE_STATE as default,
  initMouse,
  addMouseListener,
  clearMouse,
  mouseListeners
};