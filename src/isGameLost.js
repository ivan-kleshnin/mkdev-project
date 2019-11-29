export const isGameLost = grid => {
  const rowLength = grid[0].length;

  for (let x = 0; x < rowLength; x++) {
    const tmp = [];
    for (let y = 0; y < grid.length; y++) {
      tmp.push(grid[y][x]);
    }
    if (tmp.every(n => n === 1)) {
      return true;
    }
    tmp.length = 0;
  }

  return false;
};
