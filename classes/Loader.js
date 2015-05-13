import Util from './Util.js';

var q = require('q');

class Loader {

  constructor (scenario) {

    var self = this;

    self.loader = Util.createEl('div', 'loader');
    self.content = Util.createEl('div', 'content');
    self.spinner = Util.createEl('div', 'spinner');
    self.percent = Util.createEl('span', 'percent');

    self.assets = [];

    Object.keys(scenario).forEach(story => {
      scenario[story].boards.forEach(board => {
        board.cells.forEach(cell => {
          self.assets.push('img/' + cell.src);
        });
      });
    });

  }

  loadAll () {
    var def = q.defer();
    this.showLoader();
    var nb = 0;
    var total = this.assets.length;
    this.assets.forEach(src => {
      var img = new Image();
      img.src = src;
      img.onload = () => {
        this.percent.innerHTML = Math.round((++nb / this.assets.length) * 100);
        if (nb === total) {
          this.hideLoader();
          def.resolve();
        }
      };
      img.onerror = function (err) { def.reject(err); };
    });
    return def.promise;
  }

  showLoader () {
    this.content.innerHTML = 'Loading...';
    this.content.appendChild(this.percent);
    this.content.appendChild(this.spinner);
    this.loader.appendChild(this.content);
    document.body.appendChild(this.loader);
  }

  hideLoader () {
    document.body.removeChild(this.loader);
  }

}

export default Loader;
