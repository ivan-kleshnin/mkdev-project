import { State } from './State';
import { SYMBOLS, KEYMAP } from './constants';
import { rotateMatrix } from './rotateMatrix';
import { isGameLost } from './isGameLost';
import { createTick } from './streams';
import { checkPosition, checkCollision } from './utils';
import { renderDom, renderGrid } from './render';

const pause = (tick$, tickEvent) => {
  let play = true;
  document.addEventListener('keydown', e => {
    if (e.code !== 'Space') return;
    if (play) {
      tick$.unsubscribe(tickEvent);
      play = false;
    } else {
      tick$.subscribe(tickEvent);
      play = true;
    }
  });
};

const initKeyDownListeners = condition => cb => {
  document.addEventListener('keydown', e => {
    if (condition(e)) {
      cb(e);
    }
  });
};

const enqueue = (state, move) => {

  return !checkCollision(state.grid,state.figure, state.grid) ?
};

const createHandleKeyDown = state => e => {
  const code = e.code;

  const reducer = (state, code) => {
    switch (code) {
      case 'ArrowUp':
        const figure = { ...state.figure, figure: rotateMatrix(state.figure) };
        if (!checkCollision(state.grid, { ...state.figure, figure })) {
          return { ...state, figure: { ...state.figure, figure } };
        }
        return state;
      case 'ArrowRight':
        if (!checkCollision(state.grid, state.figure, state.grid)) {
          return {
            ...state,
            figure: {
              ...state.figure,
              coords: { ...state.coords, x: state.coords.x + 1 },
            },
          };
        }
        return state;
      case 'ArrowLeft':
        if (!checkCollision(state.grid, state.figure, state.grid)) {
          return {
            ...state,
            figure: {
              ...state.figure,
              coords: { ...state.coords, x: state.coords.x - 1 },
            },
          };
        }
        return state;
      default:
        return state;
    }
  };

  state.emit(state => reducer(state, code));
};

const initGame = () => {
  const stateGame = new State();
  const htmlToDom = renderDom();
  const handleKeyDown = createHandleKeyDown(stateGame);
  const tick$ = createTick();

  const tickEvent = () => {
    stateGame.emit(state => {
      return checkPosition(state, {
        x: state.figure.coords.x,
        y: state.figure.coords.y + state.speed,
      });
    });

    htmlToDom(renderGrid(stateGame.renderGrid()));
  };

  tick$.subscribe(tickEvent);
  initKeyDownListeners(e => KEYMAP[e.code])(handleKeyDown);
  pause(tick$, tickEvent);
};

initGame();
