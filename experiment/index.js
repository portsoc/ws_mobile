'use strict';

import { Tentacle } from './classes/tentacle.mjs';

const NUM = 20;
const tentacles = new Map();
const retractingTentacles = new Set();
const gravity = { x: 0, y: 0 };

let canvas, ctx;
let radius = 15;

function getTouchPosition(touch) {
  // relying on the canvas located flush with the top-left corner of the page
  return {
    x: touch.pageX,
    y: touch.pageY,
  };
}

function touchMove(e) {
  e.preventDefault();
  for (const touch of e.changedTouches) {
    const tentacle = tentacles.get(touch.identifier);
    if (tentacle) {
      tentacle.dest = getTouchPosition(touch);
    }
  }
}

function touchStart(e) {
  e.preventDefault();
  for (const touch of e.changedTouches) {
    const { x, y } = getTouchPosition(touch);
    const tentacle = new Tentacle(x, y, NUM, radius, Math.random()*360);
    tentacle.gravity = gravity;
    tentacles.set(touch.identifier, tentacle);
  }
}

function touchEnd(e) {
  e.preventDefault();
  for (const touch of e.changedTouches) {
    const tentacle = tentacles.get(touch.identifier);
    tentacles.delete(touch.identifier);
    retractingTentacles.add(tentacle);
  }
}

function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw retracting tentacles under active tentacles, so first
  for (const tentacle of retractingTentacles) {
    tentacle.moveTowards();
    const stillThere = tentacle.retract();
    if (stillThere) {
      tentacle.draw(ctx);
    } else {
      retractingTentacles.delete(tentacle);
    }
  }

  for (const tentacle of tentacles.values()) {
    tentacle.moveTowards();
  }

  for (let layer = 0; layer<NUM; layer++) {
    for (const tentacle of tentacles.values()) {
      tentacle.draw(ctx, layer);
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

  // set tentacle radius to be 1% of screen length
  radius = Math.max(canvas.width, canvas.height) / 100;

  canvas.addEventListener('mousedown', mouseToTouch(touchStart));
  canvas.addEventListener('mousemove', mouseToTouch(touchMove));
  canvas.addEventListener('mouseup', mouseToTouch(touchEnd));

  canvas.addEventListener('touchstart', touchStart);
  canvas.addEventListener('touchmove', touchMove);
  canvas.addEventListener('touchend', touchEnd);
  canvas.addEventListener('touchcancel', touchEnd);

  step();
}

window.addEventListener('load', init);
