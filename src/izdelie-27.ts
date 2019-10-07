import CONFIG from './config';
import ASSETS from './assets';
import tick from './engine/tick';
import resize from './engine/platform/resize';
import { canvas } from './engine/platform/canvas';
import { initKeyboard, addKeyboardListener } from './engine/platform/keyboard';
import { initMouse, addMouseListener } from './engine/platform/mouse';
import Vector2 from './engine/math/vector2';
import Color from './engine/math/color';
import Camera from './engine/render/camera';
import Level from './engine/level';
import Player from './game/player';
import Minimap from './game/minimap';
import Bitmap from './engine/render/bitmap';
import NPC from './game/npc';
import gl from './engine/render/gl';

load(init);

let music, camera, player, level;

function spawnRandomNPC(level) {
  let count = 3;
  let r = Math.floor(Math.random() * (count - 0 + 1) + 0);

  switch (r) {
    case 0:
      return new NPC(
        ASSETS.TEXTURES['daemon-1'].bitmap,
        new Vector2(Math.ceil(level.size * Math.random()), Math.ceil(level.size * Math.random())),
        level,
        1,
        64
      );

    case 1:
      return new NPC(
        ASSETS.TEXTURES['daemon-2'].bitmap,
        new Vector2(Math.ceil(level.size * Math.random()), Math.ceil(level.size * Math.random())),
        level,
        1,
        64
      );

    case 2:
      return new NPC(
        ASSETS.TEXTURES['daemon-3'].bitmap,
        new Vector2(Math.ceil(level.size * Math.random()), Math.ceil(level.size * Math.random())),
        level,
        10,
        200
      );

    case 3:
      return new NPC(
        ASSETS.TEXTURES['daemon-4'].bitmap,
        new Vector2(Math.ceil(level.size * Math.random()), Math.ceil(level.size * Math.random())),
        level,
        4,
        48
      );
  }
}

function restart() {
  level.randomize();

  player.position.x = level.size / 2;
  player.position.y = level.size / 2;

  camera.position = player.position;
  camera.rotation = player.rotation;

  (<any>window).sound.seek(0, music);

  level.npcs.forEach(n => { n.destroy(true); });
  level.npcs.length = Math.floor(Math.random() * level.sprites.length);
  level.sprites.length = 0;

  setTimeout(() => {
    (<any>window).kills = 0;
    document.querySelector('#count').textContent = (<any>window).kills;    
  }, 2500);
}

function init() {
  ASSETS.MAP_BITMAP = ASSETS.TEXTURES['map'].bitmap;

  level = new Level(0, null, [], ASSETS.TEXTURES['skybox'].bitmap, false);
  level.parseFromBitmap(ASSETS.MAP_BITMAP);
  level.randomize();

  camera = new Camera(level);
  player = new Player(camera, level, new Vector2(level.size / 2, level.size / 2), Math.PI / -2);
  // let minimap = new Minimap(level, camera, new Vector2(1, 1));

  camera.position = player.position;
  camera.rotation = player.rotation;

  level.player = player;

  // console.log(ASSETS, level, player, camera);

  initKeyboard();
  addKeyboardListener(player.onKeyboardTick.bind(player));

  initMouse();
  // addMouseListener(player.onMouseTick.bind(player));

  tick(() => {
    camera.render();
    // minimap.render();

    player.update();
    level.update();

    let musicValue = 1 + (1 - player.health / 100) * 50;
    (<any>window).sound.volume(musicValue, music);

    camera.fov += Math.cos(Date.now() / 400) / 175;

    if (Math.random() < CONFIG.NPC_SPAWN_CHANGE) {
      spawnRandomNPC(level);
    }
  });

  setInterval(() => {
    CONFIG.NPC_SPAWN_CHANGE *= 1.25;
  }, 15000);

  window.addEventListener('resize', resize.bind(this, canvas, camera));

  window.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
      case 32: // space
        player.attack();

        break;
      case 82: // R
        restart();

        break;
    }
  });

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

(<any>window).sound = new (<any>window).Howl({
  src: ['./assets/sound.mp3'],
  sprite: {
    scream1: [0, 760],
    scream2: [1160, 560],
    scream3: [2240, 2800],
    scream4: [5520, 2320],
    scream5: [8440, 3000],
    scream6: [12040, 3920],
    scream7: [16640, 1400],
    music: [18960, 739880, true],
  },
  volume: 1
});

music = (<any>window).sound.play('music');

(<any>window).restart = restart;