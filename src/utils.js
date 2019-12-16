import { mergeMatrices } from './mergeMatrices';
import { extendToMatrix } from './extendToMatrix';

export const checkPosition = (state, coords) => {
  const { x, y } = coords;
  const nextState = { ...state };
  const {
    figure: {
      size: { width, height },
    },
  } = state;

  if (y + height >= state.height || checkCollision(state.grid, state.figure)) {
    nextState.grid = merge({
      grid: state.grid,
      figure: state.figure,
      width: state.width,
      height: state.height,
    });
    nextState.isRunning = false;
  }

  nextState.figure.coords = {
    x: Math.min(state.width - width, Math.max(0, x)),
    y: Math.min(y, state.height - height),
  };

  return nextState;
};

export const merge = ({ grid, figure, width, height }) => {
  const { coords } = figure;
  return mergeMatrices(
    grid,
    extendToMatrix({
      figure,
      coords,
      col: width,
      row: height,
    }),
  );
};

export const checkCollision = (grid, figure) => {
  const {
    coords: { x, y },
    width,
    height,
  } = figure;

  return Array.from({ length: height }).some((_, j) => {
    return Array.from({ length: width }).some((_, i) => {
      return grid[y + j + 1][x + i] && figure[j][i];
    });
  });
};

export const getSizeFigure = figure => {
  const cellsWithPoint = figure.reduce((acc, row) => {
    const rowWithPoint = row.reduce(
      (accRow, r, cellIndex) => (r ? [...accRow, cellIndex] : accRow),
      [],
    );
    return [...acc, rowWithPoint];
  }, []);

  const height = cellsWithPoint.filter(arr => arr.length).length;
  const width = cellsWithPoint
    .flat()
    .filter((n, i, curArr) => curArr.findIndex(el => el === n) === i).length;

  return { width, height };
};
