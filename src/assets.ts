import Bitmap from './engine/render/bitmap';
import { WALL_TYPE } from './game/walls-data';

interface TextureAsset {
  bitmap: Bitmap;
  wallType?: WALL_TYPE;

  animated?: boolean;
  bitmapWidth?: number;
  bitmapHeight?: number;
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
    'wall-1': getEmptyTextureObject(WALL_TYPE.ONE),
    'wall-2': getEmptyTextureObject(WALL_TYPE.TWO),
    'wall-3': getEmptyTextureObject(WALL_TYPE.THREE),
    'wall-4': getEmptyTextureObject(WALL_TYPE.FOUR),
    'wall-5': getEmptyTextureObject(WALL_TYPE.FIVE),
    'wall-6': getEmptyTextureObject(WALL_TYPE.SIX),
    'skybox': getEmptyTextureObject(),
    'npc': getEmptyTextureObject(),
    'gun': getEmptyTextureObject(),
    'explosion': getEmptyTextureObject(),
    'daemon-1': getEmptyTextureObject(),
    'daemon-2': getEmptyTextureObject(),
    'daemon-3': getEmptyTextureObject(),
    'daemon-4': getEmptyTextureObject(),
  },
  SOUNDS: {

  }
};

export default ASSETS;