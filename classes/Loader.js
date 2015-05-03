import Util from './Util.js';

var _ = require('lodash');
var q = require('q');
var async = require('async');

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
    var self = this;
    var def = q.defer();
    this.showLoader();
    var nb = 0;
    async.map(this.assets, function (src, done) {
      var img = new Image();
      img.src = src;
      img.onload = function () {
        self.percent.innerHTML = Math.round((++nb / self.assets.length) * 100);
        done();
      };
      img.onerror = function (err) { done(err); };
    }, function (err) {
      if (err) { return def.reject(err); }
      self.hideLoader();
      def.resolve();
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
