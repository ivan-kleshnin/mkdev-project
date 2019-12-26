import { rotateMatrix } from '../utils';

it('Rotate Matrix', () => {
  const matrix = [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
  ];

  const rotatedMatrix = [
    [1, 0, 0],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 0],
  ];

  expect(rotateMatrix(matrix)).toEqual(rotatedMatrix);
});
