import { Circle } from './circle.mjs';

export class Tentacle {
  makeCol(i) {
    return `hsl(${i * 120 / this.num - 60}deg, 100%, 50%)`;
  }

  constructor(x, y, num, size) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.size = size;
    this.shapes = [];

    for (let i = 0; i < this.num; i += 1) {
      this.shapes.push(new Circle(this.x, this.y, (this.num - i) * this.size, this.makeCol(i)));
    }
  }

  draw(ctx) {
    for (const s of this.shapes) {
      s.draw(ctx);
    }
  }

  moveTowards(x, y) {
    let prev = { x, y };
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const s = this.shapes[i];
      s.moveTowards(prev.x, prev.y);
      prev = { x: s.x, y: s.y };
    }
  }
}
