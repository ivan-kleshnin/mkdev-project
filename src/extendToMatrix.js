export const extendToMatrix = ({ figure, coords, width, height }) => {
  const getValueFromFigure = (figure, coords, x, y) => {
    let figureX = x - coords.x;
    let figureY = y - coords.y;
    let rowMatrix = figure[figureY];

    const valueCell =
      rowMatrix !== undefined && rowMatrix[figureX] !== undefined
        ? rowMatrix[figureX]
        : 0;

    return valueCell;
  };

  const getValue = ({ figure, coords }) => y => {
    return (_, x) => {
      return getValueFromFigure(figure, coords, x, y);
    };
  };

  const prepareMapFunc = getValue({ figure, coords });

  return Array.from({ length: height }).map((a, matrixY) => {
    const mapFunc = prepareMapFunc(matrixY);

    return Array.from({ length: width }).map(mapFunc);
  });
};
