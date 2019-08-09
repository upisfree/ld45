export default function(listeners) {
  listeners.forEach((l) => {
    window.addEventListener('keydown', l);
  });
};