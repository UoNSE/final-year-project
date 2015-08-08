define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Collection.extend({
		urlRoot: 'api',
		url: function () {
			return this.urlRoot + this.urlFragment
		}
	});

});
