define(function (require) {
	'use strict';

	var Component = require('core/Component');

	var Case = require('component/cases/case/Case');
	var Hint = require('component/hint/Hint');

	var Cases = require('collection/Cases');
	var ActionButton = require('model/ActionButton');
	var Timeline = require('model/Timeline');

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
				let id = model.get('id');
				let currentCase = new Case({
					model: new ActionButton({
						caseId: id,
						text: model.get('name'),
						color: colorClasses[Math.round(i * colorClasses.length / length)],
						href: 'cases/' + id + '/overview'
					})
				});

				currentCase.position.set(0, 0);
				currentCase.scale.set(0, 0);
				this.listenTo(currentCase, 'click', this.onClick.bind(this, currentCase));
				this.cases.push(currentCase);
				this.add(currentCase);
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
		},

		onClick: function (button) {
			let model = button.model;
			let id = model.get('caseId');
			let overview = new Timeline();
			let buttons = overview.get('buttons');
			let link = (name) => {
				return 'cases/' + id + '/activity/' + name;
			};

			buttons.add(new ActionButton({text: 'Case Information', href: 'cases/' + id + '/information'}));
			buttons.add(new ActionButton({text: 'Identify Issues', href: link('issues'), disabled: true}));
			buttons.add(new ActionButton({text: 'Goals and Actions', href: link('goals'), disabled: true}));
			buttons.add(new ActionButton({text: 'Reflection', href: link('reflection'), disabled: true}));

			// todo remove hack
			app.session.set('case', {
				overview: overview
			});
		}

	});
});
