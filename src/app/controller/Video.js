define(function (require) {

	var Backbone = require('backbone');

	return Backbone.View.extend({
		tagName: 'video',
		className: 'item',
		attributes: {
			src: 'http://www.w3schools.com/html/mov_bbb.mp4',
			type: 'video/mp4',
			autoplay: true,
			loop: true,
			muted: true
		}
	});

});
