# Examples of mobile APIs: touch, device orientation, geolocation


## Stages

1. following from ws_objects1 stage 16:
  * we have a Worm rather than a Tentacle
  * the colours are yellow -> purple to allow use in video with chrome keying
  * touch code has been improved so the interface is touch-oriented – mouse events are turned into touch-like events
2. add multi-touch
  * have multiple worms (none at start)
  * create worms on touchstart
  * remove worms on touchend
3. make worms retract on touchend
  * draw retracting worms under active worms




## todo:

* worm head moving around with gyro
* worm hanging down from your finger (gyro)
* anything with geolocation?
  * 1: worm pointing towards buckingham and calculating distance
  * 99: point towards the nearest person to you who's running this app (with web server, web sockets)
* web component?

## Ideas for tweaking (exercises for the reader)

* capture 5 seconds of the worm's movements and replay it
* blurry trails behind worms
* bring back the tentacle shape and see what these examples look like with that
* the worms are drawn one after another, so each worm is either entirely above or entirely below each other
  - the code can be changed to draw in order of "depth" so the head is above the tail
    * could simply tell the worm to draw everything at a given depth
    * or use generator functions to draw step-by-step
