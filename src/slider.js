import { scan } from "d3-array";
import { axisBottom } from "d3-axis";
import { dispatch } from "d3-dispatch";
import { drag } from "d3-drag";
import { easeQuadOut } from "d3-ease";
import { scaleLinear, scaleTime } from "d3-scale";
import { event, select } from "d3-selection";

var UPDATE_DURATION = 200;

function slider() {
  var value = 0;
  var defaultValue = 0;
  var domain = [0, 10];
  var width = 100;
  var displayValue = true;
  var handle = "M-5.5,-5.5v10l6,5.5l6,-5.5v-10z";
  var step = null;
  var tickValues = null;
  var marks = null;
  var tickFormat = null;
  var ticks = null;

  var listeners = dispatch("onchange", "start", "end", "drag");

  var selection = null;
  var scale = null;
  var identityClamped = null;

  function slider(context) {
    selection = context.selection ? context.selection() : context;

    scale = domain[0] instanceof Date ? scaleTime() : scaleLinear();

    scale = scale
      .domain(domain)
      .range([0, width])
      .clamp(true);

    identityClamped = scaleLinear()
      .range(scale.range())
      .domain(scale.range())
      .clamp(true);

    tickFormat = tickFormat || scale.tickFormat();

    var axis = selection.selectAll(".axis").data([null]);

    axis
      .enter()
      .append("g")
      .attr("transform", "translate(0,7)")
      .attr("class", "axis");

    var slider = selection.selectAll(".slider").data([null]);

    var sliderEnter = slider
      .enter()
      .append("g")
      .attr("class", "slider")
      .attr("cursor", "ew-resize")
      .attr("transform", "translate(0,0)")
      .call(
        drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    sliderEnter
      .append("line")
      .attr("class", "track")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "#bbb")
      .attr("stroke-width", 6)
      .attr("stroke-linecap", "round");

    sliderEnter
      .append("line")
      .attr("class", "track-inset")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "#eee")
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round");

    sliderEnter
      .append("line")
      .attr("class", "track-overlay")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "transparent")
      .attr("stroke-width", 40)
      .attr("stroke-linecap", "round")
      .merge(slider.select(".track-overlay"));

    var handleEnter = sliderEnter
      .append("g")
      .attr("class", "parameter-value")
      .attr("transform", "translate(" + scale(value) + ",0)")
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");

    handleEnter
      .append("path")
      .attr("d", handle)
      .attr("fill", "white")
      .attr("stroke", "#777");

    if (displayValue) {
      handleEnter
        .append("text")
        .attr("font-size", 10)
        .attr("y", 27)
        .attr("dy", ".71em")
        .text(tickFormat(value));
    }

    context.select(".track").attr("x2", scale.range()[1]);
    context.select(".track-inset").attr("x2", scale.range()[1]);
    context.select(".track-overlay").attr("x2", scale.range()[1]);

    context.select(".axis").call(
      axisBottom(scale)
        .tickFormat(tickFormat)
        .ticks(ticks)
        .tickValues(tickValues)
    );

    // https://bl.ocks.org/mbostock/4323929
    selection
      .select(".axis")
      .select(".domain")
      .remove();

    context.select(".axis").attr("transform", "translate(0,7)");

    context
      .selectAll(".axis text")
      .attr("fill", "#aaa")
      .attr("y", 20)
      .attr("dy", ".71em")
      .attr("text-anchor", "middle");

    context.selectAll(".axis line").attr("stroke", "#aaa");

    context
      .select(".parameter-value")
      .attr("transform", "translate(" + scale(value) + ",0)");

    fadeTickText();

    function dragstarted() {
      select(this).classed("active", true);
      var pos = identityClamped(event.x);
      var newValue = alignedValue(scale.invert(pos));

      updateHandle(newValue);
      listeners.call("start", slider, newValue);
      updateValue(newValue);
    }

    function dragged() {
      var pos = identityClamped(event.x);
      var newValue = alignedValue(scale.invert(pos));

      updateHandle(newValue);
      listeners.call("drag", slider, newValue);
      updateValue(newValue);
    }

    function dragended() {
      select(this).classed("active", false);
      var pos = identityClamped(event.x);
      var newValue = alignedValue(scale.invert(pos));

      updateHandle(newValue);
      listeners.call("end", slider, newValue);
      updateValue(newValue);
    }
  }

  function fadeTickText() {
    if (displayValue) {
      var distances = [];

      selection.selectAll(".axis .tick").each(function(d) {
        distances.push(Math.abs(d - value));
      });

      var index = scan(distances);

      selection.selectAll(".axis .tick text").attr("opacity", function(d, i) {
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

  function updateValue(newValue) {
    if (value !== newValue) {
      value = newValue;
      listeners.call("onchange", slider, newValue);
      fadeTickText();
    }
  }

  function updateHandle(newValue, animate) {
    animate = typeof animate !== "undefined" ? animate : false;

    var handleSelection = selection.select(".parameter-value");

    if (animate) {
      handleSelection = handleSelection
        .transition()
        .ease(easeQuadOut)
        .duration(UPDATE_DURATION);
    }

    handleSelection.attr("transform", "translate(" + scale(newValue) + ",0)");

    if (displayValue) {
      selection.select(".parameter-value text").text(tickFormat(newValue));
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

  slider.tickFormat = function(_) {
    if (!arguments.length) return tickFormat;
    tickFormat = _;
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
    updateValue(newValue);

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

  slider.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? slider : value;
  };

  return slider;
}

export function sliderHorizontal() {
  return slider();
}
