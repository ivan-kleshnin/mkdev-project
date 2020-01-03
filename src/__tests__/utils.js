import { transposeMatrix, reflectMatrixHorizontally, rotateMatrixCounterClockwise } from '../utils'

describe('transposeMatrix', () => {
  it('works with 1x1 matrix', () => {
    const A1 = [[1]];
    const A2 = [[1]];
    expect(transposeMatrix(A1)).toEqual(A2);
  })

  it('works with 1x2 matrix', () => {
    const A1 = [[1, 2]];
    const A2 = [[1], [2]];
    expect(transposeMatrix(A1)).toEqual(A2);
  })

  it('works with 2x1 matrix', () => {
    const A1 = [[1], [2]];
    const A2 = [[1, 2]];
    expect(transposeMatrix(A1)).toEqual(A2);
  })

  it('works with 3x4 matrix', () => {
    const A1 = [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 1, 1, 0],
    ];

    const A2 = [
      [1, 0, 0],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 0],
    ];

    expect(transposeMatrix(A1)).toEqual(A2);
    expect(transposeMatrix(A2)).toEqual(A1);
  });
});

describe('reflectMatrixHorizontally', () => {
  it('works with 1x1 matrix', () => {
    const A1 = [[1]];
    const A2 = [[1]];
    expect(reflectMatrixHorizontally(A1)).toEqual(A2);
  })

  it('works with 1x2 matrix', () => {
    const A1 = [[1, 2]];
    const A2 = [[1, 2]];
    expect(reflectMatrixHorizontally(A1)).toEqual(A2);
  })

  it('works with 2x1 matrix', () => {
    const A1 = [[1], [2]];
    const A2 = [[2], [1]];
    expect(reflectMatrixHorizontally(A1)).toEqual(A2);
  })

  it('works with 3x4 matrix', () => {
    const A1 = [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 1, 1, 0],
    ];

    const A2 = [
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
    ];

    expect(reflectMatrixHorizontally(A1)).toEqual(A2);
  });
});

describe('rotateMatrixCounterClockwise', () => {
  it('works with 1x1 matrix', () => {
    const A1 = [[1]];
    const A2 = [[1]];
    expect(rotateMatrixCounterClockwise(A1)).toEqual(A2);
  })

  it('works with 1x2 matrix', () => {
    const A1 = [[1, 2]];
    const A2 = [[2], [1]];
    expect(rotateMatrixCounterClockwise(A1)).toEqual(A2);
  })

  it('works with 2x1 matrix', () => {
    const A1 = [[1], [2]];
    const A2 = [[1, 2]];
    expect(rotateMatrixCounterClockwise(A1)).toEqual(A2);
  })

  it('works with 3x4 matrix', () => {
    const A1 = [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 1, 1, 0],
    ];

    const A2 = [
      [1, 0, 0],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 0],
    ];

    const A3 = [
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
    ]

    const A4 = [
      [0, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [0, 0, 1],
    ]

    expect(rotateMatrixCounterClockwise(A1)).toEqual(A2);
    expect(rotateMatrixCounterClockwise(A2)).toEqual(A3);
    expect(rotateMatrixCounterClockwise(A3)).toEqual(A4);
    expect(rotateMatrixCounterClockwise(A4)).toEqual(A1);
  });
});
