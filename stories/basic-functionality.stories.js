import { event, select } from 'd3-selection';
import { max, min, range } from 'd3-array';
import {
  sliderBottom,
  sliderLeft,
  sliderRight,
  sliderTop,
} from '../src/slider';

/*eslint-env browser*/
import { document } from 'global';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

export default {
  title: 'Functionality/Basic functionality',
};

export const Simple = () => {
  const div = document.createElement('div');

  const data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  const slider = sliderBottom()
    .min(min(data))
    .max(max(data))
    .width(300)
    .tickFormat(format('.2%'))
    .ticks(5)
    .default(0.015);

  const g = select(div)
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  g.call(slider);

  return div;
};

export const SimpleTop = () => {
  const div = document.createElement('div');

  const data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  const slider = sliderTop()
    .min(min(data))
    .max(max(data))
    .width(300)
    .tickFormat(format('.2%'))
    .ticks(5)
    .default(0.015);

  const g = select(div)
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,60)');

  g.call(slider);

  return div;
};

export const Step = () => {
  const div = document.createElement('div');

  const data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  const slider = sliderBottom()
    .min(min(data))
    .max(max(data))
    .width(300)
    .step(0.005)
    .tickFormat(format('.2%'))
    .ticks(5)
    .default(0.015);

  const g = select(div)
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  g.call(slider);

  return div;
};

export const Time = () => {
  const div = document.createElement('div');

  const data = range(0, 10).map(function (d) {
    return new Date(1995 + d, 10, 3);
  });

  const slider = sliderBottom()
    .min(min(data))
    .max(max(data))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(300)
    .tickFormat(timeFormat('%Y'))
    .tickValues(data)
    .default(new Date(1998, 10, 3));

  const g = select(div)
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  g.call(slider);

  return div;
};

export const Fill = () => {
  const div = document.createElement('div');

  const data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  const slider = sliderBottom()
    .min(min(data))
    .max(max(data))
    .width(300)
    .displayValue(false)
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

  return div;
};

export const Range = () => {
  const div = document.createElement('div');

  const data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];
  const defaultValue = [0.015, 0.02];

  const p = select(div)
    .append('p')
    .attr('id', 'value')
    .text(defaultValue.map(format('.2%')).join('-'));

  const slider = sliderBottom()
    .min(min(data))
    .max(max(data))
    .width(300)
    .tickFormat(format('.2%'))
    .ticks(5)
    .default(defaultValue)
    .fill('skyblue')
    .displayValue(true)
    .on('onchange', (val) => {
      p.text(val.map(format('.2%')).join('-'));
    });

  const g = select(div)
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  g.call(slider);

  select(div)
    .append('button')
    .text('Reset')
    .on('click', () => {
      slider.value(defaultValue);
      event.preventDefault();
    });

  return div;
};

export const Vertical = () => {
  const div = document.createElement('div');

  const data1 = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  const slider = sliderLeft()
    .min(min(data1))
    .max(max(data1))
    .height(300)
    .tickFormat(format('.2%'))
    .ticks(5)
    .default(0.015);

  const g = select(div)
    .append('svg')
    .attr('width', 100)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(60,30)');

  g.call(slider);

  return div;
};

export const VerticalRange = () => {
  const div = document.createElement('div');

  const data1 = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  const slider = sliderLeft()
    .min(min(data1))
    .max(max(data1))
    .height(300)
    .tickFormat(format('.2%'))
    .ticks(5)
    .default([0.008, 0.019]);

  const g = select(div)
    .append('svg')
    .attr('width', 100)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(60,30)');

  g.call(slider);

  return div;
};

export const VerticalRight = () => {
  const div = document.createElement('div');

  const data1 = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  const slider = sliderRight()
    .min(min(data1))
    .max(max(data1))
    .height(300)
    .tickFormat(format('.2%'))
    .ticks(5)
    .default(0.015);

  const g = select(div)
    .append('svg')
    .attr('width', 100)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(10,30)');

  g.call(slider);

  return div;
};

export const Padding = () => {
  const div = document.createElement('div');

  const data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

  const slider = sliderBottom()
    .min(min(data))
    .max(max(data))
    .width(300)
    .tickFormat(format('.2%'))
    .tickPadding(12)
    .ticks(5)
    .default(0.015);

  const g = select(div)
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  g.call(slider);

  return div;
};
