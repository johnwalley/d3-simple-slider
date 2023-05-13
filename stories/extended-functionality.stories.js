import { max, min } from 'd3-array';
import { symbol, symbolCircle } from 'd3-shape';

/*eslint-env browser*/
import { document } from 'global';
import { format } from 'd3-format';
import { select } from 'd3-selection';
import { sliderBottom } from '../src/slider';
import { timeFormat } from 'd3-time-format';

export default {
  title: 'Functionality/Extended functionality',
};

export const AlternativeHandle = () => {
  const div = window.document.createElement('div');

  const data1 = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  const slider = sliderBottom()
    .min(min(data1))
    .max(max(data1))
    .width(300)
    .tickFormat(format('.2%'))
    .ticks(5)
    .default(0.015)
    .handle(symbol().type(symbolCircle).size(200)());

  const g = select(div)
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  g.call(slider);

  return div;
};

export const Transition = () => {
  const div = window.document.createElement('div');

  const data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  const slider = sliderBottom()
    .min(min(data))
    .max(max(data))
    .width(300)
    .tickFormat(format('.2%'))
    .ticks(5)
    .default(0.015)
    .fill('#2196f3');

  const g = select(div)
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  g.call(slider);

  setInterval(() => {
    slider.width(Math.random() * 100 + 200);
    g.transition().duration(200).call(slider);
  }, 1000);

  return div;
};

export const DynamicMaxAndMin = () => {
  const div = window.document.createElement('div');

  const slider = sliderBottom().min(2).max(15).width(300).step(1).default(5);

  const g = select(div)
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  g.call(slider);

  setInterval(() => {
    slider.max(Math.floor(Math.random() * 5) + 10);
    slider.min(Math.floor(Math.random() * 5));

    g.transition().duration(200).call(slider);
  }, 3000);

  return div;
};

export const Marks = () => {
  const div = window.document.createElement('div');

  const data = [
    new Date(1995, 1, 3),
    new Date(1995, 3, 3),
    new Date(1995, 4, 3),
    new Date(1995, 5, 3),
    new Date(1995, 9, 3),
  ];

  const slider = sliderBottom()
    .min(min(data))
    .max(max(data))
    .width(500)
    .tickFormat(timeFormat('%b %Y'))
    .tickValues(data)
    .marks(data)
    .fill('#2196f3')
    .default([data[1], data[2]]);

  const g = select(div)
    .append('svg')
    .attr('width', 600)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  g.call(slider);

  return div;
};
