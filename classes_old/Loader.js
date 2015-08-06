import Util from './Util.js';

var q = require('q');
var spinnerSrc = 'ui/loading-spinner-resized.png';

class Loader {

  constructor (scenario) {

    var self = this;

    self.loader = Util.createEl('div', 'loader');
    self.content = Util.createEl('div', 'content');
    self.spinner = Util.createEl('img', 'loading-spinner');
    self.percent = Util.createEl('span', 'loading-percent');

    self.spinner.src = spinnerSrc;

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
        this.percent.innerHTML = Math.round((++nb / this.assets.length) * 100) + ' %';
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
    this.percent.innerHTML = '0 %';
    this.content.appendChild(this.percent);
    this.spinner.style.opacity = 0;
    this.content.appendChild(this.spinner);
    this.loader.appendChild(this.content);
    document.body.appendChild(this.loader);

    // load spinner image then show it
    var spin = new Image();
    spin.src = spinnerSrc;
    spin.onload = () => {
      TweenMax.to(this.spinner, 0.25, { opacity: 1 });
    };
  }

  hideLoader () {
    document.body.removeChild(this.loader);
  }

}

export default Loader;
