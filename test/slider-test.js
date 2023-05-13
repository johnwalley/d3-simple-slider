import assert from 'assert';
import jsdom from 'jsdom';
import { readFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { select } from 'd3-selection';

import * as d3 from '../src/index.js';

it('sliderHorizontal() has the expected defaults', () => {
  const s = d3.sliderHorizontal();
  assert.equal(s.tickFormat(), null);
});

it('slider.min(value), slider.max(value) set the expected values', () => {
  const s = d3.sliderHorizontal().min(100).max(200);
  assert.equal(s.min(), 100);
  assert.equal(s.max(), 200);
  assert.deepEqual(s.domain(), [100, 200]);
});

it('slider.domain([min,max]) sets the expected values', () => {
  const s = d3.sliderHorizontal().domain([100, 200]);
  assert.deepEqual(s.domain(), [100, 200]);
  assert.equal(s.min(), 100);
  assert.equal(s.max(), 200);
});

it('slider.default(value) sets the default value', () => {
  const s = d3.sliderHorizontal().default(10);
  assert.equal(s.value(), 10);
  assert.equal(s.default(), 10);
});

it('slider.default(value) sets the default range', () => {
  const s = d3.sliderHorizontal().default([4, 8]);
  assert.deepEqual(s.value(), [4, 8]);
  assert.deepEqual(s.default(), [4, 8]);
});

it('sliderVertical(selection) produces the expected result', () => {
  const window = new jsdom.JSDOM('<!DOCTYPE html><svg><g></g></svg>').window;
  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js',
  };
  copyProps(window, global);
  const bodyActual = window.document.body;
  const bodyExpected = new jsdom.JSDOM(file('slider-horizontal.html')).window
    .document.body;

  select(bodyActual).select('g').call(d3.sliderHorizontal());

  assert.equal(bodyActual.outerHTML, bodyExpected.outerHTML);
});

it('sliderHorizontal(selection) produces the expected result', () => {
  const window = new jsdom.JSDOM('<!DOCTYPE html><svg><g></g></svg>').window;
  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js',
  };
  copyProps(window, global);
  const bodyActual = window.document.body;
  const bodyExpected = new jsdom.JSDOM(file('slider-vertical.html')).window
    .document.body;

  select(bodyActual).select('g').call(d3.sliderVertical());

  assert.equal(bodyActual.outerHTML, bodyExpected.outerHTML);
});

function file(file) {
  const __dirname = resolve(
    dirname(fileURLToPath(new URL('./test', import.meta.url)))
  );

  return readFileSync(join(__dirname, file), 'utf8').replace(/\n\s*/gm, '');
}

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}
