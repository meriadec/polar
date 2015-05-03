var _ = require('lodash');

import Util from './Util.js';
import Loader from './Loader.js';
import Story from './Story.js';

class Player {

  constructor (scenario) {
    this.scenario = scenario;
    this.stories = {};
    this.status = {};
    Object.keys(scenario).forEach(story => {
      this.stories[story] = new Story(scenario[story], this);
    });
  }

  load (done) {
    var self = this;
    new Loader(this.scenario).loadAll().then(function () {
      self.screenEl = Util.createEl('div', 'screen', document.body);
      self.statusEl = Util.createEl('div', 'status', document.body);
      self.statusStoryEl = Util.createEl('div', 'status-story', self.statusEl);
      self.statusBoardEl = Util.createEl('div', 'status-board', self.statusEl);
      self.statusCellEl = Util.createEl('div', 'status-cell', self.statusEl);
      document.addEventListener('click', self.showCell.bind(self));
      done();
    });
  }

  play (storyName, reconstructBoard) {
    this.clear();
    this.curStory = this.stories[storyName];
    this.status.story = storyName;
    this.showCell(!!reconstructBoard);
  }

  clear () {
    while (this.screenEl.firstChild) {
      this.screenEl.removeChild(this.screenEl.firstChild);
    }
  }

  showCell (reconstructBoard) {
    var self = this;
    this.curStory.showCell(reconstructBoard, function () {
      self.updateStatus();
    });
  }

  updateStatus () {
    this.statusStoryEl.innerHTML = 'story: ' + this.status.story;
    this.statusBoardEl.innerHTML = 'board: ' + this.status.board;
    this.statusCellEl.innerHTML = 'cell: ' + this.status.cell;
  }

}

export default Player;
