/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets.ts":
/*!***********************!*\
  !*** ./src/assets.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getEmptyTextureObject(wallType) {
    return {
        bitmap: null,
        wallType: wallType
    };
}
var ASSETS = {
    FOLDER_URL: './assets/',
    MAP_BITMAP: undefined,
    TEXTURES: {
        'map': getEmptyTextureObject(),
        'wall-1': getEmptyTextureObject(1 /* ONE */),
        'wall-2': getEmptyTextureObject(2 /* TWO */),
        'wall-3': getEmptyTextureObject(3 /* THREE */),
        'wall-4': getEmptyTextureObject(4 /* FOUR */),
        'wall-5': getEmptyTextureObject(5 /* FIVE */),
        'wall-6': getEmptyTextureObject(6 /* SIX */),
        'skybox': getEmptyTextureObject(),
        'npc': getEmptyTextureObject(),
        'gun': getEmptyTextureObject(),
        'explosion': getEmptyTextureObject(),
        'corpse': getEmptyTextureObject(),
        'daemon-1': getEmptyTextureObject(),
        'daemon-2': getEmptyTextureObject(),
        'daemon-3': getEmptyTextureObject(),
        'daemon-4': getEmptyTextureObject(),
    },
    SOUNDS: {}
};
exports.default = ASSETS;


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = __webpack_require__(/*! ./engine/math/color */ "./src/engine/math/color.ts");
var CONFIG = {
    DEBUG: true,
    FOG: true,
    FOG_COLOR: new color_1.default(0, 0, 0),
    FOG_FACTOR: 1,
    LIGHTING_FAKE_CONTRAST: true,
    NPC_SPAWN_CHANGE: 0.01
};
exports.default = CONFIG;


/***/ }),

/***/ "./src/engine/level.ts":
/*!*****************************!*\
  !*** ./src/engine/level.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var assets_1 = __webpack_require__(/*! ../assets */ "./src/assets.ts");
var color_1 = __webpack_require__(/*! ./math/color */ "./src/engine/math/color.ts");
var walls_data_1 = __webpack_require__(/*! ../game/walls-data */ "./src/game/walls-data.ts");
var WALL_TEXTURE = {};
exports.WALL_TEXTURE = WALL_TEXTURE;
Object.values(assets_1.default.TEXTURES).forEach(function (t) {
    if (t.wallType) {
        WALL_TEXTURE[t.wallType] = t;
    }
});
var Level = /** @class */ (function () {
    function Level(size, walls, npcs, skybox, randomize // TODO: drop?
    ) {
        if (walls === void 0) { walls = new Uint8Array(size * size); }
        if (npcs === void 0) { npcs = []; }
        if (randomize === void 0) { randomize = false; }
        this.size = size;
        this.walls = walls;
        this.sprites = [];
        this.npcs = npcs;
        this.skybox = skybox;
        if (randomize) {
            this.randomize();
        }
    }
    Level.isWallTypeVoidOrAir = function (type) {
        return type === -1 /* VOID */ || type === 0 /* AIR */;
    };
    Level.prototype.update = function () {
        // обновляем физику спрайтов
        this.sprites.forEach(function (sprite) {
            sprite.collisionWith = null;
            sprite.detectCollisions();
        });
        this.npcs.forEach(function (npc) { return npc.update(); });
    };
    // возвращает стену
    Level.prototype.getWallType = function (p) {
        var x = Math.round(p.x);
        var y = Math.round(p.y);
        if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) {
            return -1;
        }
        ;
        var t = this.walls[y * this.size + x];
        if (t === undefined || t === null) {
            return -1;
        }
        else {
            return t;
        }
    };
    Level.prototype.isCollision = function (p) {
        return !Level.isWallTypeVoidOrAir(this.getWallType(p));
    };
    Level.prototype.isNotCollision = function (p) {
        return Level.isWallTypeVoidOrAir(this.getWallType(p));
    };
    Level.prototype.randomize = function () {
        var wallsCount = 6;
        for (var i = 0; i < this.size * this.size; i++) {
            var r = Math.floor(Math.random() * (wallsCount - 0 + 1) + 0);
            var s2 = this.size / 2;
            if (Math.random() > 0.1 || i === s2 * this.size + s2) {
                r = 0;
            }
            this.walls[i] = r;
        }
    };
    Level.prototype.parseFromBitmap = function (bitmap) {
        var data = [];
        for (var y = 0; y < bitmap.height; y++) {
            var _loop_1 = function (x) {
                var offset = (y * (bitmap.width * 4)) + (x * 4);
                var r = bitmap.imageData[offset];
                var g = bitmap.imageData[offset + 1];
                var b = bitmap.imageData[offset + 2];
                var a = bitmap.imageData[offset + 3];
                var color = new color_1.default(r, g, b, a);
                walls_data_1.WALLS_DATA.forEach(function (wallData) {
                    if (wallData.color.equals(color)) {
                        data.push(wallData.code);
                    }
                });
            };
            for (var x = 0; x < bitmap.width; x++) {
                _loop_1(x);
            }
        }
        this.size = bitmap.width;
        this.walls = new Uint8Array(data);
    };
    return Level;
}());
exports.default = Level;


/***/ }),

/***/ "./src/engine/math/angle.ts":
/*!**********************************!*\
  !*** ./src/engine/math/angle.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// спасибо, @davidfig!
// https://github.com/davidfig/angle
Object.defineProperty(exports, "__esModule", { value: true });
var Angle;
(function (Angle) {
    Angle.PI_2 = Math.PI * 2;
    Angle.UP = Math.PI / 2;
    Angle.DOWN = 3 * Math.PI / 2;
    Angle.LEFT = Math.PI;
    Angle.RIGHT = 0;
    Angle.NORTH = Angle.UP;
    Angle.SOUTH = Angle.DOWN;
    Angle.WEST = Angle.LEFT;
    Angle.EAST = Angle.RIGHT;
    function rad2deg(r) {
        return r * (180 / Math.PI);
    }
    Angle.rad2deg = rad2deg;
    function deg2rad(d) {
        return d * (Math.PI / 180);
    }
    Angle.deg2rad = deg2rad;
    // возвращает нормализованный угол в радианах между (0 — PI × 2)
    function normalize(a) {
        return a - Angle.PI_2 * Math.floor(a / Angle.PI_2);
    }
    Angle.normalize = normalize;
    // возвращает нормализованную разницу между двумя углами в радианах
    function difference(a, b) {
        var c = Math.abs(a - b) % Angle.PI_2;
        return c > Math.PI ? (Angle.PI_2 - c) : c;
    }
    Angle.difference = difference;
    // возвращает ближайшую сторону света в радианах
    function closestCardinal(a) {
        var left = Angle.difference(a, Angle.LEFT);
        var right = Angle.difference(a, Angle.RIGHT);
        var up = Angle.difference(a, Angle.UP);
        var down = Angle.difference(a, Angle.DOWN);
        if (left <= right && left <= up && left <= down) {
            return Angle.LEFT;
        }
        else if (right <= up && right <= down) {
            return Angle.RIGHT;
        }
        else if (up <= down) {
            return Angle.UP;
        }
        else {
            return Angle.DOWN;
        }
    }
    Angle.closestCardinal = closestCardinal;
    // возвращает ближайшую горизонтальную (запад или восток )сторону света в радианах
    function closestHorizontalCardinal(a) {
        var left = Angle.difference(a, Angle.LEFT);
        var right = Angle.difference(a, Angle.RIGHT);
        return (left < right) ? Angle.LEFT : Angle.RIGHT;
    }
    Angle.closestHorizontalCardinal = closestHorizontalCardinal;
    // возвращает ближайшую горизонтальную (запад или восток )сторону света в радианах
    function closestVerticalCardinal(a) {
        var up = Angle.difference(a, Angle.UP);
        var down = Angle.difference(a, Angle.DOWN);
        return (up < down) ? Angle.UP : Angle.DOWN;
    }
    Angle.closestVerticalCardinal = closestVerticalCardinal;
    function betweenTwoPoints(a, b) {
        return Angle.normalize(Math.atan2(b.y - a.y, b.x - a.x));
    }
    Angle.betweenTwoPoints = betweenTwoPoints;
})(Angle || (Angle = {}));
exports.default = Angle;


/***/ }),

