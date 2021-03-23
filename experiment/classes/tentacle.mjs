import { Circle } from './circle.mjs';

export class Tentacle {


  constructor(x, y, num, size) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.size = size;
    this.shapes = [];
    this.dest = { x, y };
    this.gravity = { x: 0, y: 0 };

    for (let i = 0; i < this.num; i += 1) {
      const circle = new Circle(
        this.x,
        this.y,
        (this.num - i) * this.size,
        makeColour(i, num),
      );
      this.shapes.push(circle);
    }
  }

  draw(ctx, layer) {
    // for (const s of this.shapes) {
    //   s.draw(ctx);
    // }
    this.shapes[layer]?.draw(ctx);
  }

  moveTowards(x = this.dest.x, y = this.dest.y) {
    let prev = { x, y };
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const s = this.shapes[i];
      s.moveTowards(prev.x + this.gravity.x, prev.y + this.gravity.y);
      prev = { x: s.x, y: s.y };
    }
  }

  retract() {
    // remove the head
    const head = this.shapes.pop();
    this.dest.x = head.x;
    this.dest.y = head.y;

    // make the shape thinner
    for (const shape of this.shapes) {
      shape.r *= 0.98;
    }

    return this.shapes.length > 0;
  }
}

function makeColour(i, num) {
  return `hsl(${i * 120 / num - 60}deg, 100%, 50%)`;
}
