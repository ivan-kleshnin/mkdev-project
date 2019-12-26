import { isValidMove } from '../utils';

const grid = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0, 0],
];

const figure = [
  [1, 1, 1, 0],
  [0, 1, 0, 0],
];

const gridState = {
  grid,
  width: grid[0].length,
  height: grid.length,
};

const figureState = {
  figure,
  x: -1,
  y: 2,
};

it('valid move', () => {
  const nextFigureState = {
    figure,
    x: 2,
    y: 1,
  };
  expect(isValidMove(gridState, nextFigureState)).toBeTruthy();
});

it('wrong move 1', () => {
  expect(isValidMove(gridState, figureState)).toBeFalsy();
});

it('wrong move 2', () => {
  const grid = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0],
  ];

  const gridState = {
    grid,
    width: grid[0].length,
    height: grid.length,
  };
  expect(isValidMove(gridState, figureState)).toBeFalsy();
});