/***/ "./src/engine/math/color.ts":
/*!**********************************!*\
  !*** ./src/engine/math/color.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color = /** @class */ (function () {
    function Color(r, g, b, a) {
        if (a === void 0) { a = 255; }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    Color.prototype.equals = function (c) {
        return this.r === c.r &&
            this.g === c.g &&
            this.b === c.b &&
            this.a === c.a;
    };
    Color.prototype.getRGBAString = function () {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a / 255 + ")";
    };
    return Color;
}());
exports.default = Color;


/***/ }),

/***/ "./src/engine/math/vector2.ts":
/*!************************************!*\
  !*** ./src/engine/math/vector2.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vector2.prototype, "width", {
        get: function () { return this.x; },
        set: function (v) { this.x = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "height", {
        get: function () { return this.y; },
        set: function (v) { this.y = v; },
        enumerable: true,
        configurable: true
    });
    Vector2.distance = function (a, b) {
        return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2));
    };
    Vector2.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    Vector2.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    Vector2.prototype.mult = function (v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    };
    Vector2.prototype.div = function (v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    };
    Vector2.prototype.neg = function () {
        this.x *= -1;
        this.y *= -1;
        return this;
    };
    Vector2.prototype.copy = function () {
        return new Vector2(this.x, this.y);
    };
    return Vector2;
}());
exports.default = Vector2;


/***/ }),

/***/ "./src/engine/platform/canvas.ts":
/*!***************************************!*\
  !*** ./src/engine/platform/canvas.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.canvas = document.querySelector('#render-output');
exports.context = exports.canvas.getContext('2d');


/***/ }),

/***/ "./src/engine/platform/keyboard.ts":
/*!*****************************************!*\
  !*** ./src/engine/platform/keyboard.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KEYBOARD_STATE = {
    keyCodes: [],
    alt: false,
    ctrl: false,
    meta: false,
    shift: false
};
exports.default = KEYBOARD_STATE;
var keyboardListeners = [];
exports.keyboardListeners = keyboardListeners;
function onkeydown(event) {
    // event.preventDefault();
    if (!KEYBOARD_STATE.keyCodes.includes(event.keyCode)) {
        KEYBOARD_STATE.keyCodes.push(event.keyCode);
    }
    ;
    KEYBOARD_STATE.alt = event.altKey;
    KEYBOARD_STATE.ctrl = event.ctrlKey;
    KEYBOARD_STATE.meta = event.metaKey;
    KEYBOARD_STATE.shift = event.shiftKey;
}
;
function onkeyup(event) {
    // event.preventDefault();
    KEYBOARD_STATE.keyCodes.splice(KEYBOARD_STATE.keyCodes.indexOf(event.keyCode), 1);
    KEYBOARD_STATE.alt = event.altKey;
    KEYBOARD_STATE.ctrl = event.ctrlKey;
    KEYBOARD_STATE.meta = event.metaKey;
    KEYBOARD_STATE.shift = event.shiftKey;
}
;
function initKeyboard() {
    window.addEventListener('keydown', onkeydown);
    window.addEventListener('keyup', onkeyup);
}
exports.initKeyboard = initKeyboard;
;
function addKeyboardListener(listener) {
    keyboardListeners.push(listener);
}
exports.addKeyboardListener = addKeyboardListener;
;


/***/ }),

/***/ "./src/engine/platform/mouse.ts":
/*!**************************************!*\
  !*** ./src/engine/platform/mouse.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// почему не простой mousemove, если он и так достаточно часто срабатывает,
// а заёб с состоянием мыши, как и у клавиатуры? а потому что потом пересесть на
// pointer lock api будет расплюнуть, и с кликами один и тот же интерфейс,
// и с клавой логика одна
Object.defineProperty(exports, "__esModule", { value: true });
var MOUSE_STATE = {
    movementX: 0,
    movementY: 0
};
exports.default = MOUSE_STATE;
var mouseListeners = [];
exports.mouseListeners = mouseListeners;
function onmousemove(event) {
    // event.preventDefault();
    MOUSE_STATE.movementX = event.movementX;
    MOUSE_STATE.movementY = event.movementY;
}
;
function initMouse() {
    window.addEventListener('mousemove', onmousemove);
}
exports.initMouse = initMouse;
;
function addMouseListener(listener) {
    mouseListeners.push(listener);
}
exports.addMouseListener = addMouseListener;
;
// т.к. тик выполняется быстрее mousemove, а что-то типа mousemovend нет,
// нам надо вручную обнулять состояние мыши каждый тик после срабатывания слушателей
function clearMouse() {
    MOUSE_STATE.movementX = 0;
    MOUSE_STATE.movementY = 0;
}
exports.clearMouse = clearMouse;
;


/***/ }),

/***/ "./src/engine/platform/resize.ts":
/*!***************************************!*\
  !*** ./src/engine/platform/resize.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = __webpack_require__(/*! ./canvas */ "./src/engine/platform/canvas.ts");
function onresize(canvas, camera) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas_1.context.imageSmoothingEnabled = false;
    camera.resize();
}
;
exports.default = onresize;


/***/ }),

/***/ "./src/engine/platform/touch.ts":
/*!**************************************!*\
  !*** ./src/engine/platform/touch.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vector2_1 = __webpack_require__(/*! ../math/vector2 */ "./src/engine/math/vector2.ts");
