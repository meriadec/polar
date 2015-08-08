'use strict';

import q from 'q';

export default class Story {

  constructor (scenario, img) {

    this.cells = scenario.cells;
    this.points = [];
    this.img = img;
    this.imgSize = {};
    this.index = 0;

  }

  show () {
    return q.Promise((resolve) => {
      TweenMax.set(this.img, { opacity: 0, scale: 1 });
      this.img.src = 'img/' + this.cells[this.index].src;
      this.imgSize = { w: this.img.width, h: this.img.height };
      this.resize(true);
      TweenMax.set(this.img, { opacity: 0 });

      new TimelineMax()
        .to(this.img, 0.2, { opacity: 1 })
        .addCallback(() => {
          this.showPoints()
            .then(resolve);
        });

    });
  }

  showPoints () {
    return q.Promise((resolve) => {
      setTimeout(resolve, 500);
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

  resize (immediate) {

    var scale;

    let maxW = window.innerWidth - window.innerWidth / 10;
    let maxH = window.innerHeight - window.innerHeight / 10;

    // screen is wide enough, back to original dimensions
    if (this.imgSize.w < maxW && this.imgSize.h < maxH) {
      scale = 1;
    }

    else {
      let hRatio = maxH / this.imgSize.h;
      let vRatio = maxW / this.imgSize.w;

      if (vRatio > hRatio) { scale = hRatio; }
      else { scale = vRatio; }
    }

    if (immediate) { TweenMax.set(this.img, { scale: scale }); }
    else { TweenMax.to(this.img, 0.2, { scale: scale }); }

  }

  isLastCell () {
    return this.index === this.cells.length - 1;
  }

  isFirstCell () {
    return this.index === 0;
  }

}