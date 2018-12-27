var tape = require('tape');
var jsdom = require('jsdom');
var fs = require('fs');
var path = require('path');
d3 = Object.assign({}, require('d3-selection'), require('../'));

tape('sliderHorizontal() has the expected defaults', function(test) {
  var s = d3.sliderHorizontal();
  test.equal(s.tickFormat(), null);
  test.end();
});

tape('slider.min(value), slider.max(value) set the expected values', function(
  test
) {
  var s = d3
    .sliderHorizontal()
    .min(100)
    .max(200);
  test.equal(s.min(), 100);
  test.equal(s.max(), 200);
  test.deepEqual(s.domain(), [100, 200]);
  test.end();
});

tape('slider.domain([min,max]) sets the expected values', function(test) {
  var s = d3.sliderHorizontal().domain([100, 200]);
  test.deepEqual(s.domain(), [100, 200]);
  test.equal(s.min(), 100);
  test.equal(s.max(), 200);
  test.end();
});

tape('slider.default(value) sets the default value', function(test) {
  var s = d3.sliderHorizontal().default(10);
  test.equal(s.value(), 10);
  test.equal(s.default(), 10);
  test.end();
});

tape('slider.default(value) sets the default range', function(test) {
  var s = d3.sliderHorizontal().default([4, 8]);
  test.deepEqual(s.value(), [4, 8]);
  test.deepEqual(s.default(), [4, 8]);
  test.end();
});

tape('sliderVertical(selection) produces the expected result', function(test) {
  var bodyActual = new jsdom.JSDOM('<!DOCTYPE html><svg><g></g></svg>').window
    .document.body;
  var bodyExpected = new jsdom.JSDOM(file('slider-horizontal.html')).window
    .document.body;

  d3.select(bodyActual)
    .select('g')
    .call(d3.sliderHorizontal());

  test.equal(bodyActual.outerHTML, bodyExpected.outerHTML);
  test.end();
});

tape('sliderHorizontal(selection) produces the expected result', function(
  test
) {
  var bodyActual = new jsdom.JSDOM('<!DOCTYPE html><svg><g></g></svg>').window
    .document.body;
  var bodyExpected = new jsdom.JSDOM(file('slider-vertical.html')).window
    .document.body;

  d3.select(bodyActual)
    .select('g')
    .call(d3.sliderVertical());

  test.equal(bodyActual.outerHTML, bodyExpected.outerHTML);
  test.end();
});

function file(file) {
  return fs
    .readFileSync(path.join(__dirname, file), 'utf8')
    .replace(/\n\s*/gm, '');
}
