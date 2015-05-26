define(function (require) {

	var Backbone = require('backbone');

	return Backbone.View.extend({
		tagName: 'img',
		className: 'item',
		attributes: {
			src: 'resources/images/box.gif'
		}
	});

});
