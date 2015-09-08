define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/Tests.hbs');

	var Button = require('component/button/Button');
	var ButtonModel = require('model/Button');

	var UrineAnalysis = require('component/activity/virtualpatient/tests/urineanalysis/UrineAnalysis');
	var BloodTest = require('component/activity/virtualpatient/tests/bloodtest/BloodTest');

	return Component.extend({
		template: template,
		classes: 'tests',
		styles: 'component/activity/virtualpatient/tests/Tests.css',

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			var offset = 300;

			this.urineAnalysis = this.createUrineAnalysis(offset, 0);
			this.bloodTest = this.createBloodTest(offset, 50);
		},

		createButton: function (text, color) {
			return new Button({
				model: new ButtonModel({
					text: text,
					color: color
				})
			});
		},

		onToggleTest: function (test, event) {
			test.toggle();
		},

		createUrineAnalysis: function (x, y) {

			var button = this.createButton('Urine Analysis', 'info');
			button.position.set(-x, y);

			var urineAnalysis = new UrineAnalysis();

			urineAnalysis.position.x = x;
			urineAnalysis.hide();

			button.add(urineAnalysis);
			button.on('click', this.onToggleTest.bind(this, urineAnalysis));

			return this.add(button);

		},

		createBloodTest: function (x, y) {

			var button = this.createButton('Blood Test', 'info');
			button.position.set(-x, y);

			var bloodTest = new BloodTest();

			bloodTest.position.x = x;
			bloodTest.hide();

			button.add(bloodTest);
			button.on('click', this.onToggleTest.bind(this, bloodTest));

			return this.add(button);

		}

	});

});
