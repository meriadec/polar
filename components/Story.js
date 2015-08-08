'use strict';

import q from 'q';
import utils from './utils';

export default class Story {

  constructor (scenario, view, img, props) {

    this.props = props;
    this.cells = scenario.cells;
    this.finish = scenario.finish;
    this.scale = 1;
    this.points = [];
    this.eventListeners = [];
    this.view = view;
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
      let points = this.cells[this.index].points;
      if (!points || !points.length) { return resolve(); }
      q.all(points.map(p => this.showPoint(p)))
        .then(resolve);
    });
  }

  showPoint (p) {
    return q.Promise((resolve) => {

      let point = utils.create('div', 'point');

      let rect = this.img.getBoundingClientRect();

      TweenMax.set(point, {
        opacity: 0,
        scale: 0.5,
        x: rect.left + p.x * this.scale - 25,
        y: rect.top + p.y * this.scale - 25
      });

      this.eventListeners.push(this.createListener(point, p));
      this.points.push(point);
      this.view.appendChild(point);

      new TimelineMax()
        .to(point, 0.15, { opacity: 1, scale: 1, ease: 'Back.easeOut' })
        .addCallback(resolve);

    });
  }

  createListener (point, p) {
    var handler = (e) => {
      e.stopPropagation();
      this.props.onPointClick(p);
    };
    point.addEventListener('click', handler, false);
    return handler;
  }

  removePoints () {
    return q.Promise((resolve) => {
      let points = this.points;
      if (!points || !points.length) { return resolve(); }
      q.all(points.map((p, id) => this.removePoint(p, id)))
        .then(() => {
          this.eventListeners = [];
          this.points = [];
        })
        .then(resolve);
    });
  }

  removePoint (point, id) {
    point.removeEventListener('click', this.eventListeners[id]);
    return q.Promise((resolve) => {
      new TimelineMax()
        .to(point, 0.1, { opacity: 0 })
        .addCallback(() => {
          this.view.removeChild(point);
          resolve();
        });
    });
  }

  hide () {
    return q.Promise((resolve) => {
      this.removePoints()
        .then(() => {
          new TimelineMax()
            .to(this.img, 0.2, { opacity: 0 })
            .addCallback(() => {
              this.img.src = '';
              resolve();
            });
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
    return q.Promise((resolve) => {

      let maxW = window.innerWidth - window.innerWidth / 10;
      let maxH = window.innerHeight - window.innerHeight / 10;

      // screen is wide enough, back to original dimensions
      if (this.imgSize.w < maxW && this.imgSize.h < maxH) {
        this.scale = 1;
      }

      else {
        let hRatio = maxH / this.imgSize.h;
        let vRatio = maxW / this.imgSize.w;

        if (vRatio > hRatio) { this.scale = hRatio; }
        else { this.scale = vRatio; }
      }

      if (immediate) {
        TweenMax.set(this.img, { scale: this.scale });
        resolve();
      }
      else {
        new TimelineMax()
          .to(this.img, 0.2, { scale: this.scale })
          .addCallback(resolve);
      }

    });
  }

  replacePoints () {
    if (!this.points.length) { return; }
    let rect = this.img.getBoundingClientRect();
    let pointsScenario = this.cells[this.index].points;
    this.points.forEach((point, index) => {
      TweenMax.to(point, 0.3, {
        x: rect.left + pointsScenario[index].x * this.scale - 25,
        y: rect.top + pointsScenario[index].y * this.scale - 25,
        ease: 'Back.easeInOut'
      });
    });
  }

  isLastCell () {
    return this.index === this.cells.length - 1;
  }

  isFirstCell () {
    return this.index === 0;
  }

}
