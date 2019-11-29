import { State } from './State';
import { SYMBOLS, KEYMAP } from './constants';
import { EVENTS_ENUM } from './events';

const renderGrid = grid => {
  const html = grid.reduce((accHtml, row) => {
    const rowHtml = row.reduce((accRow, cell) => `${accRow}${SYMBOLS[cell]}`, '');
    return `${accHtml}${rowHtml}\n`;
  }, '');

  return `<pre><code>${html}</code></pre>`;
};

const dom = document.querySelector('.grid');

const initKeyListeners = condition => cb => {
  document.addEventListener('keydown', e => {
    if (condition(e)) {
      cb(e);
    }
  });
};

const initGame = () => {
  const state = new State();

  state.subscribe(EVENTS_ENUM.tick, grid => {
    dom.innerHTML = renderGrid(grid);
  });

  initKeyListeners(e => KEYMAP[e.code])(e =>
    state.emit(EVENTS_ENUM.keyPressEvent, KEYMAP[e.code]),
  );
};

initGame();
