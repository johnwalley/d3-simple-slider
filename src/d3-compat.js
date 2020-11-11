import * as selection from 'd3-selection';

const isv6 = !Object.getOwnPropertyNames(selection).includes('event');

export function adaptListener(listener) {
  return function (a, b) {
    if (isv6) {
      // d3@v6
      listener.call(this, a, b);
    } else {
      // d3@v5
      listener.call(this, selection.event, a);
    }
  };
}
