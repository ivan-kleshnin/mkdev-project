import { EventEmitter } from './EventEmitter';
import { FIGURES } from './constants';
import { extendToMatrix } from './extendToMatrix';
import { mergeMatrix } from './mergeMatrix';
import { rotateFigure } from './rotateFigure';
import { EVENTS_ENUM } from './events';

export class State extends EventEmitter {
  constructor(width = 10, height = 20) {
    super();
    this.width = width;
    this.height = height;
    this.tickTime = 500;
    this.coords = {
      x: Math.floor(this.width / 2),
      y: -1,
    };
    this.figure = FIGURES.skew;
    this.grid = this.createEmptyGrid();
    this.loop();
    this.subscribe(EVENTS_ENUM.keyPressEvent, this.keyHandler);
    this.subscribe(EVENTS_ENUM.tick, () => this.coords.y++);
  }

  keyHandler = key => {
    let { x, y } = this.coords;
    const handlers = {
      UP: () => this.rotateFigure(),
      DOWN: () => this.setCoords({ x, y: ++y }),
      LEFT: () => this.setCoords({ x: --x, y }),
      RIGHT: () => this.setCoords({ x: ++x, y }),
    };

    handlers[key]();
  };

  createEmptyGrid() {
    return Array.from({ length: this.height }).map(_ => {
      return Array.from({ length: this.width }).map(() => 0);
    });
  }

  setCoords(coords) {
    this.coords = coords;
  }

  rotateFigure() {
    this.figure = rotateFigure(this.figure);
  }

  loop() {
    setInterval(() => {
      this.emit(EVENTS_ENUM.tick, this.renderGrid());
    }, this.tickTime);
  }

  renderGrid() {
    const grid = mergeMatrix(
      this.grid,
      extendToMatrix({
        figure: this.figure,
        coords: this.coords,
        width: this.width,
        height: this.height,
      }),
    );

    return grid;
  }
}
