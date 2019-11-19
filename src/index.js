import { FIGURES } from './constans';

class Grid {
  constructor({ selector }) {
    this.domParent = document.querySelector(selector);
    this.width = 10;
    this.height = 20;

    this.grid = Array.from({ length: this.height }, () =>
      Array(this.width).fill(0),
    );
    this.domCells = [];
  }

  initGrid() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this.height; i++) {
      const domRowCells = [];
      for (let j = 0; j < this.width; j++) {
        const block = document.createElement('DIV');
        block.classList.add('cell');
        fragment.appendChild(block);
        domRowCells.push(block);
      }
      this.domCells.push(domRowCells);
    }

    this.domParent.appendChild(fragment);
  }

  render() {
    for (let i = 0; i < this.grid.length; i++) {
      const row = this.grid[i];
      for (let j = 0; j < row.length; j++) {
        const value = row[j];
        const domCell = this.domCells[i][j];
        if (value && !domCell.classList.contains('active')) {
          domCell.classList.add('active');
        } else {
          if (domCell.classList.contains('active')) {
            domCell.classList.remove('active');
          }
        }
      }
    }
  }
}

const grid = new Grid({
  selector: '.grid',
});

grid.initGrid();
grid.render();
