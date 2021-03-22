# Examples of mobile APIs: touch, device orientation, geolocation

## Stages

1. following from stage 16 of [`ws_objects1`](https://github.com/portsoc/ws_objects1):

   * we have a Worm rather than a Tentacle
   * the colours are yellow -> purple to allow use in video with chrome keying
   * touch code has been improved so the interface is touch-oriented – mouse events are turned into touch-like events

2. add multi-touch ([see the diff](https://github.com/portsoc/ws_mobile/commit/stage-2))

   * have multiple worms (none at start)
   * create worms on `touchstart`
   * remove worms on `touchend`

3. make worms retract on `touchend` ([see the diff](https://github.com/portsoc/ws_mobile/commit/stage-3))

   * draw retracting worms under active worms

4. add gravity ([see the diff](https://github.com/portsoc/ws_mobile/commit/stage-4))

   * each worm is "hanging" off of the finger
   * the direction and strength of gravity comes from the phone's orientation

5. replace gravity with geolocation ([see the diff](https://github.com/portsoc/ws_mobile/commit/stage-5))

   * now each worm is attracted towards Portsmouth Uni's Buckingham Building
   * the phone's location comes from the geolocation API
   * the calculation uses a Great Circle heading

## Ideas for tweaking (exercises for the reader)

* capture 5 seconds of the worm's movements and replay it
* blurry trails behind worms
* bring back the tentacle shape and see what these examples look like with that
  - with stage 4, the tentacle might wobble in the direction of device orientation, rather than just fall downwards from the finger
* the worms are drawn one after another, so each worm is either entirely above or entirely below each other
  - the code can be changed to draw in order of "depth" so the head is above the tail
    * could simply tell the worm to draw everything at a given depth
    * or use generator functions to draw step-by-step
* don't let the worm collapse under the head, have a minimal distance below which a circle in a worm doesn't move closer to a previous circle
  – this way we could draw a worm and only when it becomes full length, it starts moving towards the finger
* stage 4 behaves strangely at some angles (e.g. with the display facing down); the code currently does not understand the angles at all but it could.
* stage 5 could make the worm shorter or longer depending on your distance from Buckingham Building
* stage 5 could be adapted with a server to point towards a random other user of the app
