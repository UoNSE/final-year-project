define(function (require) {

	var Backbone = require('backbone');

	return Backbone.View.extend({

		render: function () {
			this.trigger('render');
		},

		back: function () {
			this.trigger('back');
		}

	});

});
