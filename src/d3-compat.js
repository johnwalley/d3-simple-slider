import { event } from 'd3-selection';

export function adaptListener(listener) {
  return function (a, b) {
    if (a && a.target) {
      // d3@v6
      listener.call(this, a, b);
    } else {
      // d3@v5
      listener.call(this, event, a);
    }
  };
}
