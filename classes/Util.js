require('gsap');
var q = require('q');

class Util {

  static loadImage (src) {
    var def = q.defer();
    var img = new Image();
    img.src = 'app/img/' + src;
    img.onload = function () { def.resolve(); };
    img.onerror = function () { def.reject(); };
    return def.promise;
  }

  static createEl (type, cssclass, parent, hide) {
    var el = document.createElement(type);
    if (cssclass) { el.classList.add(cssclass); }
    if (hide) {
      TweenMax.set(el, { opacity: 0 });
    }
    if (parent) { parent.appendChild(el); }
    return el;
  }

}

export default Util;
