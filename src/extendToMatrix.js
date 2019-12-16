export const extendToMatrix = ({ figure, col, row }) => {
  const getValueFromFigure = (figure, x, y) => {
    const { coords } = figure;
    let figureX = x - coords.x;
    let figureY = y - coords.y;
    let rowMatrix = figure.figure[figureY];

    const valueCell =
      rowMatrix !== undefined && rowMatrix[figureX] !== undefined
        ? rowMatrix[figureX]
        : 0;

    return valueCell;
  };

  const getValue = figure => y => {
    return (_, x) => {
      return getValueFromFigure(figure, x, y);
    };
  };

  const prepareMapFunc = getValue(figure);
  return Array.from({ length: row }).map((a, matrixY) => {
    const mapFunc = prepareMapFunc(matrixY);

    return Array.from({ length: col }).map(mapFunc);
  });
};
