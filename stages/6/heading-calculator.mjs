// code adapted from https://codepen.io/khalidmunir/pen/eRGOQG

// adapted for any set of coordinates, no error checking

// this function calculates the direction from point lat1, lon1
// towards point lat2, lon2
// directions: 0/360 is north, 90 is east
export function calculate(lat1, lon1, lat2, lon2) {
  const latk = rad(lat2);
  const longk = rad(lon2);
  const phi = rad(lat1);
  const lambda = rad(lon1);
  const heading = deg(
    Math.atan2(
      Math.sin(longk - lambda),
      Math.cos(phi) * Math.tan(latk) - Math.sin(phi) * Math.cos(longk - lambda),
    ),
  );
  return (heading + 360) % 360;
}

export function rad(deg) {
  return deg / 180 * Math.PI;
}

export function deg(rad) {
  return rad / Math.PI * 180;
}

// console.log('looking from the east', calculate(0, 1, 0, 0));
// console.log('looking from the west', calculate(0, -1, 0, 0));
// console.log('looking from the north', calculate(1, 0, 0, 0));
// console.log('looking from the south', calculate(-1, 0, 0, 0));
//
// console.log('looking from the northeast', calculate(1, 1, 0, 0));
// console.log('looking from the northwest', calculate(1, -1, 0, 0));
// console.log('looking from the southeast', calculate(-1, 1, 0, 0));
// console.log('looking from the southwest', calculate(-1, -1, 0, 0));
