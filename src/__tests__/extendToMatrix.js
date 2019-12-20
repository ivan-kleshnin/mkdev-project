import { extendToMatrix } from '../extendToMatrix';

it('Extands to matrix', () => {
  const figure = [
    [1, 1, 1, 0],
    [0, 1, 0, 0],
  ];
  const figureX = 3;
  const figureY = 2;
  const col = 10;
  const row = 5;

  const result = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  expect(extendToMatrix({ figure, figureX, figureY, col, row })).toEqual(result);
});