var angle_1 = __webpack_require__(/*! ../math/angle */ "./src/engine/math/angle.ts");
var TOUCH_STATE = {
    active: false,
    start: new vector2_1.default(0, 0),
    current: new vector2_1.default(0, 0),
    distance: 0,
    rotation: 0
};
exports.default = TOUCH_STATE;
function touchstart(e) {
    TOUCH_STATE.active = true;
    TOUCH_STATE.start.x = e.touches[0].clientX;
    TOUCH_STATE.start.y = e.touches[0].clientY;
}
exports.touchstart = touchstart;
function touchmove(e) {
    TOUCH_STATE.current.x = e.touches[0].clientX;
    TOUCH_STATE.current.y = e.touches[0].clientY;
    TOUCH_STATE.distance = vector2_1.default.distance(TOUCH_STATE.start, TOUCH_STATE.current);
    TOUCH_STATE.rotation = angle_1.default.betweenTwoPoints(TOUCH_STATE.start, TOUCH_STATE.current);
}
exports.touchmove = touchmove;
function touchend(e) {
    TOUCH_STATE.active = false;
    TOUCH_STATE.start.x = 0;
    TOUCH_STATE.start.y = 0;
    TOUCH_STATE.current.x = 0;
    TOUCH_STATE.current.y = 0;
    TOUCH_STATE.distance = 0;
    TOUCH_STATE.rotation = 0;
}
exports.touchend = touchend;


/***/ }),

/***/ "./src/engine/render/bitmap.ts":
/*!*************************************!*\
  !*** ./src/engine/render/bitmap.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Bitmap = /** @class */ (function () {
    function Bitmap(image) {
        this.image = image;
        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight;
        this.imageData = this.getImageData();
    }
    // public render(): void {
    //
    // }
    Bitmap.prototype.getImageData = function () {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        context.drawImage(this.image, 0, 0);
        var imageData = context.getImageData(0, 0, this.width, this.height);
        canvas.remove();
        return imageData.data;
    };
    return Bitmap;
}());
exports.default = Bitmap;


/***/ }),

/***/ "./src/engine/render/camera.ts":
/*!*************************************!*\
  !*** ./src/engine/render/camera.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(/*! ../../config */ "./src/config.ts");
