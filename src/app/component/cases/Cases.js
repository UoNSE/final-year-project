define(function (require) {
	'use strict';

	var Component = require('core/Component');

	var Case = require('component/cases/case/Case');
	var Hint = require('component/hint/Hint');

	var Cases = require('collection/Cases');
	var ActionButton = require('model/ActionButton');

	var TWEEN = require('tweenjs');
	var Vector2 = require('math/Vector2');

	return Component.extend({
		classes: 'cases-container',
		styles: 'component/cases/Cases.css',

		collection: new Cases(),

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			this.cases = [];
			this.listenTo(this.collection, 'sync', this.onSync);
			this.collection.fetch();

			this.hint = this.add(new Hint({
				model: {text: 'Pick a Case'}
			}));
			this.hint.scale.set(0, 0);
			new TWEEN.Tween(this.hint.scale)
				.to(Vector2.ones(), 2000)
				.easing(TWEEN.Easing.Elastic.Out)
				.start()
		},

		onSync: function (collection) {
			var length = collection.length;
			var colorClasses = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan',
				'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange'];
			collection.each((model, i) => {
				var newCase = new Case({
					model: new ActionButton({
						text: model.get('name'),
						color: colorClasses[Math.round(i * colorClasses.length / length)],
						href: 'cases/' + model.get('id') + '/overview'
					})
				});
				newCase.position.set(0, 0);
				newCase.scale.set(0, 0);
				this.cases.push(newCase);
				this.add(newCase);
			});
			this.animate();
		},

		animate: function () {
			var radius = 200; // The distance each case is from the center
			var delay  = 50; // The delay between each case animating, creating the 'spiral' effect
			var totalTime = 1500; // The total time of each animation
			var n = this.cases.length;
			this.cases.forEach((theCase, i) => {
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
			});
		}
	});
});
