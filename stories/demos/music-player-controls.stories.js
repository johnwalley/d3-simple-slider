import './music-player-controls.css';

import { extent, range } from 'd3-array';
import { symbol, symbolCircle } from 'd3-shape';

/*eslint-env browser*/
import { format } from 'd3-format';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { sliderBottom } from '../../src';

export default {
  title: 'Demos/Music Player Controls',
};

const timeFormat = (seconds) => {
  return `${Math.floor(seconds / 60)}:${format('02')(seconds % 60)}`;
};

export const Demo = () => {
  const playerControlsDiv = window.document.createElement('div');
  playerControlsDiv.classList.add('player-controls');

  const playerControlsButtonsDiv = window.document.createElement('div');
  playerControlsButtonsDiv.classList.add('player-controls__buttons');
  playerControlsDiv.append(playerControlsButtonsDiv);

  const playbackBarDiv = window.document.createElement('div');
  playbackBarDiv.classList.add('playback-bar');
  playerControlsDiv.append(playbackBarDiv);

  let isPlaying = false;
  let position = 0;
  let intervalID;

  select(playerControlsButtonsDiv)
    .append('button')
    .attr('class', 'control-button skip-back')
    .on('click', () => {
      position = 0;
      draw();
    });

  const playButton = select(playerControlsButtonsDiv)
    .append('button')
    .attr('class', 'control-button pause')
    .on('click', () => {
      if (isPlaying) {
        clearInterval(intervalID);
        isPlaying = false;
        draw();
      } else {
        intervalID = window.setInterval(() => {
          position++;
          draw();
        }, 1000);

        isPlaying = true;
        draw();
      }
    });

  select(playerControlsButtonsDiv)
    .append('button')
    .attr('class', 'control-button skip-forward')
    .on('click', () => {
      position = data[data.length - 1];
      draw();
    });

  const width = 565;
  const height = 12;
  const margin = { top: 0, right: 8, bottom: 0, left: 8 };

  const data = range(0, 186);

  const timestamp = select(playbackBarDiv)
    .append('text')
    .attr('class', 'playback-bar__progress-time');

  const svg = select(playbackBarDiv)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  select(playbackBarDiv)
    .append('text')
    .attr('class', 'playback-bar__progress-time')
    .text(timeFormat(data[data.length - 1]));

  const xLinear = scaleLinear()
    .domain(extent(data))
    .range([margin.left, width - margin.right]);

  const slider = sliderBottom(xLinear)
    .step(1)
    .ticks(0)
    .displayValue(false)
    .fill('#1db954')
    .default(position)
    .handle(symbol().type(symbolCircle).size(100)())
    .on('onchange', (value) => {
      position = value;
      draw();
    });

  const g = svg.append('g').attr('transform', `translate(0,${height / 2})`);

  g.call(slider);

  const draw = () => {
    g.call(slider.value(position));

    playButton.classed('pause', isPlaying).classed('play', !isPlaying);
    timestamp.text(timeFormat(position));
  };

  draw(position);

  return playerControlsDiv;
};
