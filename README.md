# d3-simple-slider

[![npm](https://img.shields.io/npm/v/d3-simple-slider.svg)](https://npmjs.com/package/d3-simple-slider)
[![Build status](https://github.com/johnwalley/d3-simple-slider/actions/workflows/nodejs.yml/badge.svg)](https://github.com/johnwalley/d3-simple-slider/actions/workflows/nodejs.yml)

Render a simple interactive slider using SVG.

![d3-simple-slider](https://user-images.githubusercontent.com/981531/32612807-1b4bc7d0-c561-11e7-95cf-1af7c10788d2.gif)

Examples:

- [Storybook](https://d3-simple-slider.netlify.app)
- [Gist](https://gist.github.com/johnwalley/e1d256b81e51da68f7feb632a53c3518)

Inspired by The New York Times [Is It Better to Rent or Buy?](https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html)

## Why use d3-simple-slider?

If you need to include a slider within an SVG element, this is for you. For example, use a slider in place of an axis in a chart.

If you don't need to work inside an SVG element, consider one of the many excellent HTML-based components, which may be better suited to your needs. Of course, you might just love using d3!

## Installing

d3-simple-slider 2.x is built for [d3](https://d3js.org) v7. If you need to support older versions of d3, use [v1.x](https://github.com/johnwalley/d3-simple-slider/tree/v1.10.4).

### Using a CDN or a script tag

Include d3 first, then d3-simple-slider. The slider functions are added to the `d3` global object.

```html
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src="https://cdn.jsdelivr.net/npm/d3-simple-slider@2"></script>

<p id="value"></p>
<div id="slider"></div>

<script>
  const slider = d3
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

The library is also available from [unpkg](https://unpkg.com/d3-simple-slider@2). To host the files yourself, download the [compiled files](https://github.com/johnwalley/d3-simple-slider/releases/latest/download/d3-simple-slider.zip) from the latest release.

### Using npm

```sh
npm install d3-simple-slider
```

You can then import any of the exported functions: `sliderHorizontal`, `sliderVertical`, `sliderTop`, `sliderRight`, `sliderBottom`, `sliderLeft`.

```js
import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';

const slider = sliderBottom().min(0).max(10).step(1).width(300);

d3.select('#slider')
  .append('svg')
  .attr('width', 500)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(30,30)')
  .call(slider);
```

CommonJS (`require('d3-simple-slider')`) is supported on Node.js 20.19+ and 22.12+, because d3's own packages are ES modules.

## Examples

### Range slider

Pass two values to [_slider_.default](#slider_default) or [_slider_.value](#slider_value) to create a slider with two handles. The value is then an array of `[min, max]`.

```js
const slider = d3
  .sliderBottom()
  .min(0)
  .max(10)
  .step(1)
  .width(300)
  .default([2, 8])
  .fill('#2196f3')
  .on('onchange', ([min, max]) => console.log(min, max));
```

### Dates

If the minimum and maximum are dates, the slider uses a [time scale](https://d3js.org/d3-scale/time) and its value is a `Date`. Use [_slider_.marks](#slider_marks) to snap to specific dates, such as the start of each year:

```js
const slider = d3
  .sliderBottom()
  .min(new Date(2000, 0, 1))
  .max(new Date(2020, 0, 1))
  .marks(d3.timeYear.range(new Date(2000, 0, 1), new Date(2021, 0, 1)))
  .tickFormat(d3.timeFormat('%Y'))
  .width(400)
  .default(new Date(2010, 0, 1));
```

### Changing the size

To resize a slider after it has been rendered, update its width (or height) and render it again:

```js
slider.width(newWidth);
g.call(slider);
```

## Styling

The slider is made of SVG elements with these class names, which you can target with CSS:

| Class              | Element                                                               |
| ------------------ | --------------------------------------------------------------------- |
| `.axis`            | The ticks and tick labels                                             |
| `.slider`          | The track and handles. Has the class `.active` while being dragged    |
| `.track`           | The outer line of the track                                           |
| `.track-inset`     | The inner line of the track                                           |
| `.track-fill`      | The filled part of the track, if [_slider_.fill](#slider_fill) is set |
| `.track-overlay`   | An invisible, wider line that makes the track easier to grab          |
| `.parameter-value` | A group containing a handle and its value label                       |
| `.handle`          | A handle                                                              |

For example, to change the font size:

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

To change the color of the value label:

```css
.parameter-value text {
  fill: green;
}
```

To change the color of the handles:

```css
.handle {
  fill: #2196f3;
  stroke: #1565c0;
}
```

To change the shape of the handles, use [_slider_.handle](#slider_handle).

## Keyboard support

Each handle can be focused with the Tab key and moved with the keyboard:

| Key                              | Action                        |
| -------------------------------- | ----------------------------- |
| <kbd>←</kbd> <kbd>↓</kbd>        | Decrease by one step          |
| <kbd>→</kbd> <kbd>↑</kbd>        | Increase by one step          |
| <kbd>Page Down</kbd>             | Decrease by two steps         |
| <kbd>Page Up</kbd>               | Increase by two steps         |
| <kbd>Home</kbd> / <kbd>End</kbd> | Move to the minimum / maximum |

A step is the [_slider_.step](#slider_step) value if set, otherwise 1/100 of the slider's range. If [_slider_.marks](#slider_marks) are set, the keys move between marks instead.

## API Reference

Regardless of orientation, sliders are always rendered at the origin. To change the position of the slider, specify a [transform attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform) on the containing element. For example:

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

All sliders may take a [scale](https://d3js.org/d3-scale) as an argument. If _scale_ is specified, the slider will use the scale to render the slider. This must be either [scaleLinear](https://d3js.org/d3-scale/linear) or [scaleTime](https://d3js.org/d3-scale/time). The domain will be used to calculate minimum and maximum values. The range will be used to calculate the width or height of the slider. This means you do not need to set these if passing a scale.

<a name="sliderHorizontal" href="#sliderHorizontal">#</a> d3.<b>sliderHorizontal</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L859 'Source')

Constructs a new horizontal slider generator. _Note that this is equivalent to [`sliderBottom`](#sliderBottom)._

<a name="sliderVertical" href="#sliderVertical">#</a> d3.<b>sliderVertical</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L863 'Source')

Constructs a new vertical slider generator. _Note that this is equivalent to [`sliderLeft`](#sliderLeft)._

<a name="sliderTop" href="#sliderTop">#</a> d3.<b>sliderTop</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L867 'Source')

Constructs a new horizontal slider generator. Ticks on top.

<a name="sliderRight" href="#sliderRight">#</a> d3.<b>sliderRight</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L871 'Source')

Constructs a new vertical slider generator. Ticks to the right.

<a name="sliderBottom" href="#sliderBottom">#</a> d3.<b>sliderBottom</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L875 'Source')

Constructs a new horizontal slider generator. Ticks on the bottom.

<a name="sliderLeft" href="#sliderLeft">#</a> d3.<b>sliderLeft</b>([<i>scale</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L879 'Source')

Constructs a new vertical slider generator. Ticks to the left.

<a name="_slider" href="#_slider">#</a> <i>slider</i>(<i>context</i>) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L30 'Source')

Render the slider to the given _context_, which may be either a [selection](https://d3js.org/d3-selection) of SVG containers (either SVG or G elements) or a corresponding [transition](https://d3js.org/d3-transition).

<a name="slider_ticks" href="#slider_ticks">#</a> <i>slider</i>.<b>ticks</b>([<i>count</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L729 'Source')

If _count_ is specified, sets the approximate number of ticks and returns the slider. If _count_ is not specified, returns the current count, which defaults to null (the scale's default). For example, to generate twenty ticks:

```js
slider.ticks(20);
```

<a name="slider_tickValues" href="#slider_tickValues">#</a> <i>slider</i>.<b>tickValues</b>([<i>values</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L815 'Source')

If a _values_ array is specified, the specified values are used for ticks rather than using the slider's automatic tick generator. If _values_ is null, clears any previously-set explicit tick values and reverts back to the slider's tick generator. If _values_ is not specified, returns the current tick values, which defaults to null. For example, to generate ticks at specific values:

```js
slider.tickValues([1, 2, 3, 5, 8, 13, 21]);
```

<a name="slider_tickPadding" href="#slider_tickPadding">#</a> <i>slider</i>.<b>tickPadding</b>([<i>padding</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L821 'Source')

If _padding_ is specified, sets the padding to the specified value in pixels and returns the slider. If _padding_ is not specified, returns the current padding, which defaults to 3 pixels.

<a name="slider_tickFormat" href="#slider_tickFormat">#</a> <i>slider</i>.<b>tickFormat</b>([<i>format</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L717 'Source')

If _format_ is specified, sets the tick format function and returns the slider. If _format_ is not specified, returns the current format function, which defaults to null. A null format indicates that the slider's default formatter should be used.

See [d3-format](https://d3js.org/d3-format) and [d3-time-format](https://d3js.org/d3-time-format) for help creating formatters. For example, to display integers with comma-grouping for thousands:

```js
slider.tickFormat(d3.format(',.0f'));
```

<a name="slider_displayFormat" href="#slider_displayFormat">#</a> <i>slider</i>.<b>displayFormat</b>([<i>format</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L723 'Source')

If _format_ is specified, sets the function used to format the value label and returns the slider. If _format_ is not specified, returns the current format function, which defaults to null. A null format indicates that the tick format should be used. If the tick format is also null, the slider's default formatter is used.

See [d3-format](https://d3js.org/d3-format) and [d3-time-format](https://d3js.org/d3-time-format) for help creating formatters. For example, to display integers with comma-grouping for thousands:

```js
slider.displayFormat(d3.format(',.0f'));
```

<a name="slider_value" href="#slider_value">#</a> <i>slider</i>.<b>value</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L735 'Source')

If _value_ is specified, sets the value of the slider, animates the handles to their new position, notifies any `onchange` listeners and returns the slider. Values are clamped to the slider's domain and snapped to the [step](#slider_step) or [marks](#slider_marks), if set. If _value_ is not specified, returns the current value.

If _value_ is an array of length two then the values represent a range.

<a name="slider_silentValue" href="#slider_silentValue">#</a> <i>slider</i>.<b>silentValue</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L762 'Source')

Like [_slider_.value](#slider_value), but sets the value _without_ animating the handles or invoking any listeners. This is useful when keeping a slider in sync with other state, where notifying listeners could cause an infinite loop. If _value_ is not specified, returns the current value.

If _value_ is an array of length two then the values represent a range.

<a name="slider_displayValue" href="#slider_displayValue">#</a> <i>slider</i>.<b>displayValue</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L839 'Source')

If _value_ is specified, sets whether the value label is shown next to the handle, in place of the nearest tick label, and returns the slider. If _value_ is not specified, returns the current value, which defaults to true.

<a name="slider_handle" href="#slider_handle">#</a> <i>slider</i>.<b>handle</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L833 'Source')

If _value_ is specified, sets the [SVG path definition](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d) used to render the slider handle and returns the slider. If _value_ is not specified, returns the current value, which defaults to 'M-5.5,-5.5v10l6,5.5l6,-5.5v-10z'.

<a name="slider_width" href="#slider_width">#</a> <i>slider</i>.<b>width</b>([<i>size</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L695 'Source')

If _size_ is specified, sets the width of the slider to the specified value and returns the slider. If _size_ is not specified, returns the current width, which defaults to 100. This property only affects horizontal sliders and is ignored otherwise.

<a name="slider_height" href="#slider_height">#</a> <i>slider</i>.<b>height</b>([<i>size</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L706 'Source')

If _size_ is specified, sets the height of the slider to the specified value and returns the slider. If _size_ is not specified, returns the current height, which defaults to 100. This property only affects vertical sliders and is ignored otherwise.

<a name="slider_min" href="#slider_min">#</a> <i>slider</i>.<b>min</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L662 'Source')

If _value_ is specified, sets the minimum value of the slider to the specified value and returns the slider. If _value_ is not specified, returns the current minimum value, which defaults to 0.

<a name="slider_max" href="#slider_max">#</a> <i>slider</i>.<b>max</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L673 'Source')

If _value_ is specified, sets the maximum value of the slider to the specified value and returns the slider. If _value_ is not specified, returns the current maximum value, which defaults to 10.

<a name="slider_domain" href="#slider_domain">#</a> <i>slider</i>.<b>domain</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L684 'Source')

If _value_ is specified, sets the minimum and maximum values of the slider from a two-element array and returns the slider. If _value_ is not specified, returns the current domain, which defaults to [0, 10].

<a name="slider_fill" href="#slider_fill">#</a> <i>slider</i>.<b>fill</b>([<i>color</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L845 'Source')

If _color_ is specified, sets the color of the track fill and returns the slider. For a single-handle slider the fill runs from the minimum to the handle; for a range slider it runs between the two handles. If _color_ is not specified, returns the current value, which defaults to null (no fill).

<a name="slider_step" href="#slider_step">#</a> <i>slider</i>.<b>step</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L809 'Source')

If _value_ is specified, sets the increment, counted from the minimum, in which the slider moves and returns the slider. If _value_ is not specified, returns the current value, which defaults to null.

<a name="slider_marks" href="#slider_marks">#</a> <i>slider</i>.<b>marks</b>([<i>values</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L827 'Source')

If _values_ is specified, sets the values to which the slider will snap and returns the slider. Marks take precedence over [_slider_.step](#slider_step). If _values_ is not specified, returns the current marks, which defaults to null.

<a name="slider_default" href="#slider_default">#</a> <i>slider</i>.<b>default</b>([<i>value</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L789 'Source')

If _value_ is specified, sets the initial value of the slider and returns the slider. Pass an array of two values to create a range slider. If _value_ is not specified, returns the default value, which defaults to 0.

<a href="#slider_on" name="slider_on">#</a> <i>slider</i>.<b>on</b>(<i>typenames</i>, [<i>listener</i>]) [<>](https://github.com/johnwalley/d3-simple-slider/blob/v2.1.0/src/slider.js#L851 'Source')

If _listener_ is specified, sets the event _listener_ for the specified _typenames_ and returns the slider. If an event listener was already registered for the same type and name, the existing listener is removed before the new listener is added. If _listener_ is null, removes the current event listeners for the specified _typenames_, if any. If _listener_ is not specified, returns the first currently-assigned listener matching the specified _typenames_, if any.

When a specified event is dispatched, each _listener_ is invoked with the slider's value: a number (or `Date`) for a single-handle slider, or a two-element array for a range slider.

The _typenames_ is a string containing one or more _typename_ separated by whitespace. Each _typename_ is a _type_, optionally followed by a period (`.`) and a _name_, such as `drag.foo` and `drag.bar`; the name allows multiple listeners to be registered for the same _type_. The _type_ must be one of the following:

- `onchange` - after the slider value has changed, whether by dragging, the keyboard or [_slider_.value](#slider_value).
- `start` - after a new pointer becomes active (on mousedown or touchstart).
- `drag` - after an active pointer moves (on mousemove or touchmove).
- `end` - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).

You might consider throttling `onchange` and `drag` events. For example using [`lodash.throttle`](https://lodash.com/docs#throttle).

See [_dispatch_.on](https://d3js.org/d3-dispatch#dispatch_on) for more.

## 🤝 How to Contribute

Please read the [contribution guidelines for this project](CONTRIBUTING.md).

To work on the library locally:

```sh
npm install
npm test          # build, run the tests and lint
npm run storybook # run the examples at http://localhost:6006
```
