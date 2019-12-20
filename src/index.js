import { Grid, Figure } from './State';
import { SYMBOLS, KEYMAP } from './constants';
import { rotateMatrix } from './rotateMatrix';
import { isGameLost } from './isGameLost';
import { createTick } from './streams';
import {
  merge,
  isCollisionWithFigure,
  isCollisionWithBottom,
  isValidMove,
} from './utils';
import { renderDom, renderGrid } from './render';

const initKeyDownListeners = condition => cb => {
  document.addEventListener('keydown', e => {
    if (condition(e)) {
      cb(e);
    }
  });
};

const moveDown = state => ({ ...state, y: state.y + 1 });
const moveRight = state => ({ ...state, x: state.x + 1 });
const moveLeft = state => ({ ...state, x: state.x - 1 });
const rotate = state => ({ ...state, figure: rotateMatrix(state.figure) });

const initGame = () => {
  const stateGrid = new Grid();
  const stateFigure = new Figure(stateGrid.state.width);
  const htmlToDom = renderDom();
  const tick$ = createTick();

  const gameTick = () => {
    const isCollision =
      isCollisionWithFigure(stateGrid.grid, stateFigure) ||
      isCollisionWithBottom(stateGrid.grid, stateFigure);

    stateFigure.emit(state => {
      return isValidMove(stateGrid, moveDown(state)) ? moveDown(state) : state;
    });

    stateGrid.emit(state => {
      if (isCollision) {
        return { ...state, grid: merge(stateGrid, stateFigure) };
      }
      return state;
    });

    if (isCollision) {
      stateFigure.nextFigure();
    }
    htmlToDom(renderGrid(merge(stateGrid, stateFigure)));
  };

  tick$.subscribe(gameTick);

  const handleKeyDown = stateFigure => e => {
    const handleMap = {
      ArrowUp: rotate,
      ArrowRight: moveRight,
      ArrowLeft: moveLeft,
      ArrowDown: moveDown,
    };

    stateFigure.emit(state => {
      const newStateFigure = handleMap[e.code](state);
      if (isValidMove(stateGrid.state, newStateFigure)) {
        return newStateFigure;
      }
      return state;
    });
  };
  initKeyDownListeners(e => KEYMAP[e.code])(handleKeyDown(stateFigure));
};
initGame();

//
