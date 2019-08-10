import ASSETS from './assets';
import tick from './engine/tick';
import resize from './engine/platform/resize';
import { initKeyboard, addKeyboardListener } from './engine/platform/keyboard';
import { initMouse, addMouseListener } from './engine/platform/mouse';
import Vector2 from './engine/math/vector2';
import Camera from './engine/camera';
import Level from './engine/level';
import Player from './game/player';
import Minimap from './game/minimap';
import Bitmap from './engine/bitmap';
import NPC from './game/npc';

load(init);

function init() {
  resize();

  let levelSize = 16;
  let levelData = new Uint8Array([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 2, 0, 2, 2, 2, 2, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ]);

  // let levelSize = 128;
  // let levelData = new Uint8Array(levelSize);

  let level = new Level(levelSize, levelData, [], false);
  let camera = new Camera(level);
  let player = new Player(camera, new Vector2(levelSize / 2, levelSize / 2), Math.PI / -2);
  let minimap = new Minimap(level, camera, new Vector2(10, 10));

  console.log(level, player, camera, minimap);

  new NPC(
    ASSETS.TEXTURES['npc'].bitmap,
    new Vector2(Math.ceil(levelSize / 2), Math.ceil(levelSize / 3)),
    level
  );

  // for (let i = 0; i < 100; i++) {
  //   new NPC(
  //     ASSETS.TEXTURES['npc'].bitmap,
  //     new Vector2(Math.ceil(levelSize * Math.random()), Math.ceil(levelSize * Math.random())),
  //     level
  //   );
  // }

  initKeyboard();
  addKeyboardListener(player.onKeyboardTick.bind(player));

  initMouse();
  addMouseListener(player.onMouseTick.bind(player));

  tick(() => {
    camera.render();
    minimap.render();

    level.npcs.forEach(npc => npc.update());

    // camera.fov += Math.cos(performance.now() / 400) / 50;
  });
};

function load(callback) {
  let fetches = [];
  let texturesNames = Object.keys(ASSETS.TEXTURES);

  texturesNames.forEach(name => {
    let width = ASSETS.TEXTURES[name].width;
    let height = ASSETS.TEXTURES[name].height;

    fetches.push(
      fetch(`${ ASSETS.FOLDER_URL }${ name }.png`)
        .then(response => {
          if (response.ok) {
            return response.blob();
          } else {
            throw new Error(`${ name } не загрузился :(`);
          };
        })
        .then(blob => {
          ASSETS.TEXTURES[name].bitmap = new Bitmap(blob, width, height);
        })
        .catch(e => {
          throw new Error(e);
        })
    );
  });

  Promise.all(fetches).then(callback);
}