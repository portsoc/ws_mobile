'use strict';

import { Worm } from './classes/worm.mjs';

let worm, x, y, canvas, ctx;

function touchMove(e) {
  e.preventDefault();
  x = e.changedTouches[0].pageX - canvas.offsetLeft;
  y = e.changedTouches[0].pageY - canvas.offsetTop;
}

function move(e) {
  x = e.clientX - canvas.offsetLeft;
  y = e.clientY - canvas.offsetTop;
}


function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  worm.moveTowards(x, y);
  worm.draw(ctx);
  requestAnimationFrame(step);
}


function init() {
  // get a handle on the drawing canvas
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  x = canvas.width / 2;
  y = canvas.height / 2;

  canvas.addEventListener('mousemove', move);
  canvas.addEventListener('touchstart', touchMove);
  canvas.addEventListener('touchmove', touchMove);

  worm = new Worm(canvas.width / 2, canvas.height / 2, 80, 30);

  step();
}

window.addEventListener('load', init);
