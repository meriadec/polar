'use strict';

import _ from 'lodash';
import q from 'q';

import utils from './utils';

var spinnerSrc = 'ui/loading-spinner-resized.png';

export default class Loader {

  constructor () {

    this.promises = {};
    this.story = null;

    // create elems
    this.loaderContainer = utils.create('div', 'loader');
    this.loaderContent = utils.create('div', 'content');
    this.loaderSpinner = utils.create('img', 'loading-spinner');
    this.loaderPercent = utils.create('div', 'loading-percent');

    // create structure
    this.loaderContent.appendChild(this.loaderPercent);
    this.loaderContent.appendChild(this.loaderSpinner);
    this.loaderContainer.appendChild(this.loaderContent);

    // set spinner image
    this.loaderSpinner.src = spinnerSrc;

    // add promise to spinner image load
    this.spinnerImageLoaded = q.Promise((resolve, reject) => {
      var img = new Image();
      img.src = spinnerSrc;
      img.onload = resolve;
      img.onerror = reject;
    });

  }

  /**
   * Load an entire scenario images
   *
   * @param {Object} scenario
   */
  loadScenario (scenario) {
    _.forEach(scenario, (story, storyName) => {
      this.promises[storyName] = createStoryLoader(story, storyName);
    });
  }

  whenLoaded (storyName) {
    return q.all(this.promises[storyName].promises);
  }

  /**
   * Show a spinner for the given storyLoad
   *
   * @param storyName
   */
  showSpinnerFor (storyName) {

    // keep a ref into current showed story
    this.story = this.promises[storyName];

    // hide spinner
    this.loaderSpinner.style.opacity = 0;

    // put loader into page
    document.body.appendChild(this.loaderContainer);

    // wait for spinner loaded
    this.spinnerImageLoaded.then(() => {
      TweenMax.to(this.loaderSpinner, 0.5, { opacity: 1 });
    });

    // animate percent
    this.animatePercent();

  }

  animatePercent () {
    if (!this.story) { return; }
    this.loaderPercent.innerHTML = this.story.percent + '%';
    requestAnimationFrame(this.animatePercent.bind(this));
  }

  hideSpinner () {
    this.loaderPercent.innerHTML = '100%';
    return q.Promise((resolve) => {
      this.story = null;
      new TimelineMax()
        .to(this.loaderContainer, 1, { opacity: 0, scale: 0.8 })
        .addCallback(resolve);
    });
  }

}

function createStoryLoader (story, storyName) {
  var storyLoader = {
    total: story.cells.length,
    loaded: 0,
    percent: 0,
    promises: story.cells.map((cell) => {
      return q.Promise((resolve, reject) => {
        var img = new Image();
        img.src = 'img/' + cell.src;
        img.onerror = reject;
        img.onload = () => {
          ++storyLoader.loaded;
          storyLoader.percent = Math.round((storyLoader.loaded / storyLoader.total) * 100);
          if (storyLoader.percent === 100) {
            console.log('>> story ' + storyName + ' loaded');
          }
          resolve();
        };
      });
    })
  };
  return storyLoader;
}
