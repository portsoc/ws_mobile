'use strict';

import { Worm } from './classes/worm.mjs';

let canvas, ctx;
let r, worm;

function getTouchPosition(touch) {
  // relying on the canvas located flush with the top-left corner of the page
  return {
    x: touch.pageX,
    y: touch.pageY,
  };
}

function touchMove(e) {
  e.preventDefault();
  worm.dest = getTouchPosition(e.changedTouches[0]);
}

function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  worm.moveTowards();
  worm.draw(ctx);
  requestAnimationFrame(step);
}

function mouseToTouch(handler) {
  return (e) => {
    e.changedTouches = [e];
    e.identifier = -1;
    handler(e);
  };
}


function init() {
  // get a handle on the drawing canvas
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // set worm radius to be 1% of screen length
  r = Math.max(canvas.width, canvas.height) / 100;

  canvas.addEventListener('mousemove', mouseToTouch(touchMove));
  canvas.addEventListener('touchstart', touchMove);
  canvas.addEventListener('touchmove', touchMove);

  worm = new Worm(canvas.width / 2, canvas.height / 2, 80, r);

  step();
}

window.addEventListener('load', init);
