import Bitmap from './engine/bitmap';
import { WALL_TYPE } from './game/walls-data';

interface TextureAsset {
  bitmap: Bitmap;
  wallType?: WALL_TYPE;
}

function getEmptyTextureObject(wallType?: WALL_TYPE): TextureAsset {
  return {
    bitmap: null,
    wallType: wallType
  };
}

const ASSETS = {
  FOLDER_URL: './assets/',
  MAP_BITMAP: undefined,
  TEXTURES: {
    'map': getEmptyTextureObject(),
    'n': getEmptyTextureObject(),
    'e': getEmptyTextureObject(),
    's': getEmptyTextureObject(),
    'w': getEmptyTextureObject(),
    'leaves-1-hq': getEmptyTextureObject(WALL_TYPE.LEAVES),
    'leaves-2-hq': getEmptyTextureObject(WALL_TYPE.MIO),
    'transparent': getEmptyTextureObject(),
    'skybox': getEmptyTextureObject(),
    'npc': getEmptyTextureObject(),
  },
  SOUNDS: {

  }
};

export default ASSETS;