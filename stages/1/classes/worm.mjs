import { Circle } from './circle.mjs';

export class Worm {
  constructor(x, y, num, size) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.size = size;
    this.shapes = [];
    this.dest = { x, y };

    for (let i = 0; i < this.num; i += 1) {
      const circle = new Circle(
        this.x,
        this.y,
        this.size,
        makeColour(i, num),
      );
      this.shapes.push(circle);
    }
  }

  draw(ctx) {
    for (const s of this.shapes) {
      s.draw(ctx);
    }
  }

  moveTowards(x = this.dest.x, y = this.dest.y) {
    let prev = { x, y };
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const s = this.shapes[i];
      s.moveTowards(prev.x, prev.y);
      prev = { x: s.x, y: s.y };
    }
  }
}

function makeColour(i, num) {
  return `hsl(${i * 120 / num - 60}deg, 100%, 50%)`;
}
