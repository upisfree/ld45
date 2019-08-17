import { canvas, context } from './platform/canvas';
import Vector2 from './math/vector2';
import Color from './math/color';
import Bitmap from './bitmap';

namespace gl {
  // эта версия без поворота, нужно проверить, насколько она быстрее версии с поворотом
  // export function drawRect(position: Vector2, size: Vector2, color: Color): void {
  //   context.fillStyle = color.getRGBAString();
  //   context.fillRect(position.x, position.y, size.width, size.height);
  // }

  // rotation — в радианах
  export function drawRect(
    position: Vector2,
    size: Vector2,
    rotation: number,
    color: Color | CanvasGradient | string
  ): void {
    context.save();

    context.beginPath();

    // точка, относительно которой транслейт — центр
    context.translate(position.x + size.width / 2, position.y + size.height / 2);
    context.rotate(rotation);

    if (color instanceof Color) {
      color = color.getRGBAString();
    };

    context.fillStyle = color;
    context.fillRect(-size.width / 2, -size.height / 2, size.width, size.height);

    context.closePath();

    context.restore();
  }
  export function drawImage(
    bitmap: Bitmap,
    bitmapPosition: Vector2,
    bitmapSize: Vector2,
    drawPosition: Vector2,
    drawSize: Vector2,
    drawRotation: number = 0
  ): void {
    context.save();

    // точка, относительно которой транслейт — центр
    context.rotate(drawRotation);

    context.drawImage(
      bitmap.image,
      bitmapPosition.x,
      bitmapPosition.y,
      bitmapSize.width,
      bitmapSize.height,
      drawPosition.x,
      drawPosition.y,
      drawSize.width,
      drawSize.height
    );

    context.restore();
  }

  // TODO: create normal gradient function
  export function drawGradient(
    position: Vector2,
    size: Vector2,
    rotation: number,
    ...colors: Color[]
  ): void {
    let gradient = context.createLinearGradient(0, 0, 0, size.height);
    
    for (let i = 0; i < colors.length; i++) {
      gradient.addColorStop(i, colors[i].getRGBAString());
    }

    drawRect(position, size, rotation, gradient);
  }

  export function drawLine(
    v1: Vector2,
    v2: Vector2,
    color: Color
  ): void {
    context.save();

    context.beginPath();

    context.strokeStyle = color.getRGBAString();

    context.moveTo(v1.x, v1.y);
    context.lineTo(v2.x, v2.y);

    context.stroke();

    context.closePath();

    context.restore();
  }

  export function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export default gl;