(function () {
     let d = document;

     function init() {
          //Links
          let anchor0Link = d.getElementById('anchor0Link');
          let anchor1Link = d.getElementById('anchor1Link');
          let anchor2Link = d.getElementById('anchor2Link');
          let anchor3Link = d.getElementById('anchor3Link');
          let anchor4Link = d.getElementById('anchor4Link');
          let anchor5Link = d.getElementById('anchor5Link');

          //Anchors
          let anchor0 = d.getElementById('area0');
          let anchor1 = d.getElementById('area1');
          let anchor2 = d.getElementById('area2');
          let anchor3 = d.getElementById('area3');
          let anchor4 = d.getElementById('area4');
          let anchor5 = d.getElementById('area5');

          anchor0Link.addEventListener('click', (e) => { scrollTo(anchor0, e) }, false);
          anchor1Link.addEventListener('click', (e) => { scrollTo(anchor1, e) }, false);
          anchor2Link.addEventListener('click', (e) => { scrollTo(anchor2, e) }, false);
          anchor3Link.addEventListener('click', (e) => { scrollTo(anchor3, e) }, false);
          anchor4Link.addEventListener('click', (e) => { scrollTo(anchor4, e) }, false);
          anchor5Link.addEventListener('click', (e) => { scrollTo(anchor5.offsetTop, e) }, false);

          console.log(anchor2); //DEBUG
          console.log('anchor0: ' + scrollTopValue(anchor0) + ' / ' + offsetTopValue(anchor0)); //DEBUG
          console.log('anchor1: ' + scrollTopValue(anchor1) + ' / ' + offsetTopValue(anchor1)); //DEBUG
          console.log('anchor2: ' + scrollTopValue(anchor2) + ' / ' + offsetTopValue(anchor2)); //DEBUG
          console.log('anchor3: ' + scrollTopValue(anchor3) + ' / ' + offsetTopValue(anchor3)); //DEBUG
          console.log('anchor4: ' + scrollTopValue(anchor4) + ' / ' + offsetTopValue(anchor4)); //DEBUG
          console.log('anchor5: ' + scrollTopValue(anchor4) + ' / ' + offsetTopValue(anchor5)); //DEBUG 
          // d.addEventListener('scroll', (e) => { console.log(e) }, false); //DEBUG

          console.log('App loaded. Have fun!');
     }

     function scrollTopValue(domElement) { //DEBUG
          return 'scrollTopValue:', domElement.scrollTop;
     }
     function offsetTopValue(domElement) { //DEBUG
          return 'offsetTopValue:', domElement.offsetTop;
     }

     //cf. https://gist.github.com/james2doyle/5694700
     // requestAnimationFrame for Smart Animating https://goo.gl/sx5sts
     var requestAnimFrame = (function () {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
               window.setTimeout(callback, 1000 / 60);
          };
     })();

     function scrollTo(to, callback, duration = 1500) { //FIXME this always starts from '0', instead of the clicked element offsetTop -> This is because the position is calculated for the main <html> element, not the <iframe>'s <html> tag
		/*console.log('from:', from); //DEBUG
		// console.log('from.clientY:', from.clientY); //DEBUG
		// console.log('from.target.offsetTop:', from.target.offsetTop); //DEBUG
		
		// console.log('position():', document.documentElement.offsetTop || document.body.parentNode.offsetTop || document.body.offsetTop); //DEBUG
		// console.log('document.documentElement:', document.documentElement); //DEBUG
		// console.log('document.body:', document.body); //DEBUG
		let start;
		
		if (isMouseEvent(from)) { //FIXME : the scroll starts at the link, not where the screen really is : fix that
			// start = from.target.offsetTop;
			start = from.pageY; //FIXME
		}
		else {
			start = from;
		}*/

          if (isDomElement(to)) {
               // console.log('this is an element:', to); //DEBUG
               to = to.offsetTop;
          }
		/*else {
			// console.log('this is NOT an element:', to); //DEBUG
		}*/

          // because it's so fucking difficult to detect the scrolling element, just move them all
          function move(amount) {
               // document.scrollingElement.scrollTop = amount; //FIXME Test that
               document.documentElement.scrollTop = amount;
               document.body.parentNode.scrollTop = amount;
               document.body.scrollTop = amount;
          }

          function position() {
               return document.documentElement.offsetTop || document.body.parentNode.offsetTop || document.body.offsetTop;
          }

          var start = position(),
               change = to - start,
               currentTime = 0,
               increment = 20;
          console.log('start:', start); //DEBUG
          console.log('to:', to); //DEBUG
          console.log('change:', change); //DEBUG

          var animateScroll = function () {
               // increment the time
               currentTime += increment;
               // find the value with the quadratic in-out easing function
               var val = Math.easeInOutQuad(currentTime, start, change, duration);
               // move the document.body
               move(val);
               // do the animation unless its over
               if (currentTime < duration) {
                    requestAnimFrame(animateScroll);
               }
               else {
                    if (callback && typeof (callback) === 'function') {
                         // the animation is done so lets callback
                         callback();
                    }
               }
          };

          animateScroll();
     }

     init();
})();

Math.easeInOutQuad = function (t, b, c, d) {
     t /= d / 2;
     if (t < 1) {
          return c / 2 * t * t + b
     }
     t--;
     return -c / 2 * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function (t, b, c, d) {
     var tc = (t /= d) * t * t;
     return b + c * (tc);
};

Math.inOutQuintic = function (t, b, c, d) {
     var ts = (t /= d) * t,
          tc = ts * t;
     return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

function isDomElement(obj) {
     return obj instanceof Element;
}

function isMouseEvent(obj) {
     return obj instanceof MouseEvent;
}

function findScrollingElement(element) { //FIXME Test this too
     do {
          if (element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth) {
               return element;
          }
     } while (element = element.parentNode);
}

// GOTOP

