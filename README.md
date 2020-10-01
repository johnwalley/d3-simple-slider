# d3-simple-slider

[![npm](https://img.shields.io/npm/v/d3-simple-slider.svg)](https://npmjs.com/package/d3-simple-slider)
[![Build Status](https://travis-ci.org/johnwalley/d3-simple-slider.svg?branch=master)](https://travis-ci.org/johnwalley/d3-simple-slider)
![](https://github.com/johnwalley/d3-simple-slider/workflows/Node%20CI/badge.svg)

Render a simple interactive slider using SVG.

![d3-simple-slider](https://user-images.githubusercontent.com/981531/32612807-1b4bc7d0-c561-11e7-95cf-1af7c10788d2.gif)

Examples:

- [Storybook](https://d3-simple-slider.mulberryhousesoftware.com)
- [Bl.ocks.org](https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518)

Inspired by The New York Times [Is It Better to Rent or Buy?](https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html)

## Why use d3-simple-slider?

If you need to include a slider within an svg element this is for you. For example, use a slider in place of an axis in a chart.

If you don't need to work inside an svg element then I would consider using one of the many excellent html-based components which may be better suited to your needs. Of course you might just love using d3!

## Installing

There are three ways to use this library.

### Include the file directly

You must include the [d3 library](http://d3js.org/) before including the slider file. Then you can add the [compiled js file](https://github.com/johnwalley/d3-simple-slider/releases/latest/download/d3-simple-slider.zip) to your website.

The d3-simple-slider functionality is added to the `d3` global object.

```html
<script src="./d3.v6.js"></script>
<script src="./d3-simple-slider.js"></script>

<p id="value"></p>
<div id="slider"></div>

<script>
  var slider = d3
    .sliderHorizontal()
    .min(0)
    .max(10)
    .step(1)
    .width(300)
    .displayValue(false)
    .on('onchange', (val) => {
      d3.select('#value').text(val);
    });

  d3.select('#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider);
</script>
```

### Using a CDN

You can add the latest version of [d3-simple-slider hosted on unpkg](https://unpkg.com/d3-simple-slider).

The d3-simple-slider functionality is added to the `d3` global object.

```html
<script src="https://d3js.org/d3.v6.js"></script>
<script src="https://unpkg.com/d3-simple-slider"></script>

<p id="value"></p>
<div id="slider"></div>

<script>
  var slider = d3
    .sliderHorizontal()
    .min(0)
    .max(10)
    .step(1)
    .width(300)
    .displayValue(false)
    .on('onchange', (val) => {
      d3.select('#value').text(val);
    });

  d3.select('#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider);
</script>
```

### Using npm or yarn

You can add d3-simple-slider as a node module by running

```node
npm install d3-simple-slider
```

or

```node
yarn add d3-simple-slider
```

You can then import any of the exported functions: `sliderHorizontal`, `sliderVertical`, `sliderTop`, `sliderRight`, `sliderBottom`, `sliderLeft`.

```js
import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';

const div = document.createElement('div');
const slider = sliderBottom().min(0).max(10).step(1).width(300);

const g = d3
  .select(div)
  .append('svg')
  .attr('width', 500)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(30,30)');

g.call(slider);
```

## Styling

To change the font size:

```css
.axis text,
.slider text {
  font-size: 18px;
}
```

To change the tick text color:

```css
.axis text {
  fill: red;
}
```

To change the parameter value text color:

```css
.slider text {
  fill: green;
}
```

## API Reference

Regardless of orientation, sliders are always rendered at the origin. To change the position of the slider specify a [transform attribute](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) on the containing element. For example:

```js
d3.select('body')
  .append('svg')
  .attr('width', 1440)
  .attr('height', 30)
  .append('g')
  .attr('transform', 'translate(0,30)')
  .call(slider);
```

The orientation of a slider is fixed; to change the orientation, remove the old slider and create a new slider.

All sliders may take a [scale](https://github.com/d3/d3-scale) as an argument. If _scale_ is specified, the slider will use the scale to render the slider. This must be either [scaleLinear](https://github.com/d3/d3-scale#scaleLinear) or [scaleTime](https://github.com/d3/d3-scale#scaleTime). The domain will be used to calculate minimum and maximum values. The range will be used to calculate the width or height of the slider. This means you do not need to set these if passing a scale.

<a name="sliderHorizontal" href="#sliderHorizontal">#</a> d3.<b>sliderHorizontal</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L827 'Source')

Constructs a new horizontal slider generator. _Note that this is equivalent to [`sliderBottom`](#sliderBottom)._

<a name="sliderVertical" href="#sliderVertical">#</a> d3.<b>sliderVertical</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L832 'Source')

Constructs a new vertical slider generator. _Note that this is equivalent to [`sliderLeft`](#sliderLeft)._

<a name="sliderTop" href="#sliderTop">#</a> d3.<b>sliderTop</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L835 'Source')

Constructs a new horizontal slider generator. Ticks on top.

<a name="sliderRight" href="#sliderRight">#</a> d3.<b>sliderRight</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L839 'Source')

Constructs a new vertical slider generator. Ticks to the right;

<a name="sliderBottom" href="#sliderBottom">#</a> d3.<b>sliderBottom</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L843 'Source')

Constructs a new horizontal slider generator. Ticks on the bottom.

<a name="sliderLeft" href="#sliderLeft">#</a> d3.<b>sliderLeft</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L47 'Source')

Constructs a new vertical slider generator. Ticks to the left;

<a name="_slider" href="#_slider">#</a> <i>slider</i>(<i>context</i>) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L30 'Source')

Render the slider to the given _context_, which may be either a [selection](https://github.com/d3/d3-selection) of SVG containers (either SVG or G elements) or a corresponding [transition](https://github.com/d3/d3-transition).

<a name="slider_ticks" href="#slider_ticks">#</a> <i>slider</i>.<b>ticks</b>([<i>count</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L697 'Source')

To generate twenty ticks:

```js
slider.ticks(20);
```

<a name="slider_tickValues" href="#slider_tickValues">#</a> <i>slider</i>.<b>tickValues</b>([<i>values</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L783 'Source')

If a values array is specified, the specified values are used for ticks rather than using the sliders' automatic tick generator. If values is null, clears any previously-set explicit tick values and reverts back to the sliders' tick generator. If values is not specified, returns the current tick values, which defaults to null. For example, to generate ticks at specific values:

```js
slider.tickValues([1, 2, 3, 5, 8, 13, 21]);
```

<a name="slider_tickPadding" href="#slider_tickPadding">#</a> <i>slider</i>.<b>tickPadding</b>([<i>padding</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L789 'Source')

If _padding_ is specified, sets the padding to the specified value in pixels and returns the axis. If _padding_ is not specified, returns the current padding which defaults to 3 pixels.

<a name="slider_tickFormat" href="#slider_tickFormat">#</a> <i>slider</i>.<b>tickFormat</b>([<i>format</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L685 'Source')

If _format_ is specified, sets the tick format function and returns the slider. If _format_ is not specified, returns the current format function, which defaults to null. A null format indicates that the slider's default formatter should be used.

See [d3-format](https://github.com/d3/d3-format) and [d3-time-format](https://github.com/d3/d3-time-format) for help creating formatters. For example, to display integers with comma-grouping for thousands:

```js
slider.tickFormat(d3.format(',.0f'));
```

<a name="slider_displayFormat" href="#slider_displayFormat">#</a> <i>slider</i>.<b>displayFormat</b>([<i>format</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L691 'Source')

If _format_ is specified, sets the function used to format the highlighted value and returns the slider. If _format_ is not specified, returns the current format function, which defaults to null. A null format indicates that the tickFormat should be used. If tickFormat is null then the slider's default formatter should be used.

See [d3-format](https://github.com/d3/d3-format) and [d3-time-format](https://github.com/d3/d3-time-format) for help creating formatters. For example, to display integers with comma-grouping for thousands:

```js
slider.displayFormat(d3.format(',.0f'));
```

<a name="slider_value" href="#slider_value">#</a> <i>slider</i>.<b>value</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L703 'Source')

If _value_ is specified, sets the value of the slider to the specified value and returns the slider. If _value_ is not specified, returns the current value.

If _value_ is an array of length two then the values represent a range.

<a name="slider_silentValue" href="#slider_silentValue">#</a> <i>slider</i>.<b>silentValue</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L730 'Source')

If _value_ is specified, sets the value of the slider to the specified value and returns the slider _without_ invoking any listeners. If _value_ is not specified, returns the current value.

If _value_ is an array of length two then the values represent a range.

<a name="slider_displayValue" href="#slider_displayValue">#</a> <i>slider</i>.<b>displayValue</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L807 'Source')

If _value_ is specified, sets the whether the highlighted value of the slider should be shown and returns the slider. If _value_ is not specified, returns the current value, which defaults to true.

<a name="slider_handle" href="#slider_handle">#</a> <i>slider</i>.<b>handle</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L801 'Source')

If _value_ is specified, sets the [SVG path definition](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d) used to render the slider handle and returns the slider. If _value_ is not specified, returns the current value, which defaults to 'M-5.5,-5.5v10l6,5.5l6,-5.5v-10z'.

<a name="slider_width" href="#slider_width">#</a> <i>slider</i>.<b>width</b>([<i>size</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L663 'Source')

If _size_ is specified, sets the width of the slider to the specified value and returns the slider. If _size_ is not specified, returns the current width, which defaults to 100. This property only affects horizontal sliders and is ignored otherwise.

<a name="slider_height" href="#slider_height">#</a> <i>slider</i>.<b>height</b>([<i>size</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L674 'Source')

If _size_ is specified, sets the height of the slider to the specified value and returns the slider. If _size_ is not specified, returns the current height, which defaults to 100. This property only affects vertical sliders and is ignored otherwise.

<a name="slider_min" href="#slider_min">#</a> <i>slider</i>.<b>min</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L630 'Source')

If _value_ is specified, sets the minimum value of the slider to the specified value and returns the slider. If _value_ is not specified, returns the current minimum value, which defaults to 0.

<a name="slider_max" href="#slider_max">#</a> <i>slider</i>.<b>max</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L641 'Source')

If _value_ is specified, sets the maximum value of the slider to the specified value and returns the slider. If _value_ is not specified, returns the current maximum value, which defaults to 10.

<a name="slider_domain" href="#slider_domain">#</a> <i>slider</i>.<b>domain</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L652 'Source')

If _value_ is specified, an array which sets the minimum and maximum values of the slider and returns the slider. If _value_ is not specified, returns the current maximum value, which defaults to [0, 10].

<a name="slider_fill" href="#slider_fill">#</a> <i>slider</i>.<b>fill</b>([<i>color</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L813 'Source')

If _color_ is specified, sets the color of the slider track-fill and returns the slider. If _color_ is not specified, returns the current value, which defaults to null.

<a name="slider_step" href="#slider_step">#</a> <i>slider</i>.<b>step</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L777 'Source')

If _value_ is specified, sets the increment which the slider will move in and returns the slider. If _value_ is not specified, returns the current value, which defaults to null.

<a name="slider_marks" href="#slider_marks">#</a> <i>slider</i>.<b>marks</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L795 'Source')

If _value_ is specified, sets the values to which the slider will snap to and returns the slider. If _value_ is not specified, returns the current value, which defaults to null.

<a name="slider_default" href="#slider_default">#</a> <i>slider</i>.<b>default</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L757 'Source')

If _value_ is specified, sets the initial value of the slider and returns the slider. If _value_ is not specified, returns the current value, which defaults to null.

<a href="#slider_on" name="slider_on">#</a> <i>slider</i>.<b>on</b>(<i>typenames</i>, [<i>listener</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/master/src/slider.js#L819 'Source')

If _listener_ is specified, sets the event _listener_ for the specified _typenames_ and returns the slider. If an event listener was already registered for the same type and name, the existing listener is removed before the new listener is added. If _listener_ is null, removes the current event listeners for the specified _typenames_, if any. If _listener_ is not specified, returns the first currently-assigned listener matching the specified _typenames_, if any. When a specified event is dispatched, each _listener_ will be invoked with the same context and arguments as [_selection_.on](https://github.com/d3/d3-selection#selection_on) listeners: the current datum `d` and index `i`, with the `this` context as the current DOM element.

The _typenames_ is a string containing one or more _typename_ separated by whitespace. Each _typename_ is a _type_, optionally followed by a period (`.`) and a _name_, such as `drag.foo` and `drag.bar`; the name allows multiple listeners to be registered for the same _type_. The _type_ must be one of the following:

- `onchange` - after the slider value has changed.
- `start` - after a new pointer becomes active (on mousedown or touchstart).
- `drag` - after an active pointer moves (on mousemove or touchmove).
- `end` - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).

You might consider throttling `onchange` and `drag` events. For example using [`lodash.throttle`](https://lodash.com/docs/4.17.4#throttle).

See [_dispatch_.on](https://github.com/d3/d3-dispatch#dispatch_on) for more.

## 🤝 How to Contribute

Please read the [contribution guidelines for this project](CONTRIBUTING.md)
