define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/overview/Overview.hbs');

	var ActionButtons = require('collection/ActionButtons');
	var Timeline = require('component/timeline/Timeline');
	var Hint = require('component/hint/Hint');

	return Component.extend({

		template: template,
		styles: 'case-overview.css',

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			this.add(new Timeline({
				collection: new ActionButtons([
					{text: 'Case Information', href: 'cases/' + this.model.id + '/information'},
					{text: 'Identify Issues', href: this.getActivityLink('issues'), disabled: true},
					{text: 'Goals and Actions', href: this.getActivityLink('goals'), disabled: true},
					{text: 'Reflection', href: this.getActivityLink('reflection'), disabled: true}
				])
			}));
			var hint = this.add(new Hint({
				model: {text: 'Tap an activity below'}
			}));
			hint.position.y = 100;
		},

		getActivityLink: function (name) {
			return 'cases/' + this.model.id + '/activity/' + name;
		}

	});

});
