import Board from './Board.js';

class Story {

  constructor (story, player) {
    this.player = player;
    this.boards = [];
    this.i = 0;
    this.totalCells = 0;
    this.finish = story.finish || null;
    story.boards.forEach(board => {
      var b = new Board(board, player);
      this.totalCells += b.totalCells();
      this.boards.push(b);
    });
  }

  showCell (reconstructBoard, cb) {

    var self = this;
    self.player.status.board = self.i;

    if (this.i >= this.boards.length) { return; }

    // end of board
    if (!this.boards[this.i].showCell(reconstructBoard, cb)) {

      // last board
      if (this.i >= this.boards.length - 1) {
        if (this.finish) {
          this.player.play(this.finish, true);
        }
        return;
      }

      this.player.clear();
      ++self.i;
      self.player.status.board = self.i;
      self.player.status.cell = 0;
      self.showCell(false, cb);
    }
  }

  currentBoard () {
    return this.boards[this.i];
  }

  percentage () {
    var showedCells = 0;
    this.boards.forEach(b => {
      showedCells += b.showedCells();
    });
    return showedCells / this.totalCells;
  }

}

export default Story;
