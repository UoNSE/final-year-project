define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Collection.extend({
		urlRoot: 'http://localhost:3000',
		url: function () {
			return this.urlRoot + this.urlFragment
		}
	});

});
