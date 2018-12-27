import { document } from 'global';
import { storiesOf } from '@storybook/html';
import { event, select } from 'd3-selection';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { min, max, range } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisRight } from 'd3-axis';
import { symbol, symbolCircle, symbolSquare } from 'd3-shape';
import { sliderBottom, sliderLeft } from '../src/slider';

storiesOf('Basic functionality', module)
  .add('Simple', () => {
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
  })
  .add('Step', () => {
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
  })
  .add('Time', () => {
    const div = document.createElement('div');

    const data = range(0, 10).map(function(d) {
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
  })
  .add('Fill', () => {
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
  })
  .add('Range', () => {
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
      .on('onchange', val => {
        p.text(val.map(format('.2%')).join('-'));
      });

    const g = select(div)
      .append('svg')
      .attr('width', 500)
      .attr('height', 100)
      .append('g')
      .attr('transform', 'translate(30,30)');

    g.call(slider);

    const button = select(div)
      .append('button')
      .text('Reset')
      .on('click', () => {
        slider.value(defaultValue);
        event.preventDefault();
      });

    return div;
  })
  .add('Vertical', () => {
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
  });

storiesOf('Extended functionality', module)
  .add('Alternative handle', () => {
    const div = document.createElement('div');

    const data1 = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

    const slider = sliderBottom()
      .min(min(data1))
      .max(max(data1))
      .width(300)
      .tickFormat(format('.2%'))
      .ticks(5)
      .default(0.015)
      .handle(
        symbol()
          .type(symbolCircle)
          .size(200)()
      );

    const g = select(div)
      .append('svg')
      .attr('width', 500)
      .attr('height', 100)
      .append('g')
      .attr('transform', 'translate(30,30)');

    g.call(slider);

    return div;
  })
  .add('Transition', () => {
    const div = document.createElement('div');

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
      g.transition()
        .duration(200)
        .call(slider);
    }, 1000);

    return div;
  });

storiesOf('Examples', module)
  .add('New York Times', () => {
    const div = document.createElement('div');

    const width = 565;
    const height = 120;
    const margin = { top: 20, right: 50, bottom: 50, left: 40 };

    const data = range(1, 41).map(d => ({
      year: d,
      value: 10000 * Math.exp(-(d - 1) / 40),
    }));

    const svg = select(div)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const padding = 0.1;

    const xBand = scaleBand()
      .domain(data.map(d => d.year))
      .range([margin.left, width - margin.right])
      .padding(padding);

    const xLinear = scaleLinear()
      .domain([min(data, d => d.year), max(data, d => d.year)])
      .range([
        margin.left + xBand.bandwidth() / 2 + xBand.step() * padding - 0.5,
        width -
          margin.right -
          xBand.bandwidth() / 2 -
          xBand.step() * padding -
          0.5,
      ]);

    const y = scaleLinear()
      .domain([0, max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const yAxis = g =>
      g
        .attr('transform', `translate(${width - margin.right},0)`)
        .call(
          axisRight(y)
            .tickValues([1e4])
            .tickFormat(format('($.2s'))
        )
        .call(g => g.select('.domain').remove());

    const slider = g =>
      g.attr('transform', `translate(0,${height - margin.bottom})`).call(
        sliderBottom(xLinear)
          .step(1)
          .ticks(4)
          .default(9)
          .on('onchange', value => draw(value))
      );

    const bars = svg
      .append('g')
      .selectAll('rect')
      .data(data);

    const barsEnter = bars
      .enter()
      .append('rect')
      .attr('x', d => xBand(d.year))
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', xBand.bandwidth());

    svg.append('g').call(yAxis);
    svg.append('g').call(slider);

    const draw = selected => {
      barsEnter
        .merge(bars)
        .attr('fill', d => (d.year === selected ? '#bad80a' : '#e0e0e0'));
    };

    draw(9);

    return div;
  })
  .add('Color picker', () => {
    const num2hex = rgb => {
      return rgb
        .map(color => {
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
        .on('onchange', num => {
          rgb[i] = num;
          box.attr('fill', `#${num2hex(rgb)}`);
        });

      g.append('g')
        .attr('transform', `translate(30,${60 * i})`)
        .call(slider);
    });

    return div;
  });
