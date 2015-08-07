'use strict';

import q from 'q';
import _ from 'lodash';

import Story from './Story';
import Loader from './Loader';
import util from './utils';

export default class Player {

  constructor (scenario) {

    // for prevent bugs
    this.busy = false;

    // create viewport
    this.view = util.create('div', 'view', document.body);

    // create loader
    this.loader = new Loader();
    this.loader.loadScenario(scenario);

    // create stories
    this.stories = _.mapValues(scenario, story => new Story(story, this.view));

    // story currently showed
    this.story = null;

    // add i/o events
    this.addEvents();

  }

  addEvents () {

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
    util.handleSwipe(this.next.bind(this), this.prev.bind(this));

  }

  resize () {
    this.story.resize();
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

}
