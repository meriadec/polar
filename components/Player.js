'use strict';

import q from 'q';
import _ from 'lodash';

import Story from './Story';
import Loader from './Loader';
import utils from './utils';

export default class Player {

  constructor (scenario) {

    // for prevent bugs
    this.busy = false;

    // create viewport
    let view = utils.create('div', 'view', document.body);

    // create image
    let img = utils.create('img', 'cell', view);

    // create loader
    this.loader = new Loader();
    this.loader.loadScenario(scenario);

    // create stories
    this.stories = _.mapValues(
      scenario,
      story => new Story(story, view, img, { onPointClick: this.onPointClick })
    );

    // story currently showed
    this.story = null;

    // add i/o events
    this.addEvents();

  }

  addEvents () {

    console.debug('Add global listeners');

    // resize view on window resize
    window.addEventListener('resize', _.debounce(this.resize.bind(this), 100), false);

    // navigate forward through click
    document.addEventListener('click', this.next.bind(this), false);

    // navigate forward and backward through keyboard
    document.addEventListener('keydown', (e) => {
      switch (e.which) {
        case 37: this.prev(); break;
        case 32: this.next(); break;
        case 39: this.next(); break;
      }
    }, false);

    // navigate forward and backward through swipe
    utils.handleSwipe(this.next.bind(this), this.prev.bind(this));

  }

  resize () {
    this.story.resize()
      .then(this.story.replacePoints.bind(this.story));
  }

  prev () {

    if (this.busy) { return; }

    // check if it's first cell
    if (this.story.isFirstCell()) { return; }

    // else, go to next cell of story
    this.busy = true;
    this.story.hide()
      .then(this.story.prev.bind(this.story))
      .then(this.show.bind(this));

  }

  next () {

    if (this.busy) { return; }

    // check if it's last cell
    if (this.story.isLastCell()) {

      // check if we need to redirect after last cell
      if (this.story.finish) {
        this.load(this.story.finish);
      }

    }

    // else, go to next cell of story
    else {
      this.busy = true;
      this.story.hide()
        .then(this.story.next.bind(this.story))
        .then(this.show.bind(this));
    }

  }

  load (storyName) {
    return q.Promise((resolve, reject) => {
      this.busy = true;
      this.loader.showSpinnerFor(storyName)
        .then(() => {
          if (this.story) { return this.story.hide(); }
        })
        .then(() => {
          this.story = this.stories[storyName];
          return this.show();
        })
        .then(resolve)
        .catch(reject);
    });
  }

  show () {
    return q.Promise((resolve, reject) => {
      this.story.show()
        .then(() => { this.busy = false; })
        .then(resolve)
        .catch(reject);
    });
  }

  onPointClick (p) {
    console.log('PPPPPP>>>', p);
  }

}
