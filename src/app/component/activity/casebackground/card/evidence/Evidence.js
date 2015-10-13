define(function (require) {

	'use strict';

	var Card = require('component/activity/issues/card/EscapedCard');

	return Card.extend({

		initialize: function () {
			Card.prototype.initialize.apply(this, arguments);
			this.setDroppable({types: Card});
		}

	});

});