var assets_1 = __webpack_require__(/*! ../../assets */ "./src/assets.ts");
var vector2_1 = __webpack_require__(/*! ../math/vector2 */ "./src/engine/math/vector2.ts");
var angle_1 = __webpack_require__(/*! ../math/angle */ "./src/engine/math/angle.ts");
var color_1 = __webpack_require__(/*! ../math/color */ "./src/engine/math/color.ts");
var gl_1 = __webpack_require__(/*! ./gl */ "./src/engine/render/gl.ts");
var level_1 = __webpack_require__(/*! ../level */ "./src/engine/level.ts");
var canvas_1 = __webpack_require__(/*! ../platform/canvas */ "./src/engine/platform/canvas.ts");
var touch_1 = __webpack_require__(/*! ../platform/touch */ "./src/engine/platform/touch.ts");
var Camera = /** @class */ (function () {
    function Camera(level, fov) {
        if (fov === void 0) { fov = Math.PI / 2; }
        this.position = new vector2_1.default(0, 0);
        this.heightOffset = 0;
        this.rotation = 0;
        this.minSpriteDistance = 0.01;
        this.rays = [];
        this.rayDistance = 15;
        this.rayStep = 0.01;
        this.raysCount = 128;
        this.gunOffset = 0;
        this.level = level;
        this.fov = fov;
        this.resize();
    }
    Camera.prototype.render = function () {
        this.castRays();
        this.zBuffer = new Float32Array(this.ww);
        this.renderGround();
        this.renderSkybox();
        this.renderWalls();
        // this.renderFloor();
        this.renderNPCs();
        this.renderGun();
        // this.renderZBuffer();
        this.postProcess();
        if (window.isMobile) {
            this.renderTouchControls();
        }
    };
    Camera.prototype.renderGun = function () {
        var bitmap = assets_1.default.TEXTURES['gun'].bitmap;
        if (window.isMobile) {
            this.gunOffset -= 15;
        }
        else {
            this.gunOffset -= 20;
        }
        if (this.gunOffset < 0) {
            this.gunOffset = 0;
        }
        var now = Date.now();
        var w = this.ww / 3.5;
        var h = w;
        var x = (this.ww + 50) - w + this.heightOffset / 2.5 - this.gunOffset + (Math.cos(now / 500) * 15);
        var y = (this.wh + 50) - h + this.heightOffset * 1 - this.gunOffset + (Math.cos(now / 500) * 20);
        if (window.isMobile) {
            h = this.wh / 4;
            w = h;
            x = (this.ww + 10) - w + this.heightOffset / 2.5 - this.gunOffset / 2 + (Math.cos(now / 500) * 15);
            y = (this.wh - 20) - h + this.heightOffset * 1 - this.gunOffset / 1.25 + (Math.cos(now / 500) * 20);
        }
        gl_1.default.drawImage(bitmap, new vector2_1.default(0, 0), new vector2_1.default(bitmap.width, bitmap.height), new vector2_1.default(x, y), new vector2_1.default(w, h), Math.PI / (16 - Math.cos(now / 500) * 5));
    };
    Camera.prototype.postProcess = function () {
        var a = 255 - this.level.player.health / 100 * 255;
        gl_1.default.drawRect(new vector2_1.default(0, 0), new vector2_1.default(this.ww, this.wh), new color_1.default(160 * Math.random(), 0, 0, a * 1));
    };
    // private renderFloor(): void {
    //   // TODO: в один луп пробежку по лучам
    //   for (let i = 0; i < this.rays.length; i++) {
    //     this.renderFloorStripe(this.rays[i]);
    //   }
    // }
    // private renderFloorStripe(ray: Ray): void {
    //   let floorBitmap = ASSETS.TEXTURES['floor'].bitmap;
    //   let wallHeight = this.wh / ray.distance;
    //   let floorHeight;
    //   let drawX = this.rayWidth * ray.index;
    //   let drawY;
    //   if (ray.distance !== -1) {
    //     floorHeight = (this.wh - this.wh / ray.distance) / 2 - this.heightOffset;
    //     drawY = this.wh / 2 + wallHeight / 2 + this.heightOffset;
    //   } else {
    //     // если рисуем пол для пустоты
    //     floorHeight = this.wh / 2 - this.heightOffset;
    //     drawY = this.wh / 2 + this.heightOffset;
    //   }
    //   gl.drawImage(
    //     floorBitmap,
    //     new Vector2(0, 0),
    //     new Vector2(floorBitmap.width, floorBitmap.height),
    //     new Vector2(600, 500),
    //     new Vector2(50, 50),
    //     3
    //   );
    //   // gl.drawRect(
    //   //   new Vector2(drawX, drawY),
    //   //   new Vector2(this.rayWidth, floorHeight),
    //   //   new Color(255 * Math.random(), 255 * Math.random(), 255 * Math.random())
    //   // );
    // }
    Camera.prototype.resize = function () {
        this.ww = canvas_1.canvas.width;
        this.wh = canvas_1.canvas.height;
        this.rayWidth = this.ww / this.rays.length;
        this.zBuffer = new Float32Array(this.ww);
    };
    Camera.prototype.castRays = function () {
        this.rays = [];
        for (var i = 0; i < this.raysCount; i++) {
            var d = -1;
            var s = void 0;
            var t = -1 /* VOID */;
            var r = angle_1.default.normalize(this.rotation - this.fov / 2 + this.fov * i / this.raysCount);
            var a = new vector2_1.default(this.position.x, this.position.y);
            var b = new vector2_1.default(a.x, a.y);
            // части луча
            for (var j = 0; j < this.rayDistance; j += this.rayStep) {
                // сначала идём вперёд по X и смотрим, есть ли соприкосновение
                b.x = a.x + j * Math.cos(r);
                t = this.level.getWallType(b);
                // запад или восток
                if (!level_1.default.isWallTypeVoidOrAir(t)) {
                    d = j;
                    s = (a.x < b.x) ? 2 /* WEST */ : 3 /* EAST */; // <= || >= ?
                    break;
                }
                ;
                // нет соприкосновения? погнали по Y
                b.y = a.y + j * Math.sin(r);
                t = this.level.getWallType(b);
                // север или юг
                if (!level_1.default.isWallTypeVoidOrAir(t)) {
                    d = j;
                    s = (a.y < b.y) ? 0 /* NORTH */ : 1 /* SOUTH */; // <= || >= ?
                    break;
                }
                ;
            }
            ;
            if (d !== -1) {
                d *= Math.cos(r - this.rotation);
            }
            ;
            this.rays.push({
                a: a,
                b: b,
                distance: d,
                rotation: r,
                side: s,
                type: t,
                index: i
            });
        }
    };
    // заполняем zbuffer — т.к. мы рендерим по одной полоске, его надо вручную продлять
    Camera.prototype.fillWallStripeZBuffer = function (ray) {
        var start = Math.ceil(this.rayWidth * ray.index);
        var end = this.rayWidth * (ray.index + 1);
        for (var j = start; j < end; j++) {
            this.zBuffer[j] = ray.distance;
        }
        ;
    };
    Camera.prototype.renderWalls = function () {
        for (var i = 0; i < this.rays.length; i++) {
            this.renderWallStripe(this.rays[i]);
        }
    };
    Camera.prototype.renderWallStripe = function (ray) {
        this.fillWallStripeZBuffer(ray);
        // если пустота, то не рисуем
        if (ray.distance === -1) {
            return;
        }
        ;
        var bitmap = level_1.WALL_TEXTURE[ray.type].bitmap;
        var rotation = ray.rotation;
        var height = this.wh / ray.distance;
        var z = ray.distance / this.rayDistance;
        var y = this.wh / 2 - height / 2 + this.heightOffset;
        var fractional;
        var fractionalX = ray.b.x % 1;
        var fractionalY = ray.b.y % 1;
        // понимаем какая стена и в зависимости от этого пользуемся данными от округления
        // позиции падения взгляда, чтобы определить насколько нам нужно сдвинуться в текстуре
        // чтобы получить позицию текстуры полоски
        switch (ray.side) {
            case 0 /* NORTH */:
                // инвертируем текстуру
                fractional = 1 - fractionalX;
                break;
            case 3 /* EAST */:
                fractional = 1 - fractionalY;
                break;
            case 1 /* SOUTH */:
                fractional = fractionalX;
                break;
            case 2 /* WEST */:
                fractional = fractionalY;
                break;
        }
        ;
        // сдвигаем текстуру на половинку
        fractional = (fractional >= 0.5) ? fractional - 0.5 : fractional + 0.5;
        // округляем, чтобы закрыть белые дырки
        var textureX = Math.floor(bitmap.width * fractional);
        gl_1.default.drawImage(bitmap, new vector2_1.default(textureX, 0), new vector2_1.default(1, bitmap.height), new vector2_1.default(this.rayWidth * ray.index, y), new vector2_1.default(this.rayWidth, height));
        var start = Math.floor(this.rayWidth * ray.index);
        var end = this.rayWidth * (ray.index + 1);
        var width = Math.floor(end - start);
        if (config_1.default.LIGHTING_FAKE_CONTRAST && (ray.side === 2 /* WEST */ || ray.side === 3 /* EAST */)) {
            var color = new color_1.default(0, 0, 0, 128);
            gl_1.default.drawRect(new vector2_1.default(start, y), new vector2_1.default(width, height), color);
        }
        if (config_1.default.FOG) {
            var color = config_1.default.FOG_COLOR;
            color.a = 255 * z * config_1.default.FOG_FACTOR;
            gl_1.default.drawRect(new vector2_1.default(start, y), new vector2_1.default(width, height), color);
        }
    };
    Camera.prototype.renderNPC = function (sprite) {
        var rotation = angle_1.default.betweenTwoPoints(this.position, sprite.position);
        var distance = vector2_1.default.distance(this.position, sprite.position);
        if (distance > this.rayDistance) {
            return;
        }
        // чтобы на ноль тут не делить
        if (distance < this.minSpriteDistance) {
            distance = this.minSpriteDistance;
        }
        // пока исключительно квадратные текстуры
        var width = this.wh / distance;
        var height = this.wh / distance;
        var r = rotation - this.rotation;
        // обычно, разница между поворотом спрайта и камеры лежит между -1 и 1.
        // но если смотреть на спрайт с западной стороны, мы попадаем на тот момент,
        // когда поворот камеры превышает PI_2 и становится 0 (т.к. мы его нормализуем между 0 и PI_2)
        // и разница между поворотом спрайта и камеры зашкаливает, и вычисляются неправильные экранные координаты.
        // исправляем это, нивелируя нормализацию поворота камеры.
        // конечно, можно с этим не париться, используя матрицу преобразования (и там фишай вроде бы чинится), но это на будущее
        // https://lodev.org/cgtutor/raycasting3.html
        if (r > 1) {
            r -= angle_1.default.PI_2;
        }
        else if (r < -1) {
            r += angle_1.default.PI_2;
        }
        // не рисуем спрайты, которые не в поле зрения камеры
        var fov2 = this.fov / 2;
        if (r <= -fov2 || r >= fov2) {
            return;
        }
        var startX = (r) * (this.ww) / (this.fov) + (this.ww) / 2 - width / 2;
        var endX = startX + width;
        var y = this.wh / 2 - height / 2 + this.heightOffset;
        for (var j = startX; j < endX; j += this.rayWidth) {
            var wallStripe = this.zBuffer[Math.ceil(j)];
            // -1 не учитывается
            if (wallStripe !== undefined &&
                wallStripe !== null &&
                wallStripe < distance &&
                wallStripe !== -1) {
                continue;
            }
            ;
            var textureX = sprite.frame * sprite.frameWidth + Math.floor((j - startX) * sprite.frameWidth / width);
            gl_1.default.drawImage(sprite.bitmap, new vector2_1.default(textureX, 0), new vector2_1.default(1, sprite.bitmap.height), new vector2_1.default(j, y), new vector2_1.default(this.rayWidth, height));
            // if (CONFIG.FOG) {
            //   let z = distance / this.rayDistance;
            //   let color = CONFIG.FOG_COLOR;
            //   color.a = 255 * z * CONFIG.FOG_FACTOR;
            //   gl.drawRect(
            //     new Vector2(j, y),
            //     new Vector2(this.rayWidth, height),
            //     color
            //   );
            // }
        }
    };
    Camera.prototype.renderNPCs = function () {
        this.sortSprites();
        for (var i = 0; i < this.level.npcs.length; i++) {
            this.renderNPC(this.level.npcs[i]);
        }
    };
    // сортируем спрайты по дальности от игрока, чтобы правильно отрисовать
    Camera.prototype.sortSprites = function () {
        var _this = this;
        this.level.sprites.sort(function (a, b) {
            return vector2_1.default.distance(_this.position, b.position) - vector2_1.default.distance(_this.position, a.position);
        });
    };
    Camera.prototype.renderGround = function () {
        gl_1.default.drawRect(new vector2_1.default(0, 0), new vector2_1.default(this.ww, this.wh), new color_1.default(0, 0, 0));
        // gl.drawGradient(
        //   new Vector2(0, 0),
        //   new Vector2(this.ww, this.wh),
        //   0,
        //   new Color(255, 255, 255),
        //   new Color(0, 0, 0)
        // );
    };
    Camera.prototype.renderSkybox = function () {
        var skybox = this.level.skybox;
        var w = skybox.width * (this.wh / skybox.height) * 2;
        var h = this.wh / 2 + this.heightOffset;
        var x = (this.rotation / Math.PI / 2) * -w;
        var y = 0;
        gl_1.default.drawImage(skybox, new vector2_1.default(0, 0), new vector2_1.default(skybox.width, skybox.height), new vector2_1.default(x, y), new vector2_1.default(w, h));
        // если нужно повторить скайбокс
        if (x < w - this.ww) {
            gl_1.default.drawImage(skybox, new vector2_1.default(0, 0), new vector2_1.default(skybox.width, skybox.height), new vector2_1.default(x + w, y), new vector2_1.default(w, h));
        }
        gl_1.default.drawRect(new vector2_1.default(0, 0), new vector2_1.default(this.ww, h), new color_1.default(0, 0, 0, Math.random() * 256));
    };
    Camera.prototype.renderTouchControls = function () {
        var d = touch_1.default.distance;
        if (d > 100) {
            d = 100;
        }
        gl_1.default.drawArc(touch_1.default.start, d, 10, new color_1.default(255, 255, 255, 128));
    };
    Camera.prototype.renderZBuffer = function () {
        var h = 15;
        for (var i = 0; i < this.zBuffer.length; i++) {
            if (this.zBuffer[i] === -1) {
                continue;
            }
            var v = this.zBuffer[i] / this.rayDistance;
            var c = v * 255;
            gl_1.default.drawLine(new vector2_1.default(i, this.wh / 2 + this.heightOffset - h / v), new vector2_1.default(i, this.wh / 2 + this.heightOffset + h / v), new color_1.default(c, c, c));
        }
    };
    return Camera;
}());
exports.default = Camera;


