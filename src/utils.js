import * as R from "ramda"

export const isValidMove = (gridState, stateFigure) => {
  const { x, y, figure } = stateFigure;

  return figure.every((_, j) =>
    figure[j].every((_, i) => {
      const isEmpty = !!figure[j][i];

      return (
        !isEmpty ||
        (x >= 0 &&
          y > -1 &&
          x + i <= gridState.width - 1 &&
          y + j <= gridState.height - 1 &&
          !gridState.grid[j + y][i + x])
      );
    }),
  );
};

export const merge = (stateGrid, stateFigure) => {
  return mergeMatrices(
    stateGrid.grid,
    extendToMatrix({
      figure: stateFigure.figure,
      figureX: stateFigure.state.x,
      figureY: stateFigure.state.y,
      col: stateGrid.width,
      row: stateGrid.height,
    }),
  );
};

// Check collision with other figure and bottom of grid
export const isCollision = (grid, figureState) => {
  const { x, y, figure } = figureState;

  return figure.some((_, j) =>
    figure[j].some((_, i) => {
      return (
        (figure[j][i] && grid[j + y + 1] && grid[j + y + 1][x + i]) ||
        y + j >= grid.length - 1
      );
    }),
  );
};

export const getDestroyCountLine = grid => {
  return grid.reduce((acc, row, index) => {
    if (row.every(n => n)) {
      acc = [...acc, index];
    }

    return acc;
  }, []);
};

export const destroyLine = (grid, range) => {
  const lengthRow = grid[0].length;
  const newTopRow = Array.from({ length: range.length }).map(_ =>
    new Array(lengthRow).fill(0),
  );
  return [...newTopRow, ...grid.filter((_, index) => !range.includes(index))];
};

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
  return rotatedMatrix
}

export const getDimensions = (matrix) => {
  if (!matrix.length || !matrix[0].length) {
    throw Error("invalid matrix")
  }
  return [matrix.length, matrix[0].length]
}

export const transposeMatrix = (matrix) => {
  let [n2, m2] = getDimensions(matrix)
  return R.range(0, m2).map(i => {
    return R.range(0, n2).map(j => matrix[j][i])
  })
}

export const reflectMatrixHorizontally = (matrix) => {
  let [m2, n2] = getDimensions(matrix)
  return R.range(0, m2).map(i => {
    let i2 = m2 - i - 1
    return R.range(0, n2).map(j => matrix[i2][j])
  })
}

export const rotateMatrixCounterClockwise = R.pipe(transposeMatrix, reflectMatrixHorizontally)

export const mergeMatrices = (matrix1, matrix2) =>
  matrix1.map((row, i) => row.map((cell, j) => cell || matrix2[i][j]));

export const isGameLost = (grid, stateFigure) => {
  return isCollision(grid, stateFigure) && stateFigure.y === -1;
};

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
