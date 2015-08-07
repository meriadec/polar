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
      TweenMax.set(this.img, { opacity: 0, width: 'auto', height: 'auto' });
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

    var final = {};

    let maxW = window.innerWidth - window.innerWidth / 10;
    let maxH = window.innerHeight - window.innerHeight / 10;
    let hCrop = Math.floor(this.imgSize.w - maxW);
    let vCrop = Math.floor(this.imgSize.h - maxH);

    // screen is wide enough, back to original dimensions
    if (hCrop < 0 && vCrop < 0) {
      final.height = this.imgSize.h;
      final.width = this.imgSize.w;
    }

    else {
      let hRatio = this.imgSize.h / maxH;
      let vRatio = this.imgSize.w / maxW;

      if (vRatio > hRatio) {
        final.width = maxW + 'px';
        final.height = 'auto';
      }
      else {
        final.height = maxH + 'px';
        final.width = 'auto';
      }
    }

    if (immediate) {
      this.img.style.width = final.width;
      this.img.style.height = final.height;
    } else {
      TweenMax.to(this.img, 0.2, { width: final.width, height: final.height });
    }

  }

  isLastCell () {
    return this.index === this.cells.length - 1;
  }

  isFirstCell () {
    return this.index === 0;
  }

}
