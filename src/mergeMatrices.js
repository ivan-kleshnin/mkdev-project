export const mergeMatrices = (matrix1, matrix2) =>
  matrix1.map((row, i) => row.map((cell, j) => cell || matrix2[i][j]));
