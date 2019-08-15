((r, d, s)=> {
  'use strict';
  r.loadSkypeWebSdkAsync = r.loadSkypeWebSdkAsync || function(p) {
		let js, sjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(p.id)) { return; }
		js = d.createElement(s);
		js.id = p.id;
		js.src = p.scriptToLoad;
		js.onload = p.callback;
		sjs.parentNode.insertBefore(js, sjs);
	};
	let p = {
      scriptToLoad: '/js/SkypeBootstrap.min.js',
      id: 'skype_bootstrap',
      callback: function callback() {
        window.Skype.initialize({ apiKey: 'shareButton' }, (function () {}), function () {});
        },
      };
  loadSkypeWebSdkAsync(p);
})(window, document, 'script');
