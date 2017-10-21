import * as d3 from 'd3'

function slider() {
  var value;
  var domain = [0, 100];
  var width = 100;

  var tickFormat = null;
  var ticks = null;

  var dispatch = d3.dispatch('onchange', 'start', 'end', 'drag');

  var handle = null;
  var scale = null;
  var scaleClamped = null;

  function slider(context) {
    scale = d3.scaleLinear().domain(domain).range([0, width]).clamp(true);
    scaleClamped = d3.scaleLinear().range(scale.range()).domain(scale.range()).clamp(true);

    var axis = context.call(d3.axisBottom(scale).tickFormat(tickFormat).ticks(ticks));

    axis.select('.domain').remove();

    axis.selectAll('.tick line')
      .attr('stroke', 'lightgray');

    axis.selectAll('text')
      .attr('dy', '12px');

    function dragstarted() {
      d3.select(this).raise().classed('active', true);
      var pos = scaleClamped(d3.event.x);
      handle.attr('transform', 'translate(' + pos + ',' + 0 + ')');

      var newValue = scale.invert(pos);
      dispatch.call('start', slider, newValue);

      if (value !== newValue) {
        value = newValue;
        dispatch.call('onchange', slider, newValue);
      }
    }

    function dragged() {
      var pos = scaleClamped(d3.event.x);
      handle.attr('transform', 'translate(' + pos + ',' + 0 + ')');

      var newValue = scale.invert(pos);
      dispatch.call('drag', slider, newValue);

      if (value !== newValue) {
        value = newValue;
        dispatch.call('onchange', slider, newValue);
      }
    }

    function dragended() {
      d3.select(this).classed('active', false);
      var pos = scaleClamped(d3.event.x);
      handle.attr('transform', 'translate(' + pos + ',' + 0 + ')');

      var newValue = scale.invert(pos);
      dispatch.call('end', slider, newValue);

      if (value !== newValue) {
        value = newValue;
        dispatch.call('onchange', slider, newValue);
      }
    }

    var slider = context.append('g')
      .attr('class', 'handle')
      .attr('cursor', 'ew-resize')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    slider.append('line')
      .attr('class', 'baseline-halo')
      .attr('x1', 0)
      .attr('x2', scale.range()[1])
      .attr('y1', 3)
      .attr('y2', 3)
      .attr('stroke', '#bbb')
      .attr('stroke-width', 6)
      .attr('stroke-linecap', 'round');

    slider.append('line')
      .attr('class', 'baseline')
      .attr('x1', 0)
      .attr('x2', scale.range()[1])
      .attr('y1', 3)
      .attr('y2', 3)
      .attr('stroke', '#eee')
      .attr('stroke-width', 4)
      .attr('stroke-linecap', 'round');

    slider.append('line')
      .attr('class', 'overlay')
      .attr('x1', 0)
      .attr('x2', scale.range()[1])
      .attr('y1', 3)
      .attr('y2', 3)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 40)
      .attr('stroke-linecap', 'round');

    handle = slider.append('path')
      .attr('transform', 'translate(0,0)')
      .attr('d', 'M-5.5,-2.5v10l6,5.5l6,-5.5v-10z')
      .attr('fill', 'white')
      .attr('stroke', '#777');
  }

  slider.min = function (_) {
    if (!arguments.length) return domain[0];
    domain[0] = _;
    return slider;
  }

  slider.max = function (_) {
    if (!arguments.length) return domain[1];
    domain[1] = _;
    return slider;
  }

  slider.domain = function (_) {
    if (!arguments.length) return domain;
    domain = _;
    return slider;
  }

  slider.width = function (_) {
    if (!arguments.length) return width;
    width = _;
    return slider;
  }

  slider.tickFormat = function (_) {
    if (!arguments.length) return tickFormat;
    tickFormat = _;
    return slider;
  }

  slider.ticks = function (_) {
    if (!arguments.length) return ticks;
    ticks = _;
    return slider;
  }

  slider.value = function (_) {
    if (!arguments.length) return value;
    var pos = scaleClamped(scale(_));
    handle.transition().ease(d3.easeQuadOut).duration(200).attr('transform', 'translate(' + pos + ',' + 0 + ')');

    var newValue = scale.invert(pos);

    if (value !== newValue) {
      value = newValue;
      dispatch.call('onchange', slider, newValue);
    }

    return slider;
  }

  slider.on = function () {
    var value = dispatch.on.apply(dispatch, arguments);
    return value === dispatch ? slider : value;
  }

  return slider;
}

export function sliderHorizontal() {
  return slider();
}
