'use strict';

import { Worm } from './classes/worm.mjs';
import * as heading from './heading-calculator.mjs';

let canvas, ctx;
let r = 15;
const worms = new Map();
const retractingWorms = new Set();
const gravity = { x: 0, y: 0 };

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
    const worm = new Worm(x, y, 80, r);
    worm.gravity = gravity;
    worms.set(touch.identifier, worm);
  }
}

function touchEnd(e) {
  e.preventDefault();
  for (const touch of e.changedTouches) {
    const worm = worms.get(touch.identifier);
    worms.delete(touch.identifier);
    retractingWorms.add(worm);
  }
}

function handleLocation({ coords }) {
  const BUCKINGHAM = {
    lat: 50.79848979556136,
    lon: -1.098500458185442,
  };
  const G = 6;

  const angle = heading.calculate(
    coords.latitude, coords.longitude,
    BUCKINGHAM.lat, BUCKINGHAM.lon,
  );

  gravity.y = -Math.cos(heading.rad(angle)) * G;
  gravity.x = Math.sin(heading.rad(angle)) * G;
}

function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw retracting worms under active worms, so first
  for (const worm of retractingWorms) {
    worm.moveTowards();
    const stillThere = worm.retract();
    if (stillThere) {
      worm.draw(ctx);
    } else {
      retractingWorms.delete(worm);
    }
  }

  for (const worm of worms.values()) {
    worm.moveTowards();
    worm.draw(ctx);
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

  // set worm radius to be 1% of screen length
  r = Math.max(canvas.width, canvas.height) / 100;

  canvas.addEventListener('mousedown', mouseToTouch(touchStart));
  canvas.addEventListener('mousemove', mouseToTouch(touchMove));
  canvas.addEventListener('mouseup', mouseToTouch(touchEnd));

  canvas.addEventListener('touchstart', touchStart);
  canvas.addEventListener('touchmove', touchMove);
  canvas.addEventListener('touchend', touchEnd);
  canvas.addEventListener('touchcancel', touchEnd);

  navigator.geolocation.watchPosition(handleLocation);

  step();
}

window.addEventListener('load', init);
