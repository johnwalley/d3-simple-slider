/*global console*/
let isv6;
let event;

import('d3-selection')
  .then(({ selection }) => {
    if ('event' in selection) {
      isv6 = false;
      event = selection.event;
    } else {
      isv6 = true;
    }
  })
  .catch((err) => {
    console.error('Unable to import d3-selection module');
    console.error(err);
  });

export function adaptListener(listener) {
  return function (a, b) {
    if (!isv6) {
      // d3@v5
      listener.call(this, event, a);
    } else {
      // d3@v6
      listener.call(this, a, b);
    }
  };
}
