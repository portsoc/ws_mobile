'use strict';

import { Worm } from './classes/worm.mjs';

let canvas, ctx;
const worms = new Map();

function getTouchPosition(touch) {
  const x = touch.pageX - canvas.offsetLeft;
  const y = touch.pageY - canvas.offsetTop;
  return { x, y };
}

function touchMove(e) {
  e.preventDefault();
  for (const touch of e.changedTouches) {
    const worm = worms.get(touch.identifier);
    if (worm) {
      worm.dest = getTouchPosition(touch);
    }
  }
}

function touchStart(e) {
  e.preventDefault();
  for (const touch of e.changedTouches) {
    const { x, y } = getTouchPosition(touch);
    const worm = new Worm(x, y, 80, 30);
    worms.set(touch.identifier, worm);
  }
}

function touchEnd(e) {
  e.preventDefault();
  for (const touch of e.changedTouches) {
    const worm = worms.get(touch.identifier);
    worm.startRetracting();
  }
}

function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const [id, worm] of worms.entries()) {
    const moved = worm.moveTowards();
    if (moved) {
      worm.draw(ctx);
    } else {
      // the worm is fully retracted -> gone
      worms.delete(id);
    }
  }
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

  canvas.addEventListener('mousedown', mouseToTouch(touchStart));
  canvas.addEventListener('mousemove', mouseToTouch(touchMove));
  canvas.addEventListener('mouseup', mouseToTouch(touchEnd));

  canvas.addEventListener('touchstart', touchStart);
  canvas.addEventListener('touchmove', touchMove);
  canvas.addEventListener('touchend', touchEnd);

  step();
}

window.addEventListener('load', init);
