define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/cases/Cases.hbs');
	var Cases = require('collection/Cases');
	var Case = require('component/cases/case/Case');

	return Component.extend({

		template: template,

		events: {
		},

		collection: new Cases(),

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			this.listenTo(this.collection, 'sync', this.onSync);
			this.collection.fetch();
		},

		onSync: function (collection) {
			var length = collection.length;
			var colorClasses = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan',
				'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange'];
			collection.each(function (model, i) {
				var newCase = new Case({
					model: {
						case: model,
						color: colorClasses[Math.round(i * colorClasses.length / length)]
					}
				});
				newCase.position.setPolar(200, i / length * Math.TAU);
				this.add(newCase);
			}.bind(this));
		}

	});
});
