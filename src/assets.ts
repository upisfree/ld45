import Bitmap from './engine/bitmap';
import { WALL_TYPE } from './engine/level';

interface TextureAsset {
  bitmap: Bitmap;
  width: number;
  height: number;
  wallType?: WALL_TYPE;
}

function getEmptyTextureObject(width: number, height: number, wallType?: WALL_TYPE): TextureAsset {
  return {
    bitmap: null,
    width: width,
    height: height,
    wallType: wallType
  };
}

const ASSETS = {
  FOLDER_URL: './assets/',
  TEXTURES: {
    'n': getEmptyTextureObject(64, 64),
    'e': getEmptyTextureObject(64, 64),
    's': getEmptyTextureObject(64, 64),
    'w': getEmptyTextureObject(64, 64),
    'leaves-1-hq': getEmptyTextureObject(1545, 1024, WALL_TYPE.LEAVES),
    'leaves-2-hq': getEmptyTextureObject(1545, 1024, WALL_TYPE.MIO),
    'npc': getEmptyTextureObject(214, 239),
  },
  SOUNDS: {

  }
};

export default ASSETS;