import { isCollision } from '../utils';
import { FIGURES } from '../constants';

const grid = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0, 0],
];

const figureState = {
  x: 2,
  y: 2,
  figure: FIGURES.skew,
};

const stateGrid = {
  grid,
  width: grid[0].length,
  height: grid.length,
};

it('Do collision', () => {
  expect(isCollision(grid, figureState)).toBeTruthy();
});

it('Not collision', () => {
  const nextFigureState = {
    x: 2,
    y: 1,
    figure: FIGURES.skew,
  };
  expect(isCollision(stateGrid, nextFigureState)).toBeFalsy();
});

it('Collision with bottom', () => {
  const grid = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];

  const figureState = {
    x: 2,
    y: 4,
    figure: FIGURES.skew,
  };

  expect(isCollision(grid, figureState)).toBeTruthy();
});
