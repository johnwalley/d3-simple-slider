import assert from 'assert';
import { createRequire } from 'module';
import { readFileSync } from 'fs';

const require = createRequire(import.meta.url);

const expectedExports = [
  'sliderBottom',
  'sliderHorizontal',
  'sliderLeft',
  'sliderRight',
  'sliderTop',
  'sliderVertical',
];

it('package.json main can be required from CommonJS', () => {
  const slider = require('..');
  assert.deepEqual(Object.keys(slider).sort(), expectedExports);
});

it('package.json main can be imported from ES modules', async () => {
  const { main } = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url), 'utf8')
  );
  const slider = await import(new URL(`../${main}`, import.meta.url));
  for (const name of expectedExports) {
    assert.equal(typeof slider[name], 'function', name);
  }
});
