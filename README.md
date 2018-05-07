# d3-simple-slider

[![Build Status](https://travis-ci.org/johnwalley/d3-simple-slider.svg?branch=master)](https://travis-ci.org/johnwalley/d3-simple-slider)

Render a simple interactive slider using SVG.

![d3-simple-slider](https://user-images.githubusercontent.com/981531/32612807-1b4bc7d0-c561-11e7-95cf-1af7c10788d2.gif)

[Live demo](https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518)

Inspired by The New York Times [Is It Better to Rent or Buy?](https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html)

## Installing

If you use NPM, `npm install d3-simple-slider`. Otherwise, download the [latest release](https://github.com/johnwalley/d3-simple-slider/releases/latest). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://d3js.org/d3.v4.js"></script>
<script src="https://unpkg.com/d3-simple-slider"></script>

<p id="value"></p>
<div id="slider"></div>

<script>
  var slider = d3.sliderHorizontal()
    .min(0)
    .max(10)
    .step(1)
    .width(300)
    .displayValue(false)
    .on('onchange', val => {
      d3.select("#value").text(val);
    });

  d3.select("#slider").append("svg")
    .attr("width", 500)
    .attr("height", 100)
    .append("g")
    .attr("transform", "translate(30,30)")
    .call(slider);
</script>
```

## API Reference

Regardless of orientation, sliders are always rendered at the origin. To change the position of the slider specify a [transform attribute](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) on the containing element. For example:

```js
d3
  .select('body')
  .append('svg')
  .attr('width', 1440)
  .attr('height', 30)
  .append('g')
  .attr('transform', 'translate(0,30)')
  .call(slider);
```

The orientation of a slider is fixed; to change the orientation, remove the old slider and create a new slider.

<a name="sliderHorizontal" href="#sliderHorizontal">#</a> d3.<b>sliderHorizontal</b>() [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L353 'Source')

Constructs a new horizontal slider generator.

<a name="sliderVertical" href="#sliderVertical">#</a> d3.<b>sliderVertical</b>() [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L353 'Source')

Constructs a new vertical slider generator. _Note this function is not yet implemented_.

<a name="_slider" href="#_slider">#</a> <i>slider</i>(<i>context</i>) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L30 'Source')

Render the slider to the given _context_, which may be either a [selection](https://github.com/d3/d3-selection) of SVG containers (either SVG or G elements) or a corresponding [transition](https://github.com/d3/d3-transition).

<a name="slider_ticks" href="#slider_ticks">#</a> <i>slider</i>.<b>ticks</b>(<i>count</i>) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L291 'Source')

To generate twenty ticks:

```js
slider.ticks(20);
```

<a name="slider_tickFormat" href="#slider_tickFormat">#</a> <i>slider</i>.<b>tickFormat</b>([<i>format</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L285 'Source')

If _format_ is specified, sets the tick format function and returns the slider. If _format_ is not specified, returns the current format function, which defaults to null. A null format indicates that the slider's default formatter should be used.

See [d3-format](https://github.com/d3/d3-format) and [d3-time-format](https://github.com/d3/d3-time-format) for help creating formatters. For example, to display integers with comma-grouping for thousands:

```js
slider.tickFormat(d3.format(',.0f'));
```

<a name="slider_width" href="#slider_width">#</a> <i>slider</i>.<b>width</b>([<i>size</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L279 'Source')

If _size_ is specified, sets the width of the slider to the specified value and returns the slider. If _size_ is not specified, returns the current width, which defaults to 100.

<a name="slider_min" href="#slider_min">#</a> <i>slider</i>.<b>min</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L261 'Source')

If _value_ is specified, sets the minimum value of the slider to the specified value and returns the slider. If _value_ is not specified, returns the current minimum value, which defaults to 0.

<a name="slider_max" href="#slider_max">#</a> <i>slider</i>.<b>max</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L267 'Source')

If _value_ is specified, sets the maximum value of the slider to the specified value and returns the slider. If _value_ is not specified, returns the current maximum value, which defaults to 10.

<a href="#slider_on" name="slider_on">#</a> <i>slider</i>.<b>on</b>(<i>typenames</i>, [<i>listener</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L345 'Source')

If _listener_ is specified, sets the event _listener_ for the specified _typenames_ and returns the slider. If an event listener was already registered for the same type and name, the existing listener is removed before the new listener is added. If _listener_ is null, removes the current event listeners for the specified _typenames_, if any. If _listener_ is not specified, returns the first currently-assigned listener matching the specified _typenames_, if any. When a specified event is dispatched, each _listener_ will be invoked with the same context and arguments as [_selection_.on](https://github.com/d3/d3-selection#selection_on) listeners: the current datum `d` and index `i`, with the `this` context as the current DOM element.

The _typenames_ is a string containing one or more _typename_ separated by whitespace. Each _typename_ is a _type_, optionally followed by a period (`.`) and a _name_, such as `drag.foo` and `drag.bar`; the name allows multiple listeners to be registered for the same _type_. The _type_ must be one of the following:

* `onchange` - after the slider value has changed.
* `start` - after a new pointer becomes active (on mousedown or touchstart).
* `drag` - after an active pointer moves (on mousemove or touchmove).
* `end` - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).

You might consider throttling `onchange` and `drag` events. For example using [`lodash.throttle`](https://lodash.com/docs/4.17.4#throttle).

See [_dispatch_.on](https://github.com/d3/d3-dispatch#dispatch_on) for more.
