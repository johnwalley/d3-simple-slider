import { min, max, scan } from 'd3-array';
import { axisTop, axisRight, axisBottom, axisLeft } from 'd3-axis';
import { dispatch } from 'd3-dispatch';
import { drag } from 'd3-drag';
import { easeQuadOut } from 'd3-ease';
import { scaleLinear, scaleTime } from 'd3-scale';
import { event, select } from 'd3-selection';

var UPDATE_DURATION = 200;
var SLIDER_END_PADDING = 8;

var top = 1;
var right = 2;
var bottom = 3;
var left = 4;

function translateX(x) {
  return 'translate(' + x + ',0)';
}

function translateY(y) {
  return 'translate(0,' + y + ')';
}

function slider(orientation, scale) {
  scale = typeof scale !== 'undefined' ? scale : null;

  var value = 0;
  var defaultValue = 0;
  var domain = [0, 10];
  var width = 100;
  var height = 100;
  var displayValue = true;
  var handle = 'M-5.5,-5.5v10l6,5.5l6,-5.5v-10z';
  var step = null;
  var tickValues = null;
  var marks = null;
  var tickFormat = null;
  var ticks = null;
  var displayFormat = null;
  var fill = null;

  var listeners = dispatch('onchange', 'start', 'end', 'drag');

  var selection = null;
  var identityClamped = null;

  var k = orientation === top || orientation === left ? -1 : 1;
  var x = orientation === left || orientation === right ? 'y' : 'x';
  var y = orientation === left || orientation === right ? 'x' : 'y';

  var transformAlong =
    orientation === top || orientation === bottom ? translateX : translateY;

  var transformAcross =
    orientation === top || orientation === bottom ? translateY : translateX;

  var axisFunction = null;

  switch (orientation) {
    case top:
      axisFunction = axisTop;
      break;
    case right:
      axisFunction = axisRight;
      break;
    case bottom:
      axisFunction = axisBottom;
      break;
    case left:
      axisFunction = axisLeft;
      break;
  }

  var handleSelection = null;
  var fillSelection = null;
  var textSelection = null;

  function slider(context) {
    selection = context.selection ? context.selection() : context;

    if (scale) {
      domain = [min(scale.domain()), max(scale.domain())];
      scale = scale.clamp(true);
    } else {
      scale = domain[0] instanceof Date ? scaleTime() : scaleLinear();

      scale = scale
        .domain(domain)
        .range([
          0,
          orientation === top || orientation === bottom ? width : height,
        ])
        .clamp(true);
    }

    identityClamped = scaleLinear()
      .range(scale.range())
      .domain(scale.range())
      .clamp(true);

    // Ensure value is valid
    value = scaleLinear()
      .range(domain)
      .domain(domain)
      .clamp(true)(value);

    tickFormat = tickFormat || scale.tickFormat();
    displayFormat = displayFormat || tickFormat || scale.tickFormat();

    var axis = selection.selectAll('.axis').data([null]);

    axis
      .enter()
      .append('g')
      .attr('transform', transformAcross(k * 7))
      .attr('class', 'axis');

    var slider = selection.selectAll('.slider').data([null]);

    var sliderEnter = slider
      .enter()
      .append('g')
      .attr('class', 'slider')
      .attr(
        'cursor',
        orientation === top || orientation === bottom
          ? 'ew-resize'
          : 'ns-resize'
      )
      .call(
        drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    sliderEnter
      .append('line')
      .attr('class', 'track')
      .attr(x + '1', scale.range()[0] - SLIDER_END_PADDING)
      .attr('stroke', '#bbb')
      .attr('stroke-width', 6)
      .attr('stroke-linecap', 'round');

    sliderEnter
      .append('line')
      .attr('class', 'track-inset')
      .attr(x + '1', scale.range()[0] - SLIDER_END_PADDING)
      .attr('stroke', '#eee')
      .attr('stroke-width', 4)
      .attr('stroke-linecap', 'round');

    if (fill) {
      sliderEnter
        .append('line')
        .attr('class', 'track-fill')
        .attr(x + '1', scale.range()[0] - SLIDER_END_PADDING)
        .attr('stroke', fill)
        .attr('stroke-width', 4)
        .attr('stroke-linecap', 'round');
    }

    sliderEnter
      .append('line')
      .attr('class', 'track-overlay')
      .attr(x + '1', scale.range()[0] - SLIDER_END_PADDING)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 40)
      .attr('stroke-linecap', 'round')
      .merge(slider.select('.track-overlay'));

    var handleEnter = sliderEnter
      .append('g')
      .attr('class', 'parameter-value')
      .attr('transform', transformAlong(scale(value)))
      .attr('font-family', 'sans-serif')
      .attr(
        'text-anchor',
        orientation === right
          ? 'start'
          : orientation === left
          ? 'end'
          : 'middle'
      );

    handleEnter
      .append('path')
      .attr('transform', 'rotate(' + (orientation + 1) * 90 + ')')
      .attr('d', handle)
      .attr('fill', 'white')
      .attr('stroke', '#777');

    if (displayValue) {
      handleEnter
        .append('text')
        .attr('font-size', 10) // TODO: Remove coupling to font-size in d3-axis
        .attr(y, k * 27)
        .attr(
          'dy',
          orientation === top
            ? '0em'
            : orientation === bottom
            ? '.71em'
            : '.32em'
        )
        .text(tickFormat(value));
    }

    context
      .select('.track')
      .attr(x + '2', scale.range()[1] + SLIDER_END_PADDING);

    context
      .select('.track-inset')
      .attr(x + '2', scale.range()[1] + SLIDER_END_PADDING);

    if (fill) {
      context.select('.track-fill').attr(x + '2', scale(value));
    }

    context
      .select('.track-overlay')
      .attr(x + '2', scale.range()[1] + SLIDER_END_PADDING);

    context.select('.axis').call(
      axisFunction(scale)
        .tickFormat(tickFormat)
        .ticks(ticks)
        .tickValues(tickValues)
    );

    // https://bl.ocks.org/mbostock/4323929
    selection
      .select('.axis')
      .select('.domain')
      .remove();

    context.select('.axis').attr('transform', transformAcross(k * 7));

    context
      .selectAll('.axis text')
      .attr('fill', '#aaa')
      .attr(y, k * 20)
      .attr(
        'dy',
        orientation === top ? '0em' : orientation === bottom ? '.71em' : '.32em'
      )
      .attr(
        'text-anchor',
        orientation === right
          ? 'start'
          : orientation === left
          ? 'end'
          : 'middle'
      );

    context.selectAll('.axis line').attr('stroke', '#aaa');

    context
      .select('.parameter-value')
      .attr('transform', transformAlong(scale(value)));

    fadeTickText();

    function dragstarted() {
      select(this).classed('active', true);

      var pos = identityClamped(
        orientation === bottom || orientation === top ? event.x : event.y
      );

      var newValue = alignedValue(scale.invert(pos));

      updateHandle(newValue);
      listeners.call('start', slider, newValue);
      updateValue(newValue, true);
    }

    function dragged() {
      var pos = identityClamped(
        orientation === bottom || orientation === top ? event.x : event.y
      );
      var newValue = alignedValue(scale.invert(pos));

      updateHandle(newValue);
      listeners.call('drag', slider, newValue);
      updateValue(newValue, true);
    }

    function dragended() {
      select(this).classed('active', false);
      var pos = identityClamped(
        orientation === bottom || orientation === top ? event.x : event.y
      );
      var newValue = alignedValue(scale.invert(pos));

      updateHandle(newValue);
      listeners.call('end', slider, newValue);
      updateValue(newValue, true);
    }

    textSelection = selection.select('.parameter-value text');
    handleSelection = selection.select('.parameter-value');
    fillSelection = selection.select('.track-fill');
  }

  function fadeTickText() {
    if (displayValue) {
      var distances = [];

      selection.selectAll('.axis .tick').each(function(d) {
        distances.push(Math.abs(d - value));
      });

      var index = scan(distances);

      selection.selectAll('.axis .tick text').attr('opacity', function(d, i) {
        return i === index ? 0 : 1;
      });
    }
  }

  function alignedValue(newValue) {
    if (step) {
      var valueModStep = (newValue - domain[0]) % step;
      var alignValue = newValue - valueModStep;

      if (valueModStep * 2 > step) {
        alignValue += step;
      }

      return newValue instanceof Date ? new Date(alignValue) : alignValue;
    }

    if (marks) {
      var index = scan(
        marks.map(function(d) {
          return Math.abs(newValue - d);
        })
      );

      return marks[index];
    }

    return newValue;
  }

  function updateValue(newValue, notifyListener) {
    if (value !== newValue) {
      value = newValue;

      if (notifyListener) {
        listeners.call('onchange', slider, newValue);
      }

      fadeTickText();
    }
  }

  function updateHandle(newValue, animate) {
    animate = typeof animate !== 'undefined' ? animate : false;

    if (animate) {
      handleSelection
        .transition()
        .ease(easeQuadOut)
        .duration(UPDATE_DURATION)
        .attr('transform', transformAlong(scale(newValue)));

      if (fill) {
        fillSelection
          .transition()
          .ease(easeQuadOut)
          .duration(UPDATE_DURATION)
          .attr(x + '1', scale(newValue));
      }
    } else {
      handleSelection.attr('transform', transformAlong(scale(newValue)));

      if (fill) {
        fillSelection.attr(x + '2', scale(newValue));
      }
    }

    if (displayValue) {
      textSelection.text(displayFormat(newValue));
    }
  }

  slider.min = function(_) {
    if (!arguments.length) return domain[0];
    domain[0] = _;
    return slider;
  };

  slider.max = function(_) {
    if (!arguments.length) return domain[1];
    domain[1] = _;
    return slider;
  };

  slider.domain = function(_) {
    if (!arguments.length) return domain;
    domain = _;
    return slider;
  };

  slider.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return slider;
  };

  slider.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return slider;
  };

  slider.tickFormat = function(_) {
    if (!arguments.length) return tickFormat;
    tickFormat = _;
    return slider;
  };

  slider.displayFormat = function(_) {
    if (!arguments.length) return displayFormat;
    displayFormat = _;
    return slider;
  };

  slider.ticks = function(_) {
    if (!arguments.length) return ticks;
    ticks = _;
    return slider;
  };

  slider.value = function(_) {
    if (!arguments.length) return value;
    var pos = identityClamped(scale(_));
    var newValue = alignedValue(scale.invert(pos));

    updateHandle(newValue, true);
    updateValue(newValue, true);

    return slider;
  };

  slider.silentValue = function(_) {
    if (!arguments.length) return value;
    var pos = identityClamped(scale(_));
    var newValue = alignedValue(scale.invert(pos));

    updateHandle(newValue, false);
    updateValue(newValue, false);

    return slider;
  };

  slider.default = function(_) {
    if (!arguments.length) return defaultValue;
    defaultValue = _;
    value = _;
    return slider;
  };

  slider.step = function(_) {
    if (!arguments.length) return step;
    step = _;
    return slider;
  };

  slider.tickValues = function(_) {
    if (!arguments.length) return tickValues;
    tickValues = _;
    return slider;
  };

  slider.marks = function(_) {
    if (!arguments.length) return marks;
    marks = _;
    return slider;
  };

  slider.handle = function(_) {
    if (!arguments.length) return handle;
    handle = _;
    return slider;
  };

  slider.displayValue = function(_) {
    if (!arguments.length) return displayValue;
    displayValue = _;
    return slider;
  };

  slider.fill = function(_) {
    if (!arguments.length) return fill;
    fill = _;
    return slider;
  };

  slider.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? slider : value;
  };

  return slider;
}

export function sliderHorizontal(scale) {
  return slider(bottom, scale);
}

export function sliderVertical(scale) {
  return slider(left, scale);
}

export function sliderTop(scale) {
  return slider(top, scale);
}

export function sliderRight(scale) {
  return slider(right, scale);
}

export function sliderBottom(scale) {
  return slider(bottom, scale);
}

export function sliderLeft(scale) {
  return slider(left, scale);
}
