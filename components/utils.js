'use strict';

export default {

  create: function (type, className, parent) {
    var el = document.createElement(type);
    if (className) {
      el.classList.add(className);
    }
    if (parent) {
      parent.appendChild(el);
    }
    return el;
  }

};
