import { checkCollision } from '../utils';
import { FIGURES } from '../constants';

it('Test checkCollision', () => {
  const grid = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 0],
  ];

  const figure = {
    x: 2,
    y: 2,
    figure: FIGURES.skew,
    get size() {
      return {
        width: 3,
        height: 2,
      };
    },
  };

  expect(checkCollision(grid, figure)).toBeTruthy();
});
