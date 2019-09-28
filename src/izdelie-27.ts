import ASSETS from './assets';
import tick from './engine/tick';
import resize from './engine/platform/resize';
import { canvas } from './engine/platform/canvas';
import { initKeyboard, addKeyboardListener } from './engine/platform/keyboard';
import { initMouse, addMouseListener } from './engine/platform/mouse';
import Vector2 from './engine/math/vector2';
import Color from './engine/math/color';
import Camera from './engine/camera';
import Level from './engine/level';
import Player from './game/player';
import Minimap from './game/minimap';
import Bitmap from './engine/bitmap';
import NPC from './game/npc';
import gl from './engine/gl';

load(init);

function init() {
  ASSETS.MAP_BITMAP = ASSETS.TEXTURES['map'].bitmap;

  let level = new Level(0, null, [], ASSETS.TEXTURES['skybox'].bitmap, false);
  level.parseFromBitmap(ASSETS.MAP_BITMAP);

  let camera = new Camera(level);
  let player = new Player(camera, level, new Vector2(level.size / 2, level.size / 2), Math.PI / -2);
  let minimap = new Minimap(level, camera, new Vector2(20, 20));

  console.log(ASSETS, level, player, camera, minimap);

  // for (let i = 0; i < 10; i++) {
  //   new NPC(
  //     ASSETS.TEXTURES['npc'].bitmap,
  //     new Vector2(Math.ceil(level.size * Math.random()), Math.ceil(level.size * Math.random())),
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

    player.update();
    level.update();

    // camera.fov += Math.cos(performance.now() / 400) / 50;
  });

  window.addEventListener('resize', resize.bind(this, canvas, camera));
  resize(canvas, camera);
};

function load(callback) {
  let promises = [];
  let texturesNames = Object.keys(ASSETS.TEXTURES);

  texturesNames.forEach(name => {
    promises.push(
      new Promise((resolve, reject) => {
        let url = `${ ASSETS.FOLDER_URL }${ name }.png`;
        let image = new Image();

        image.addEventListener('load', () => {
          ASSETS.TEXTURES[name].bitmap = new Bitmap(image);

          resolve(image);
        });

        image.addEventListener('error', () => {
          reject(new Error(`Не получилось загрузить картинку: ${ url }`));
        });

        image.src = `${ ASSETS.FOLDER_URL }${ name }.png`;
      })
    );

    // TODO: использовать для загрузки звуков
    // promises.push(
    //   fetch(`${ ASSETS.FOLDER_URL }${ name }.png`)
    //     .then(response => {
    //       if (response.ok) {
    //         return response.blob();
    //       } else {
    //         throw new Error(`${ name } не загрузился :(`);
    //       };
    //     })
    //     .then(blob => {
    //       let image = new Image();
    //       image.src = URL.createObjectURL(blob);
    //       image.onload = () => {
    //         ASSETS.TEXTURES[name].bitmap = new Bitmap(image);            
    //       };
    //     })
    //     .catch(e => {
    //       throw new Error(e);
    //     })
    // );
  });

  Promise.all(promises).then(callback);
}