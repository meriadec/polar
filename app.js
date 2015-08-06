import './style.css';
import 'gsap';

import scenario from './scenario';
import Loader from './components/Loader';

var loader = new Loader();

loader.loadScenario(scenario);
loader.showSpinnerFor('main');
loader.whenLoaded('main')
  .then(loader.hideSpinner.bind(loader))
  .then(function () {
    console.log('we are ready');
  });
