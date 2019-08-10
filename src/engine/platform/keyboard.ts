const KEYBOARD_STATE = {
  keyCodes: [],
  alt: false,
  ctrl: false,
  meta: false, // ⌘ / ⊞ key 
  shift: false
};

const keyboardListeners = [];

function onkeydown(event: KeyboardEvent) {
  // event.preventDefault();

  if (!KEYBOARD_STATE.keyCodes.includes(event.keyCode)) {
    KEYBOARD_STATE.keyCodes.push(event.keyCode);
  };

  KEYBOARD_STATE.alt = event.altKey;
  KEYBOARD_STATE.ctrl = event.ctrlKey;
  KEYBOARD_STATE.meta = event.metaKey;
  KEYBOARD_STATE.shift = event.shiftKey;
};

function onkeyup(event: KeyboardEvent) {
  // event.preventDefault();

  KEYBOARD_STATE.keyCodes.splice(KEYBOARD_STATE.keyCodes.indexOf(event.keyCode), 1);

  KEYBOARD_STATE.alt = event.altKey;
  KEYBOARD_STATE.ctrl = event.ctrlKey;
  KEYBOARD_STATE.meta = event.metaKey;
  KEYBOARD_STATE.shift = event.shiftKey;
};

function initKeyboard() {
  window.addEventListener('keydown', onkeydown);
  window.addEventListener('keyup', onkeyup);
};

function addKeyboardListener(listener) {
  keyboardListeners.push(listener);
};

// function removeKeyboardListener(listener) {
//   code?)))
// }

export {
  KEYBOARD_STATE as default,
  initKeyboard,
  addKeyboardListener,
  keyboardListeners
};