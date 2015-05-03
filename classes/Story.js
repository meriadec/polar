import Board from './Board.js';

class Story {

  constructor (story, player) {
    this.player = player;
    this.boards = [];
    this.i = 0;
    story.boards.forEach(board => {
      this.boards.push(new Board(board, player));
    });
  }

  showCell (reconstructBoard, cb) {

    var self = this;
    self.player.status.board = self.i;

    if (this.i >= this.boards.length) { return; }

    // end of board
    if (!this.boards[this.i].showCell(reconstructBoard, cb)) {

      // last board
      if (this.i >= this.boards.length - 1) { return; }

      this.player.clear();
      ++self.i;
      self.player.status.board = self.i;
      self.player.status.cell = 0;
      self.showCell(false, cb);
    }
  }

}

export default Story;