/***/ }),

/***/ "./src/engine/render/gl.ts":
/*!*********************************!*\
  !*** ./src/engine/render/gl.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = __webpack_require__(/*! ../platform/canvas */ "./src/engine/platform/canvas.ts");
var angle_1 = __webpack_require__(/*! ../math/angle */ "./src/engine/math/angle.ts");
var color_1 = __webpack_require__(/*! ../math/color */ "./src/engine/math/color.ts");
var gl;
(function (gl) {
    // эта версия без поворота, нужно проверить, насколько она быстрее версии с поворотом
    // export function drawRect(position: Vector2, size: Vector2, color: Color): void {
    //   context.fillStyle = color.getRGBAString();
    //   context.fillRect(position.x, position.y, size.width, size.height);
    // }
    // rotation — в радианах
    function drawRect(position, size, color, rotation) {
        if (rotation === void 0) { rotation = 0; }
        canvas_1.context.save();
        canvas_1.context.beginPath();
        // точка, относительно которой транслейт — центр
        var translateX = position.x + size.width / 2;
        var translateY = position.y + size.height / 2;
        canvas_1.context.translate(translateX, translateY);
        canvas_1.context.rotate(rotation);
        // context.translate(-translateX, -translateY);
        if (color instanceof color_1.default) {
            color = color.getRGBAString();
        }
        ;
        canvas_1.context.fillStyle = color;
        canvas_1.context.fillRect(-size.width / 2, -size.height / 2, size.width, size.height);
        canvas_1.context.closePath();
        canvas_1.context.restore();
    }
    gl.drawRect = drawRect;
    // рисует не fill, а stroke
    function drawArc(position, radius, thickness, color) {
        canvas_1.context.save();
        canvas_1.context.beginPath();
        if (color instanceof color_1.default) {
            color = color.getRGBAString();
        }
        ;
        canvas_1.context.lineWidth = thickness;
        canvas_1.context.strokeStyle = color;
        canvas_1.context.arc(position.x, position.y, radius, 0, angle_1.default.PI_2);
        canvas_1.context.stroke();
        canvas_1.context.closePath();
        canvas_1.context.restore();
    }
    gl.drawArc = drawArc;
    function drawImage(bitmap, bitmapPosition, bitmapSize, drawPosition, drawSize, drawRotation) {
        if (drawRotation === void 0) { drawRotation = 0; }
        canvas_1.context.save();
        // точка, относительно которой транслейт — центр
        // if (drawRotation !== 0) {}
        var translateX = drawPosition.x + drawSize.width / 2;
        var translateY = drawPosition.y + drawSize.height / 2;
        canvas_1.context.translate(translateX, translateY);
        canvas_1.context.rotate(drawRotation);
        canvas_1.context.translate(-translateX, -translateY);
        canvas_1.context.drawImage(bitmap.image, bitmapPosition.x, bitmapPosition.y, bitmapSize.width, bitmapSize.height, drawPosition.x, drawPosition.y, drawSize.width, drawSize.height);
        canvas_1.context.restore();
    }
    gl.drawImage = drawImage;
    // TODO: create normal gradient function
    function drawGradient(position, size, rotation) {
        var colors = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            colors[_i - 3] = arguments[_i];
        }
        var gradient = canvas_1.context.createLinearGradient(0, 0, 0, size.height);
        for (var i = 0; i < colors.length; i++) {
            gradient.addColorStop(i, colors[i].getRGBAString());
        }
        drawRect(position, size, gradient, rotation);
    }
    gl.drawGradient = drawGradient;
    function drawLine(v1, v2, color) {
        canvas_1.context.save();
        canvas_1.context.beginPath();
        canvas_1.context.strokeStyle = color.getRGBAString();
        canvas_1.context.moveTo(v1.x, v1.y);
        canvas_1.context.lineTo(v2.x, v2.y);
        canvas_1.context.stroke();
        canvas_1.context.closePath();
        canvas_1.context.restore();
    }
    gl.drawLine = drawLine;
    function clear() {
        canvas_1.context.clearRect(0, 0, canvas_1.canvas.width, canvas_1.canvas.height);
    }
    gl.clear = clear;
})(gl || (gl = {}));
exports.default = gl;


/***/ }),

