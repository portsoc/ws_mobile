'use strict';

import { Tentacle } from './classes/tentacle.mjs';

// get a handle on the drawing canvas
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let x = canvas.width / 2;
let y = canvas.height / 2;

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
  ctx.fillStyle = 'rgba(0,0,0,0.01)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  t.moveTowards(x, y);
  t.draw(ctx);
  requestAnimationFrame(step);
}

const t = new Tentacle(canvas.width / 2, canvas.height / 2, 180, 3);

// make canvas similar color to what it fades to
ctx.fillStyle = '#300';
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener('mousemove', move);
canvas.addEventListener('touchstart', touchMove);
canvas.addEventListener('touchmove', touchMove);
step();
