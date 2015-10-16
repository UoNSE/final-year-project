define(function (require) {

	var _ = require('underscore');
	var Button = require('model/Button');

	var ActionButton = Button.extend({});

	_.extend(ActionButton.prototype.defaults, Button.prototype.defaults, {icon: null});

	return ActionButton;

});