/***/ "./src/engine/render/sprite.ts":
/*!*************************************!*\
  !*** ./src/engine/render/sprite.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vector2_1 = __webpack_require__(/*! ../math/vector2 */ "./src/engine/math/vector2.ts");
// спрайт — это плоская картинка, которая рисуется всегда лицом к игроку
var Sprite = /** @class */ (function () {
    function Sprite(bitmap, position, level) {
        this.collisionTriggerDistance = 1;
        this.bitmap = bitmap;
        this.position = position;
        this.level = level;
        this.level.sprites.push(this);
    }
    // пока только игрок
    Sprite.prototype.detectCollisions = function () {
        var distance = vector2_1.default.distance(this.position, this.level.player.position);
        if (distance <= this.collisionTriggerDistance) {
            this.onCollision(this.level.player);
        }
    };
    Sprite.prototype.onCollision = function (trigger) {
        this.collisionWith = trigger;
    };
    return Sprite;
}());
exports.default = Sprite;


/***/ }),

/***/ "./src/engine/tick.ts":
/*!****************************!*\
  !*** ./src/engine/tick.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gl_1 = __webpack_require__(/*! ./render/gl */ "./src/engine/render/gl.ts");
var keyboard_1 = __webpack_require__(/*! ./platform/keyboard */ "./src/engine/platform/keyboard.ts");
var mouse_1 = __webpack_require__(/*! ./platform/mouse */ "./src/engine/platform/mouse.ts");
function tick(callback) {
    keyboard_1.keyboardListeners.forEach(function (listener) { return listener(); });
    mouse_1.mouseListeners.forEach(function (listener) { return listener(); });
    mouse_1.clearMouse();
    gl_1.default.clear();
    callback(); // gameLogicTick()?
    requestAnimationFrame(tick.bind(this, callback));
}
exports.default = tick;


/***/ }),

/***/ "./src/game/npc.ts":
/*!*************************!*\
  !*** ./src/game/npc.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var assets_1 = __webpack_require__(/*! ../assets */ "./src/assets.ts");
var vector2_1 = __webpack_require__(/*! ../engine/math/vector2 */ "./src/engine/math/vector2.ts");
var sprite_1 = __webpack_require__(/*! ../engine/render/sprite */ "./src/engine/render/sprite.ts");
var level_1 = __webpack_require__(/*! ../engine/level */ "./src/engine/level.ts");
window.kills = 0;
var NPC = /** @class */ (function (_super) {
    __extends(NPC, _super);
    function NPC(bitmap, position, level, framesCount, frameWidth) {
        var _this = _super.call(this, bitmap, position, level) || this;
        // TODO: move to AnimatedSprite
        _this.frame = 0;
        _this.framesCount = 0;
        _this.frameWidth = 0;
        _this.destroyed = false;
        _this.corpse = false;
        _this.moveSpeed = 0.0085;
        _this.framesCount = framesCount;
        _this.frameWidth = frameWidth;
        _this.level.npcs.push(_this);
        return _this;
    }
    NPC.prototype.update = function () {
        var p = this.position.copy();
        var factor = new vector2_1.default(this.moveSpeed, this.moveSpeed);
        var diff = p.sub(this.level.player.position).mult(factor);
        var collisionVector = new vector2_1.default(this.position.x - diff.x, this.position.y - diff.y);
        var t = this.level.getWallType(collisionVector);
        if (!this.corpse) {
            if (!level_1.default.isWallTypeVoidOrAir(t)) {
                this.position.add(diff);
            }
            else {
                this.position.sub(diff);
            }
        }
        if (Math.random() > 0.65) {
            this.frame++;
        }
        if (this.frame >= this.framesCount) {
            if (!this.destroyed) {
                this.frame = 0;
            }
            else {
                // this.level.npcs = this.level.npcs.filter(n => n !== this);
                // this.level.sprites = this.level.sprites.filter(s => s !== this);
                this.bitmap = assets_1.default.TEXTURES['corpse'].bitmap;
                this.frame = 0;
                this.framesCount = 8;
                this.frameWidth = 51;
                this.corpse = true;
            }
        }
    };
    NPC.prototype.destroy = function (onRestart) {
        if (onRestart === void 0) { onRestart = false; }
        this.destroyed = true;
        this.bitmap = assets_1.default.TEXTURES['explosion'].bitmap;
        this.frame = 0;
        this.framesCount = 6;
        this.frameWidth = 32;
        var r = Math.floor(Math.random() * (7 - 1 + 1) + 1);
        if (!onRestart || (onRestart && Math.random() < 0.05)) {
            var s = window.sound.play('scream' + r);
            window.sound.volume(0.5, s);
            window.sound.fade(0.85, 1, window.sound.duration(s) * 0.15, s);
        }
        if (!onRestart) {
            window.kills++;
            document.querySelector('#count').textContent = window.kills;
        }
    };
    NPC.prototype.onCollision = function (trigger) {
        this.collisionWith = trigger;
        if (!this.corpse && !this.destroyed) {
            this.level.player.health -= 1;
        }
    };
    return NPC;
}(sprite_1.default));
exports.default = NPC;


/***/ }),

/***/ "./src/game/player.ts":
/*!****************************!*\
  !*** ./src/game/player.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vector2_1 = __webpack_require__(/*! ../engine/math/vector2 */ "./src/engine/math/vector2.ts");
