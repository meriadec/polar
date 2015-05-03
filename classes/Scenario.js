import Cell from './Cell.js';

var scenario = require('../scenario.js');

class Scenario {

  constructor () {
    this.cells = [];
    scenario.main.tiles.forEach(cell => {
      this.cells.push(new Cell(cell));
    });
  }

  getCell (index) {
    return this.cells[index] || null;
  }

}

export default Scenario;
