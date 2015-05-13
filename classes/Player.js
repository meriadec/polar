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
      self.statusBarlEl = Util.createEl('div', 'status-bar');
      TweenMax.set(self.statusBarlEl, { scaleX: 0 });
      document.body.appendChild(self.statusBarlEl);
      document.addEventListener('click', function () { self.showCell(); });
      done();
    });
  }

  play (storyName, reconstructBoard) {
    this.curStory = this.stories[storyName];
    this.clear();
    this.status.story = storyName;
    this.showCell(!!reconstructBoard);
  }

  clear () {
    this.currentStory().currentBoard().clearListeners();
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
    TweenMax.to(this.statusBarlEl, 0.5, { scaleX: this.curStory.percentage(), ease: Back.easeOut.config(0.7) });
  }

  currentStory () {
    return this.curStory;
  }

}

export default Player;
