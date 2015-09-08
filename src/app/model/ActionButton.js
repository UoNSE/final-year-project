define(function (require) {

	var _ = require('underscore');

	var Button = require('model/Button');

	var ActionButton = Button.extend({

		defaults: {
			icon: null
		}

	});

	_.extend(ActionButton.prototype.defaults, Button.prototype.defaults);

	return ActionButton;

});

