export class Shape {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
  }

  moveBy(x, y) {
    this.x += x;
    this.y += y;
  }

  moveTowards(x, y) {
    this.x -= (this.x - x) / 2;
    this.y -= (this.y - y) / 2;
  }
}
