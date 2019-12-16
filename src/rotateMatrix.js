export const rotateMatrix = figure => {
  let rotatedFigure = [];
  let len = figure.length - 1;
  figure.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!rotatedFigure[x]) {
        rotatedFigure[x] = [];
      }
      rotatedFigure[x][len - y] = cell;
    });
  });
  return rotatedFigure;
};
