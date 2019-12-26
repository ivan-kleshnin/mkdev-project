import { Grid, Figure } from './State';
import { KEYMAP } from './constants';
import { createTick } from './streams';
import {
  merge,
  isValidMove,
  isCollision,
  getDestroyCountLine,
  destroyLine,
  rotateMatrix,
  isGameLost,
} from './utils';
import { renderDom, renderGrid } from './render';

const moveDown = state => ({ ...state, y: state.y + state.speed });
const moveRight = state => ({ ...state, x: state.x + 1 });
const moveLeft = state => ({ ...state, x: state.x - 1 });
const rotate = state => ({ ...state, figure: rotateMatrix(state.figure) });

const initKeyDownListeners = condition => cb => {
  document.addEventListener('keydown', e => {
    if (condition(e)) {
      cb(e);
    }
  });
};

const handleKeyDown = e => (stateGrid, stateFigure) => {
  const handleMap = {
    ArrowUp: rotate,
    ArrowRight: moveRight,
    ArrowLeft: moveLeft,
    ArrowDown: moveDown,
  };

  stateFigure.emit(state => {
    const newStateFigure = handleMap[e.code](state);
    return isValidMove(stateGrid, newStateFigure) ? newStateFigure : state;
  });
};

const initGame = () => {
  const stateGrid = new Grid();
  const stateFigure = new Figure(stateGrid.state.width);
  const htmlToDom = renderDom();
  const tick$ = createTick();

  const gameTick = () => {
    stateFigure.emit(state =>
      isValidMove(stateGrid, moveDown(state)) ? moveDown(state) : state,
    );

    if (isCollision(stateGrid.grid, stateFigure.state)) {
      stateGrid.emit(state => ({ ...state, grid: merge(state, stateFigure) }));
      const destroyRange = getDestroyCountLine(stateGrid.grid);
      if (destroyRange.length) {
        stateGrid.emit(state => ({
          ...state,
          grid: destroyLine(state.grid, destroyRange),
        }));
      }
      stateFigure.nextFigure();
    }

    if (isGameLost(stateGrid.grid, stateFigure.state)) {
      tick$.unsubscribe(gameTick);
      showFailDialog();
      return;
    }
    htmlToDom(renderGrid(merge(stateGrid, stateFigure)));
  };

  tick$.subscribe(gameTick);

  initKeyDownListeners(e => KEYMAP[e.code])(e =>
    handleKeyDown(e)(stateGrid, stateFigure),
  );
};

initGame();

const showFailDialog = () => {
  const btn = document.createElement('BUTTON');
  const container = document.createElement('DIV');
  const title = document.createElement('H2');
  container.classList.add('lose-dialog');
  title.innerText = 'You lost';
  btn.innerText = 'Restart';
  btn.addEventListener('click', initGame);
  container.appendChild(title);
  container.appendChild(btn);
  document.querySelector('.grid').appendChild(container);
};
//
