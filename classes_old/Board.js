import Cell from './Cell.js';
import _ from 'lodash';

class Board {

  constructor (board, player) {

    // default values, will be changed by resize
    this.x = 0;
    this.y = 0;
    this.scale = 1;

    this.player = player;
    this.cells = [];
    this.i = 0;
    board.cells.forEach(cell => {
      this.cells.push(new Cell(cell, player, this));
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

  resize () {
    var maxW = window.innerWidth - 40;
    var boardW = _.max(this.cells.map(c => c.el.width));

    // if board is too small, reduce it
    if (boardW > maxW) {
      this.scale = maxW / boardW;
      this.x = 0;
      this.y = 0;
      _.forEach(this.cells, c => c.reScale());
    }

    // else, place it center
    else {
      this.scale = 1;
      this.x = (maxW - boardW) / 2;
      _.forEach(this.cells, c => c.rePosition());
    }
  }

}

export default Board;