var angle_1 = __webpack_require__(/*! ../engine/math/angle */ "./src/engine/math/angle.ts");
var keyboard_1 = __webpack_require__(/*! ../engine/platform/keyboard */ "./src/engine/platform/keyboard.ts");
var mouse_1 = __webpack_require__(/*! ../engine/platform/mouse */ "./src/engine/platform/mouse.ts");
var touch_1 = __webpack_require__(/*! ../engine/platform/touch */ "./src/engine/platform/touch.ts");
var Player = /** @class */ (function () {
    function Player(camera, level, position, rotation) {
        if (position === void 0) { position = new vector2_1.default(0, 0); }
        if (rotation === void 0) { rotation = 0; }
        this.rotation = 0;
        this.health = 100;
        this.moveSpeed = 0.1;
        this.rotateSpeed = Math.PI / 64;
        this.noddlingStabilizationSpeed = 20;
        this.noddlingFrequency = 120;
        this.noddlingForce = 3;
        this.isMoving = false;
        this.camera = camera;
        this.level = level;
        this.position = position;
        this.rotation = rotation;
    }
    Player.prototype.update = function () {
        this.nullifyHeightOffset();
        this.isMoving = false;
        this.health += 1;
        this.updateTouchControls();
        if (this.health > 100) {
            this.health = 100;
        }
        if (this.health < 0) {
            // (<any>window).restart(); ////////////////
        }
    };
    Player.prototype.move = function (direction, moveSpeed, rotateSpeed) {
        if (moveSpeed === void 0) { moveSpeed = this.moveSpeed; }
        if (rotateSpeed === void 0) { rotateSpeed = this.rotateSpeed; }
        var p = this.position;
        var distanceX;
        var distanceY;
        var collisionX;
        var collisionY;
        var time = performance.now();
        this.isMoving = true;
        switch (direction) {
            case 0 /* UP */:
                distanceX = moveSpeed * Math.cos(this.rotation);
                distanceY = moveSpeed * Math.sin(this.rotation);
                collisionX = this.level.isNotCollision(new vector2_1.default(p.x + distanceX, p.y));
                collisionY = this.level.isNotCollision(new vector2_1.default(p.x, p.y + distanceY));
                if (collisionX) {
                    this.position.x += distanceX;
                }
                if (collisionY) {
                    this.position.y += distanceY;
                }
                if (collisionX && collisionY) {
                    this.camera.heightOffset -= Math.cos(time / this.noddlingFrequency) * this.noddlingForce;
                }
                break;
            case 2 /* LEFT */:
                this.rotation -= rotateSpeed;
                break;
            case 1 /* DOWN */:
                distanceX = moveSpeed * Math.cos(this.rotation);
                distanceY = moveSpeed * Math.sin(this.rotation);
                collisionX = this.level.isNotCollision(new vector2_1.default(p.x - distanceX, p.y));
                collisionY = this.level.isNotCollision(new vector2_1.default(p.x, p.y - distanceY));
                if (collisionX) {
                    this.position.x -= distanceX;
                }
                if (collisionY) {
                    this.position.y -= distanceY;
                }
                if (collisionX && collisionY) {
                    this.camera.heightOffset += Math.cos(time / this.noddlingFrequency) * this.noddlingForce;
                }
                break;
            case 3 /* RIGHT */:
                this.rotation += rotateSpeed;
                break;
        }
        this.rotation = angle_1.default.normalize(this.rotation);
        this.camera.position = this.position;
        this.camera.rotation = this.rotation;
    };
    Player.prototype.onKeyboardTick = function () {
        // TODO: check indexOf vs. includes perfomance?
        // как тут покрасивше организвовать код?
        if (keyboard_1.default.keyCodes.includes(38 /* ARROW_UP */) || keyboard_1.default.keyCodes.includes(87 /* W */)) {
            this.move(0 /* UP */);
        }
        if (keyboard_1.default.keyCodes.includes(37 /* ARROW_LEFT */) || keyboard_1.default.keyCodes.includes(65 /* A */)) {
            this.move(2 /* LEFT */);
        }
        if (keyboard_1.default.keyCodes.includes(40 /* ARROW_DOWN */) || keyboard_1.default.keyCodes.includes(83 /* S */)) {
            this.move(1 /* DOWN */);
        }
        if (keyboard_1.default.keyCodes.includes(39 /* ARROW_RIGHT */) || keyboard_1.default.keyCodes.includes(68 /* D */)) {
            this.move(3 /* RIGHT */);
        }
    };
    Player.prototype.onMouseTick = function () {
        if (mouse_1.default.movementX > 0) {
            this.move(3 /* RIGHT */);
        }
        else if (mouse_1.default.movementX < 0) {
            this.move(2 /* LEFT */);
        }
    };
    Player.prototype.attack = function () {
        if (window.isMobile) {
            this.camera.gunOffset = 150; // mobile
        }
        else {
            this.camera.gunOffset = 200; // desktop
        }
        for (var i = 0; i < this.level.npcs.length; i++) {
            var n = this.level.npcs[i];
            var d = vector2_1.default.distance(this.position, n.position);
            if (d < 1 && !n.corpse && !n.destroyed) {
                n.destroy();
                break;
            }
        }
    };
    Player.prototype.updateTouchControls = function () {
        if (!window.isMobile || !touch_1.default.active) {
            return;
        }
        var rotationFactor;
        var maxDistance = 100;
        var distanceFactor = (touch_1.default.distance / maxDistance);
        if (distanceFactor > 1) {
            distanceFactor = 1;
        }
        var r = touch_1.default.rotation;
        var nw = r >= Math.PI && r <= Math.PI * 3 / 2;
        var ne = r >= Math.PI * 3 / 2 && r <= Math.PI * 2;
        var sw = r >= Math.PI / 2 && r <= Math.PI;
        var se = r >= 0 && r <= Math.PI / 2;
        if (nw || ne) {
            this.move(0 /* UP */, this.moveSpeed * distanceFactor, this.rotateSpeed * distanceFactor);
        }
        else if (sw || se) {
            this.move(1 /* DOWN */, this.moveSpeed * distanceFactor, this.rotateSpeed * distanceFactor);
        }
        // чтобы не дёргать камеру при смене направления
        if (nw || ne) {
            rotationFactor = Math.abs(Math.PI * 3 / 2 - r);
        }
        else if (sw || se) {
            rotationFactor = Math.abs(Math.PI / 2 - r);
        }
        if (nw || sw) {
            this.move(2 /* LEFT */, this.moveSpeed * distanceFactor, this.rotateSpeed * distanceFactor * rotationFactor);
        }
        else if (ne || se) {
            this.move(3 /* RIGHT */, this.moveSpeed * distanceFactor, this.rotateSpeed * distanceFactor * rotationFactor);
        }
    };
    // возвращаем камеру после ходьбы в нормальное положение
    Player.prototype.nullifyHeightOffset = function () {
        if (this.isMoving) {
            return;
        }
        this.camera.heightOffset = Math.trunc(this.camera.heightOffset);
        if (this.camera.heightOffset > this.noddlingStabilizationSpeed) {
            this.camera.heightOffset -= this.noddlingStabilizationSpeed;
        }
        else if (this.camera.heightOffset < -this.noddlingStabilizationSpeed) {
            this.camera.heightOffset += this.noddlingStabilizationSpeed;
        }
    };
    return Player;
}());
exports.default = Player;


/***/ }),

/***/ "./src/game/walls-data.ts":
/*!********************************!*\
  !*** ./src/game/walls-data.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = __webpack_require__(/*! ../engine/math/color */ "./src/engine/math/color.ts");
;
var WALLS_DATA = [
    {
        name: 'air',
        code: 0 /* AIR */,
        color: new color_1.default(0, 0, 0, 0)
    },
    {
        name: 'wall-1',
        code: 1 /* ONE */,
        color: new color_1.default(0, 0, 0, 255)
    },
    {
        name: 'wall-2',
        code: 2 /* TWO */,
        color: new color_1.default(255, 0, 0, 255)
    },
    {
        name: 'wall-3',
        code: 3 /* THREE */,
        color: new color_1.default(255, 0, 0, 255)
    },
    {
        name: 'wall-4',
        code: 4 /* FOUR */,
        color: new color_1.default(255, 0, 0, 255)
    },
    {
        name: 'wall-5',
        code: 5 /* FIVE */,
        color: new color_1.default(255, 0, 0, 255)
    },
    {
        name: 'wall-6',
        code: 6 /* SIX */,
        color: new color_1.default(255, 0, 0, 255)
    }
];
exports.WALLS_DATA = WALLS_DATA;


/***/ }),

