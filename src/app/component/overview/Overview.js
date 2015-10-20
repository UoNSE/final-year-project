define(function (require) {
	'use strict';

	let Component = require('core/Component');
	let template = require('text!component/overview/Overview.hbs');

	let ActionButton = require('model/ActionButton');
	let Timeline = require('component/timeline/Timeline');
	let Hint = require('component/hint/Hint');

	return Component.extend({

		template: template,
		styles: 'case-overview.css',

		initialize: function (overview, params) {
			Component.prototype.initialize.apply(this, arguments);
			this.add(new Timeline({model: overview}));
			var hint = this.add(new Hint({model: {text: 'Tap an activity below'}}));
			hint.position.y = 120;
		}

	});

});
