import { FIGURES } from './constants';

export class Figure {
  constructor(gridWidth) {
    this.gridWidth = gridWidth;
    this.state = this.getRandomFigure();
  }

  emit(stateHandler) {
    const nextState = stateHandler(this.state);
    if (nextState !== this.state) {
      this.state = { ...this.state, ...nextState };
    }
  }

  get figure() {
    return this.state.figure;
  }

  getRandomFigure() {
    const keys = Object.keys(FIGURES);
    const randomIndex = Math.abs(Math.floor(Math.random() * keys.length - 1));
    const nextFigure = FIGURES[keys[randomIndex]];

    return {
      x: Math.floor(this.gridWidth / 2),
      y: -1,
      speed: 1,
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
    const nextState = stateHandler(this.state);
    if (nextState !== this.state) {
      this.state = { ...this.state, ...nextState };
    }
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
