import { EventEmitter } from './EventEmitter';
import { FIGURES } from './constants';
import { extendToMatrix } from './extendToMatrix';
import { mergeMatrices } from './mergeMatrices';
import { getSizeFigure } from './utils';

export class Figure {
  constructor(gridWidth) {
    this.gridWidth = gridWidth;
    this.state = this.getRandomFigure();
  }

  get figure() {
    return this.state.figure;
  }

  get size() {
    return {
      width: this.state.figure[0].length,
      height: this.state.figure.length,
    };
  }
  emit(stateHandler) {
    this.state = { ...this.state, ...stateHandler(this.state) };
  }
  getRandomFigure() {
    const keys = Object.keys(FIGURES);
    const randomIndex = Math.abs(Math.floor(Math.random() * keys.length - 1));
    const nextFigure = FIGURES[keys[randomIndex]];

    return {
      x: Math.floor(this.gridWidth / 2),
      y: -1,
      figure: nextFigure,
    };
  }

  nextFigure() {
    this.state = this.getRandomFigure();
  }
}

export class Grid {
  constructor(width = 10, height = 20) {
    this.state = {
      width,
      height,
      grid: this.createEmptyGrid(width, height),
    };
  }

  createEmptyGrid(width, height) {
    return Array.from({ length: height }).map(_ => {
      return Array.from({ length: width }).map(() => 0);
    });
  }

  emit(stateHandler) {
    this.state = { ...this.state, ...stateHandler(this.state) };
  }

  get grid() {
    return this.state.grid;
  }

  get width() {
    return this.state.width;
  }

  get height() {
    return this.state.height;
  }
}

// export const figureState = {};
//
// export class State extends EventEmitter {
//   constructor(width = 10, height = 20) {
//     super();
//     this.width = width;
//     this.state = {
//       isRunning: true,
//       width,
//       height,
//       figure: this.getNextFigure(),
//       grid: this.createEmptyGrid(width, height),
//       speed: 1,
//     };
//   }
//
//   createEmptyGrid(width, height) {
//     return Array.from({ length: height }).map(_ => {
//       return Array.from({ length: width }).map(() => 0);
//     });
//   }
//   getNextFigure() {
//     const keys = Object.keys(FIGURES);
//     const randomIndex = Math.abs(Math.floor(Math.random() * keys.length - 1));
//     const nextFigure = FIGURES[keys[randomIndex]];
//
//     return {
//       coords: {
//         x: Math.floor(this.width / 2),
//         y: -1,
//       },
//       size: getSizeFigure(nextFigure),
//       figure: nextFigure,
//     };
//   }
//
//   renderGrid() {
//     const { figure, grid, width, height } = this.state;
//
//     return mergeMatrices(
//       grid,
//       extendToMatrix({
//         figure,
//         col: width,
//         row: height,
//       }),
//     );
//   }
//
//   emit = setStateCallback => {
//     this.state = setStateCallback(this.state);
//     // if (!this.state.isRunning) {
//     //   this.state = { ...this.state, ...this.getNextFigure(), isRunning: true };
//     // }
//   };
// }
