import { FIGURES } from './constans';

const renderGrid = ({ grid }) => {
  const symbols = {
    '0': '\u2B1C',
    '1': '\u2B1B',
  };
  const html = grid.reduce((accHtml, row) => {
    const rowHtml = row.reduce((accRow, cell) => `${accRow}${symbols[cell]}`, '');
    return `${accHtml}${rowHtml}\n`;
  }, '');

  return `<pre><code>${html}</code></pre>`;
};

const drawFigureOnGrid = ({ grid, figure, coords }) => {
  let y = coords.y;
  let x = coords.x;
  let board = grid.map(row => [...row]);

  for (let i = 0; i < figure.length; i++) {
    for (let j = 0; j < figure[i].length; j++) {
      const point = figure[i][j];
      if (y < 0) {
        continue;
      }
      if (point && board[y] !== undefined && board[y][x] !== undefined) {
        board[y][x] = 1;
      }
      x++;
    }
    x = coords.x;
    y++;
  }
  return board;
};

// Для примера,
(() => {
  const grid = Array.from({ length: 20 }).map((_, i) => {
    return Array.from({ length: 10 }).map(() => 0);
  });

  let Y = -1;
  let X = Math.floor((grid[0].length - 1) / 2 - 1);
  setInterval(() => {
    const coords = { x: X, y: Y++ };
    const g = drawFigureOnGrid({
      grid,
      figure: FIGURES.l,
      coords,
    });
    document.querySelector('.grid').innerHTML = renderGrid({
      grid: g,
    });
  }, 1000);
})();
