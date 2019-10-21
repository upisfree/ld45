import CONFIG from './config';
import ASSETS from './assets';
import tick from './engine/tick';
import resize from './engine/platform/resize';
import { canvas } from './engine/platform/canvas';
import { initKeyboard, addKeyboardListener } from './engine/platform/keyboard';
import { initMouse, addMouseListener } from './engine/platform/mouse';
import { touchstart, touchmove, touchend } from './engine/platform/touch';
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
  level.npcs.length = 0;
  level.sprites.length = 0;

  CONFIG.NPC_SPAWN_CHANGE = 0.02;

  setTimeout(() => {
    (<any>window).kills = 0;
    document.querySelector('#count').textContent = (<any>window).kills;
    (<any>document.querySelector('#death')).style.display = 'none';
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

    if ((<any>window).isMobile) {
      camera.fov += Math.cos(Date.now() / 1000) / 450;
    } else {
      camera.fov += Math.cos(Date.now() / 400) / 175;
    }

    if (Math.random() < CONFIG.NPC_SPAWN_CHANGE) {
      spawnRandomNPC(level);
    }
  });

  setInterval(() => {
    CONFIG.NPC_SPAWN_CHANGE *= 1.1;
  }, 2500);

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

  (<any>window).isMobile = (<any>window).checkIsMobile();

  if ((<any>window).isMobile) {
    camera.fov = Math.PI / 5;

    player.moveSpeed /= 1.5;
    player.rotateSpeed /= 1.5;

    setInterval(() => {
      player.attack();
    }, 200);

    window.addEventListener('touchstart', touchstart);
    window.addEventListener('touchmove', touchmove);
    window.addEventListener('touchend', touchend);
    window.addEventListener('touchcancel', touchend);
  }
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
    music: [19190, 739880, true],
  },
  volume: 1
});

music = (<any>window).sound.play('music');

(<any>window).checkIsMobile = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||(<any>window).opera);
  return check;
};

(<any>window).restart = restart;

setTimeout(() => {
  (<any>document.querySelector('#author')).style.display = 'none';
  (<any>document.querySelector('#title')).style.display = 'block';
// }, 4000);
}, 100);

setTimeout(() => {
  (<any>document.querySelector('#title')).style.display = 'none';
  (<any>document.querySelector('#manual')).style.display = 'block';
// }, 8000);
}, 200);

setTimeout(() => {
  (<any>document.querySelector('#manual')).style.display = 'none';
  (<any>document.querySelector('#text')).style.display = 'none';
// }, 17000);
}, 300);