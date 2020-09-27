/*eslint-env browser*/
import { document } from 'global';
import { select } from 'd3-selection';
import { sliderBottom } from '../../src';

export default {
  title: 'Demos/Color picker',
};

export const Demo = () => {
  const num2hex = (rgb) => {
    return rgb
      .map((color) => {
        let str = color.toString(16);

        if (str.length === 1) {
          str = '0' + str;
        }

        return str;
      })
      .join('');
  };

  let rgb = [100, 0, 0];
  const colors = ['red', 'green', 'blue'];

  const div = document.createElement('div');

  const g = select(div)
    .append('svg')
    .attr('width', 600)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(30,30)');

  const box = g
    .append('rect')
    .attr('width', 100)
    .attr('height', 100)
    .attr('transform', 'translate(400,0)')
    .attr('fill', `#${num2hex(rgb)}`);

  rgb.forEach((color, i) => {
    const slider = sliderBottom()
      .min(0)
      .max(255)
      .step(1)
      .width(300)
      .default(rgb[i])
      .displayValue(false)
      .fill(colors[i])
      .on('onchange', (num) => {
        rgb[i] = num;
        box.attr('fill', `#${num2hex(rgb)}`);
      });

    g.append('g')
      .attr('transform', `translate(30,${60 * i})`)
      .call(slider);
  });

  return div;
};
