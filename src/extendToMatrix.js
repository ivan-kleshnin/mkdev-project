export const extendToMatrix = ({ figure, figureX, figureY, col, row }) => {
  const getFromFigure = gridY => gridX => {
    const currentFigureX = gridX - figureX;
    const currentFigureY = gridY - figureY;
    let rowMatrix = figure[currentFigureY];
    return rowMatrix && rowMatrix[currentFigureX] ? rowMatrix[currentFigureX] : 0;
  };

  return Array.from({ length: row }).map((_, y) => {
    const getValue = getFromFigure(y);
    return Array.from({ length: col }).map((_, x) => {
      return getValue(x);
    });
  });
};
