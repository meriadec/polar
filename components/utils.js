'use strict';

export default class Util {

  static create (type, className, parent) {
    var el = document.createElement(type);
    if (className) {
      el.classList.add(className);
    }
    if (parent) {
      parent.appendChild(el);
    }
    return el;
  }

  static handleSwipe (onSwipeLeft, onSwipeRight) {

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function handleTouchStart (evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    }

    function handleTouchMove (evt) {
      if (!xDown || !yDown) { return; }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) { onSwipeLeft(); }
        else { onSwipeRight(); }
      } else {
        if (yDiff > 0) { onSwipeLeft(); }
        else { onSwipeRight(); }
      }
      xDown = null;
      yDown = null;
    }

  }

}
