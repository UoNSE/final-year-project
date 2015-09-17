define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/bloodtest/BloodTest.hbs');
	var Button = require('component/button/Button');
	var ButtonModel = require('model/Button');
	var TestResult = require('component/activity/virtualpatient/tests/testresult/TestResult');


	return Component.extend({
		template: template,
		classes: 'blood-test',
		styles: 'component/activity/virtualpatient/tests/bloodtest/BloodTest.css',

		initialize: function (results) {
			Component.prototype.initialize.apply(this, arguments);
			// TODO: pull menu items from json to create menu, and set each button to have target like parent menu.
			this.createTestMenu();

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
			this.yOffset = -50;
			this.createMenuButton('CBC');
			this.createMenuButton('ESR');
			this.createMenuButton('Glucose');
			this.createMenuButton('Lipoprotein');
			this.createMenuButton('ELISA');
			this.createMenuButton('STD');
			this.createMenuButton('Western Blot');
			this.createMenuButton('Liver Function');
			this.createMenuButton('Hormones');

		},

		createMenuButton: function(label){
			var button = this.createButton(label, 'primary');
			this.yOffset = this.yOffset+50;
			// console.log(this.yoffset);
			button.position.set(0, this.yOffset);

			var target = null;
			var target = new TestResult();


			// console.log(label);

			if(label==='Blood Test'){
				target = new BloodTest();
				target.position.x = 275;
			}
			else if (label==='Xray' || label ==='CTScan') {
				target = new Scan();
			}
			else if (label==='Urine'){
				// target = new TestResult({model: this.UrineAnalysisResult});
				target = new TestResult(this.UrineAnalysisResult);
			}
			else{}

			// target.position.x = 0;
			target.hide();

			button.add(target);
			button.on('click', this.onToggleTest.bind(this, target));

			return this.add(button);
		}

	});


});
