import * as selection from 'd3-selection';

var prop = 'event';

export function adaptListener(listener) {
  var isv6 = !(prop in selection);

  return function (a, b) {
    if (isv6) {
      // d3@v6
      listener.call(this, a, b);
    } else {
      // d3@v5
      listener.call(this, selection[prop], a);
    }
  };
}
