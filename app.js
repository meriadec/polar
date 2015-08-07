import './style.css';
import 'gsap';

import scenario from './scenario';
import Loader from './components/Loader';

var loader = new Loader();

// load global scenario
loader.loadScenario(scenario);

// show spinner for first story
loader.showSpinnerFor('cadavreTete')
  .then(() => {
    console.debug('>> [cadavretete] is ready');
    loader.showSpinnerFor('main')
      .then(() => {
        console.debug('>> [main] is ready');
      });
  });
