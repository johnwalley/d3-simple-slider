import * as selection from 'd3-selection';

export function adaptListener(listener) {
  const isv6 = !('event' in Object.getOwnPropertyNames(selection));
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
