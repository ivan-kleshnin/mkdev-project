export const mergeMatrix = (arr1, arr2) =>
  arr1.map((row, y) => row.map((cell, x) => cell || arr2[y][x]));
