define(function (require) {
	'use strict';

	let Component = require('core/Component');
	let TWEEN = require('tweenjs');
	let Vector2 = require('math/Vector2');

	let Hint = require('component/hint/Hint');

	let Panel = require('component/panel/Panel');
	let PanelModel =  require('model/Panel');


	return Component.extend({
		classes: 'reflection',

		initialize: function (inventory, params) {
			Component.prototype.initialize.apply(this, arguments);
			this.add(new Hint({
				model: {text: 'Reflect on your learning from this scenario'}
			}));
			let text = [
				'What are three of the most important things that you have learned from this scenario?',
				'What actions will you take in clinical practice as a result of your learning from this scenario?',
				'If you had been in Kristy\'s position, how you would have broken the news that Mr Tien\'s cognitive state would probably not improve significantly?',
				'What have you learned about cultural awareness from this scenario that you can apply to your practice?',
				'How did Kristy demonstrate person-centred care in this scenario?'
			];
			let panels = this.createPanels(text);
			this.animate(panels);
		},

		createPanels: function (text) {
			let panels = [];
			text.forEach(text => {
				panels.push(this.add(this.createPanel(text)));
			});
			return panels;
		},

		createPanel: function (body) {
			return new Panel({
				model: new PanelModel({
					title: null,
					width: 300,
					body: body
				})
			});
		},

		animate: function (panels) {
			let delay  = 50;
			let totalTime = 1500;
			let size = panels.length;
			// hack
			let xValues = [-310, 0, 310, -200, 110];
			panels.forEach((panel, i) => {
				let sign = i < size * 0.5 ? 1 : -1;
				let x = xValues[i];
				let y = 100 * sign;
				let to = new Vector2(x, y);
				new TWEEN.Tween(panel.position)
					.to(to)
					.delay(i * delay)
					.easing(TWEEN.Easing.Elastic.Out)
					.start();

				new TWEEN.Tween(panel.scale)
					.to(Vector2.ones(), totalTime)
					.delay(i * delay)
					.easing(TWEEN.Easing.Elastic.Out)
					.start();
			});
		}

	});


});