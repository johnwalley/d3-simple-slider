import { max, min, range } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';

import { axisRight } from 'd3-axis';
/*eslint-env browser*/

import { format } from 'd3-format';
import { select } from 'd3-selection';
import { sliderBottom } from '../../src';

export default {
  title: 'Demos/New York Times',
};

export const Demo = () => {
  const div = window.document.createElement('div');

  const width = 565;
  const height = 120;
  const margin = { top: 20, right: 50, bottom: 50, left: 40 };

  const data = range(1, 41).map((d) => ({
    year: d,
    value: 10000 * Math.exp(-(d - 1) / 40),
  }));

  const svg = select(div)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const padding = 0.1;

  const xBand = scaleBand()
    .domain(data.map((d) => d.year))
    .range([margin.left, width - margin.right])
    .padding(padding);

  const xLinear = scaleLinear()
    .domain([min(data, (d) => d.year), max(data, (d) => d.year)])
    .range([
      margin.left + xBand.bandwidth() / 2 + xBand.step() * padding - 0.5,
      width -
        margin.right -
        xBand.bandwidth() / 2 -
        xBand.step() * padding -
        0.5,
    ]);

  const y = scaleLinear()
    .domain([0, max(data, (d) => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const yAxis = (g) =>
    g
      .attr('transform', `translate(${width - margin.right},0)`)
      .call(axisRight(y).tickValues([1e4]).tickFormat(format('($.2s')))
      .call((g) => g.select('.domain').remove());

  const slider = (g) =>
    g.attr('transform', `translate(0,${height - margin.bottom})`).call(
      sliderBottom(xLinear)
        .step(1)
        .ticks(4)
        .default(9)
        .on('onchange', (value) => draw(value))
    );

  const bars = svg.append('g').selectAll('rect').data(data);

  const barsEnter = bars
    .enter()
    .append('rect')
    .attr('x', (d) => xBand(d.year))
    .attr('y', (d) => y(d.value))
    .attr('height', (d) => y(0) - y(d.value))
    .attr('width', xBand.bandwidth());

  svg.append('g').call(yAxis);
  svg.append('g').call(slider);

  svg.select('.track-overlay').attr('stroke-width', 120); // Ensure drag zone covers everything

  const draw = (selected) => {
    barsEnter
      .merge(bars)
      .attr('fill', (d) => (d.year === selected ? '#bad80a' : '#e0e0e0'));
  };

  draw(9);

  return div;
};
