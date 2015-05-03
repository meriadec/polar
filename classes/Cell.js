import Util from './Util.js';

var _ = require('lodash');

/**
 * Cell
 */
class Cell {

  constructor (data, player) {
    this.points = null;
    _.extend(this, data);
    this.player = player;
    this.el = document.createElement('img');
    this.el.classList.add('cell');
    this.el.src = 'img/' + this.src;
    TweenMax.set(this.el, { x: this.x, y: this.y, opacity: 0, scale: 1.1 });

    // action points
    if (this.points) {
      this.points.forEach(p => {
        p.el = Util.createEl('div', 'point');
        TweenMax.set(p.el, { x: this.x + p.x, y: this.y + p.y, opacity: 0, scale: 0.1 });
      });
    }
  }

  show () {
    var self = this;
    this.player.screenEl.appendChild(this.el);
    TweenMax.to(this.el, 0.25, { opacity: 1, scale: 1 });
    TweenMax.to(window, 2, {scrollTo:{y:this.y, x:0}, ease:Power4.easeOut});
    if (this.points) {
      this.points.forEach(p => {
        this.player.screenEl.appendChild(p.el);
        p.el.addEventListener('click', function (e) {
          e.stopPropagation();
          console.log('changing story to ' + p.story);
          self.player.play(p.story, true);
        });
        setTimeout(function () {
          TweenMax.to(p.el, 0.25, { opacity: 1, scale: 1, ease: Back.easeOut.config(3) });
        }, 250);
      });
    }
  }

}

export default Cell;
