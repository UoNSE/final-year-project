define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/Tests.hbs');

	var Button = require('component/button/Button');
	var ButtonModel = require('model/Button');

	var UrineAnalysis = require('component/activity/virtualpatient/tests/urineanalysis/UrineAnalysis');
	var BloodTest = require('component/activity/virtualpatient/tests/bloodtest/BloodTest');
	var Scan = require('component/activity/virtualpatient/tests/scan/Scan');
	var Patients = require('collection/TestResults');

	return Component.extend({
		template: template,
		classes: 'tests',
		styles: 'component/activity/virtualpatient/tests/Tests.css',
		// collection: new TestResults(),


		initialize: function (testresults) {
			Component.prototype.initialize.apply(this, arguments);

			this.testresults = testresults;
			this.UrineAnalysisResult = this.testresults.get(1);
			// debugger;
			this.createTestMenu();
			// this.collection = testresults;
			// this.testresults = this.collection;
			// this.UrineAnalysisResult = this.testresults.get(1);


			// this.UrineAnalysisResult = this.testresults[0];
			// debugger;
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

		createTestMenu: function(){

			// for all menu items in collection, add menu item
			this.yOffset = 50;
			var testMenu = [];
			this.createMenuButton('Blood Test');
			// this.createMenuButton('Blood Pressure');
			this.createMenuButton('Xray');
			this.createMenuButton('CTScan');
			this.createMenuButton('Urine');

		},

		createMenuButton: function(label){
			var button = this.createButton(label, 'info');
			this.yOffset = this.yOffset+50;
			// console.log(this.yoffset);
			button.position.set(0, this.yOffset);

			var target = null;

			// console.log(label);

			if(label==='Blood Test'){
				target = new BloodTest();
			}
			else if (label==='Blood Pressure') {
				target = new BloodTest();
			}
			else if (label==='Xray' || label ==='CTScan') {
				target = new Scan();
			}
			else if (label==='Urine'){
				// debugger;
				target = new UrineAnalysis({model: this.UrineAnalysisResult});
				// target = new UrineAnalysis();
				// debugger;

			}
			else{}

			target.position.x = 0;
			target.hide();

			button.add(target);
			button.on('click', this.onToggleTest.bind(this, target));

			return this.add(button);
		}

	});

});
