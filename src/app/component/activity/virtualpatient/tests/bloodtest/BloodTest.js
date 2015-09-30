define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/bloodtest/BloodTest.hbs');
	var Button = require('component/button/Button');
	var ButtonModel = require('model/Button');
	var EmptyTestResult = require('component/activity/virtualpatient/tests/emptytestresult/TestResult');
	var HormonePanelResult = require('component/activity/virtualpatient/tests/hormonepanel/HormonePanelResult');

	return Component.extend({
		template: template,
		classes: 'blood-test',
		styles: 'component/activity/virtualpatient/tests/bloodtest/BloodTest.css',

		initialize: function (vproot,results) {
			Component.prototype.initialize.apply(this, arguments);
			// TODO: pull menu items from json to create menu, and set each button to have target like parent menu.
			this.vproot = vproot;
			this.testresults = results;
			this.hormonepanelresult = this.testresults.get(2);
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

		// onToggleTest: function (test, event) {
		// 	test.toggle();
		//
		// },

		onToggleButton: function (button, event) {

			button.toggle();
			// button.children.detached = true;
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

			if (label === 'Hormones') {
				// target = new HormonePanelResult(this.vproot, this.hormonepanelresult);
				target = new HormonePanelResult({vproot: this.vproot, model:this.hormonepanelresult});
			}
			else{
				target = new EmptyTestResult();
			}

			target.hide();
			target.interactive = true;
			button.add(target);
			button.on('click', this.onToggleButton.bind(this, target));

			return this.add(button);
		}

	});


});
