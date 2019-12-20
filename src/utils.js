import { mergeMatrices } from './mergeMatrices';
import { extendToMatrix } from './extendToMatrix';

export const isValidMove = (gridState, stateFigure) => {
  const { x, y, figure } = stateFigure;
  const width = figure[0].length;
  const height = figure.length;
  return x >= 0 && x + width <= gridState.width && y + height <= gridState.height;
};

export const merge = (stateGrid, stateFigure) => {
  return mergeMatrices(
    stateGrid.grid,
    extendToMatrix({
      figure: stateFigure.figure,
      figureX: stateFigure.state.x,
      figureY: stateFigure.state.y,
      col: stateGrid.state.width,
      row: stateGrid.state.height,
    }),
  );
};
export const isCollisionWithBottom = (grid, figureState) => {
  const { y } = figureState.state;
  const { height } = figureState.size;

  return y + height >= grid.length;
};

export const isCollisionWithFigure = (grid, figureState) => {
  const { x, y, figure } = figureState.state;
  const { width, height } = figureState.size;

  return Array.from({ length: height }).some((_, j) => {
    return Array.from({ length: width }).some((_, i) => {
      return grid[y + j][x + i] && figure[j][i];
    });
  });
};
