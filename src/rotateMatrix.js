export const rotateMatrix = matrix => {
  let rotatedMatrix = [];
  let len = matrix[0].length - 1;
  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      let idx = len - x;
      if (!rotatedMatrix[idx]) {
        rotatedMatrix[idx] = [];
      }
      rotatedMatrix[idx][y] = cell;
    });
  });
  return rotatedMatrix;
};
