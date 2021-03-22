import { Shape } from './shape.mjs';

export class Circle extends Shape {
  constructor(x, y, r, col) {
    super(x, y, col);
    this.r = r;
  }

  draw(ctx) {
    ctx.fillStyle = this.col;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}
