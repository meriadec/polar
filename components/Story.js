'use strict';

import q from 'q';
import utils from './utils';

export default class Story {

  constructor (scenario, view) {

    this.cells = scenario.cells;
    this.img = utils.create('img', 'cell', view);
    this.view = view;
    this.index = 0;

  }

  show () {
    return q.Promise((resolve) => {
      TweenMax.set(this.img, { opacity: 0 });
      this.img.src = 'img/' + this.cells[this.index].src;
      this.img.width = window.innerWidth - window.innerWidth / 10;
      TweenMax.set(this.img, { opacity: 0 });

      new TimelineMax()
        .to(this.img, 0.2, { opacity: 1 })
        .addCallback(resolve);

    });
  }

  hide () {
    return q.Promise((resolve) => {
      new TimelineMax()
        .to(this.img, 0.2, { opacity: 0 })
        .addCallback(() => {
          this.img.src = '';
          resolve();
        });
    });
  }

  next () {
    ++this.index;
  }

  prev () {
    --this.index;
  }

  resize () {
    this.img.width = window.innerWidth - window.innerWidth / 10;
  }

  isLastCell () {
    return this.index === this.cells.length - 1;
  }

  isFirstCell () {
    return this.index === 0;
  }

}
