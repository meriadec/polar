import './style.css';
import 'gsap';

import scenario from './scenario';
import Player from './components/Player';

var player = new Player(scenario);

player.load('main');
