define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/cases/Cases.hbs');
	var Cases = require('collection/Cases');
	var Case = require('component/cases/case/Case');
	var TWEEN = require('tweenjs');
	var Vector2 = require('math/Vector2');

	return Component.extend({

		template: template,
		classes: ['cases-container'],
		styles: ['component/cases/Cases.css'],

		collection: new Cases(),

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			this.cases = [];
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
				newCase.position.set(0, 0);
				newCase.scale.set(0, 0);
				this.cases.push(newCase);
				this.add(newCase);
			}.bind(this));
		},

		onLoad: function () {
			var radius = 200; // The distance each case is from the center
			var delay  = 50; // The delay between each case animating, creating the 'spiral' effect
			var totalTime = 1500; // The total time of each animation
			var n = this.cases.length;
			this.cases.forEach(function (theCase, i) {

				new TWEEN.Tween(theCase.position)
					.to(Vector2.fromPolar(radius, i / n * Math.TAU), totalTime)
					.delay(i * delay)
					.easing(TWEEN.Easing.Elastic.Out)
					.start();

				new TWEEN.Tween(theCase.scale)
					.to(Vector2.ones(), totalTime)
					.delay(i * delay)
					.easing(TWEEN.Easing.Elastic.Out)
					.start();

			}, this);
		}

	});
});
