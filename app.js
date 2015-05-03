// styles

require('./style.css');

// gsap globals... this is ugly :

require('gsap');
require('./node_modules/gsap/src/minified/plugins/ScrollToPlugin.min');

// core

import Player from './classes/Player.js';

var polar = new Player(require('./scenario'));

polar.load(function () {
  polar.play('third');
});