/***/ "./src/izdelie-27.ts":
/*!***************************!*\
  !*** ./src/izdelie-27.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");
var assets_1 = __webpack_require__(/*! ./assets */ "./src/assets.ts");
var tick_1 = __webpack_require__(/*! ./engine/tick */ "./src/engine/tick.ts");
var resize_1 = __webpack_require__(/*! ./engine/platform/resize */ "./src/engine/platform/resize.ts");
var canvas_1 = __webpack_require__(/*! ./engine/platform/canvas */ "./src/engine/platform/canvas.ts");
var keyboard_1 = __webpack_require__(/*! ./engine/platform/keyboard */ "./src/engine/platform/keyboard.ts");
var mouse_1 = __webpack_require__(/*! ./engine/platform/mouse */ "./src/engine/platform/mouse.ts");
var touch_1 = __webpack_require__(/*! ./engine/platform/touch */ "./src/engine/platform/touch.ts");
var vector2_1 = __webpack_require__(/*! ./engine/math/vector2 */ "./src/engine/math/vector2.ts");
var camera_1 = __webpack_require__(/*! ./engine/render/camera */ "./src/engine/render/camera.ts");
var level_1 = __webpack_require__(/*! ./engine/level */ "./src/engine/level.ts");
var player_1 = __webpack_require__(/*! ./game/player */ "./src/game/player.ts");
var bitmap_1 = __webpack_require__(/*! ./engine/render/bitmap */ "./src/engine/render/bitmap.ts");
var npc_1 = __webpack_require__(/*! ./game/npc */ "./src/game/npc.ts");
load(init);
var music, camera, player, level;
function spawnRandomNPC(level) {
    var count = 3;
    var r = Math.floor(Math.random() * (count - 0 + 1) + 0);
    switch (r) {
        case 0:
            return new npc_1.default(assets_1.default.TEXTURES['daemon-1'].bitmap, new vector2_1.default(Math.ceil(level.size * Math.random()), Math.ceil(level.size * Math.random())), level, 1, 64);
        case 1:
            return new npc_1.default(assets_1.default.TEXTURES['daemon-2'].bitmap, new vector2_1.default(Math.ceil(level.size * Math.random()), Math.ceil(level.size * Math.random())), level, 1, 64);
        case 2:
            return new npc_1.default(assets_1.default.TEXTURES['daemon-3'].bitmap, new vector2_1.default(Math.ceil(level.size * Math.random()), Math.ceil(level.size * Math.random())), level, 10, 200);
        case 3:
            return new npc_1.default(assets_1.default.TEXTURES['daemon-4'].bitmap, new vector2_1.default(Math.ceil(level.size * Math.random()), Math.ceil(level.size * Math.random())), level, 4, 48);
    }
}
function restart() {
    level.randomize();
    player.position.x = level.size / 2;
    player.position.y = level.size / 2;
    camera.position = player.position;
    camera.rotation = player.rotation;
    window.sound.seek(0, music);
    level.npcs.forEach(function (n) { n.destroy(true); });
    level.npcs.length = 0;
    level.sprites.length = 0;
    setTimeout(function () {
        window.kills = 0;
        document.querySelector('#count').textContent = window.kills;
    }, 2500);
}
function init() {
    assets_1.default.MAP_BITMAP = assets_1.default.TEXTURES['map'].bitmap;
    level = new level_1.default(0, null, [], assets_1.default.TEXTURES['skybox'].bitmap, false);
    level.parseFromBitmap(assets_1.default.MAP_BITMAP);
    level.randomize();
    camera = new camera_1.default(level);
    player = new player_1.default(camera, level, new vector2_1.default(level.size / 2, level.size / 2), Math.PI / -2);
    // let minimap = new Minimap(level, camera, new Vector2(1, 1));
    camera.position = player.position;
    camera.rotation = player.rotation;
    level.player = player;
    // ////////
    // отнятие жизни ещё вернуть
    var testNPC = new npc_1.default(assets_1.default.TEXTURES['daemon-1'].bitmap, new vector2_1.default(player.position.x, player.position.y - 2), level, 1, 64);
    // console.log(ASSETS, level, player, camera);
    keyboard_1.initKeyboard();
    keyboard_1.addKeyboardListener(player.onKeyboardTick.bind(player));
    mouse_1.initMouse();
    // addMouseListener(player.onMouseTick.bind(player));
    tick_1.default(function () {
        camera.render();
        // minimap.render();
        player.update();
        level.update();
        var musicValue = 1 + (1 - player.health / 100) * 50;
        window.sound.volume(musicValue, music);
        if (window.isMobile) {
            camera.fov += Math.cos(Date.now() / 1000) / 450;
        }
        else {
            camera.fov += Math.cos(Date.now() / 400) / 175;
        }
        if (Math.random() < config_1.default.NPC_SPAWN_CHANGE) {
            // spawnRandomNPC(level);///////////////////////////////
        }
    });
    setInterval(function () {
        config_1.default.NPC_SPAWN_CHANGE *= 1.25;
    }, 2500);
    window.addEventListener('resize', resize_1.default.bind(this, canvas_1.canvas, camera));
    window.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 32: // space
                player.attack();
                break;
            case 82: // R
                restart();
                break;
        }
    });
    resize_1.default(canvas_1.canvas, camera);
    window.isMobile = window.checkIsMobile();
    if (window.isMobile) {
        camera.fov = Math.PI / 5;
        player.moveSpeed /= 1.5;
        player.rotateSpeed /= 1.5;
        setInterval(function () {
            player.attack();
        }, 200);
        window.addEventListener('touchstart', touch_1.touchstart);
        window.addEventListener('touchmove', touch_1.touchmove);
        window.addEventListener('touchend', touch_1.touchend);
        window.addEventListener('touchcancel', touch_1.touchend);
    }
}
;
function load(callback) {
    var promises = [];
    var texturesNames = Object.keys(assets_1.default.TEXTURES);
    texturesNames.forEach(function (name) {
        promises.push(new Promise(function (resolve, reject) {
            var url = "" + assets_1.default.FOLDER_URL + name + ".png";
            var image = new Image();
            image.addEventListener('load', function () {
                assets_1.default.TEXTURES[name].bitmap = new bitmap_1.default(image);
                resolve(image);
            });
            image.addEventListener('error', function () {
                reject(new Error("\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0443: " + url));
            });
            image.src = "" + assets_1.default.FOLDER_URL + name + ".png";
        }));
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
window.sound = new window.Howl({
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
music = window.sound.play('music');
window.checkIsMobile = function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
        check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
window.restart = restart;
setTimeout(function () {
    document.querySelector('#author').style.display = 'none';
    document.querySelector('#title').style.display = 'block';
    // }, 4000);
}, 100);
setTimeout(function () {
    document.querySelector('#title').style.display = 'none';
    document.querySelector('#manual').style.display = 'block';
    // }, 8000);
}, 200);
setTimeout(function () {
    document.querySelector('#manual').style.display = 'none';
    document.querySelector('#text').style.display = 'none';
    // }, 17000);
}, 300);


/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** multi ./src/izdelie-27.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/upisfree/p/ld45/src/izdelie-27.ts */"./src/izdelie-27.ts");


/***/ })

/******/ });
//# sourceMappingURL=izdelie-27.js.map