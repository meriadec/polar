import Cell from './Cell.js';

class Board {

  constructor (board, player) {
    this.player = player;
    this.cells = [];
    this.i = 0;
    board.cells.forEach(cell => {
      this.cells.push(new Cell(cell, player));
    });
  }

  showCell (reconstructBoard, cb) {
    if (reconstructBoard && this.i > 0) { --this.i; }
    if (this.i >= this.cells.length) { return false; }
    this.player.status.cell = this.i;
    if (reconstructBoard) {
      for (let i = 0; i < this.i; i++) { this.cells[i].show(); }
    }
    this.cells[this.i].show();
    cb();
    this.i++;
    return true;
  }

  clearListeners () {
    this.cells.forEach(c => {
      c.clearListeners();
    });
  }

  totalCells () {
    return this.cells.length;
  }

  showedCells () {
    var nb = 0;
    this.cells.forEach(c => {
      if (c.showed) { ++nb; }
    });
    return nb;
  }

}

export default Board;
