define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/Tests.hbs');

	var Button = require('component/button/Button');
	var ButtonModel = require('model/Button');

	var TestResult = require('component/activity/virtualpatient/tests/testresult/TestResult');
	var BloodTest = require('component/activity/virtualpatient/tests/bloodtest/BloodTest');
	var Scan = require('component/activity/virtualpatient/tests/scan/Scan');
	var Patients = require('collection/TestResults');

	return Component.extend({
		template: template,
		classes: 'tests',
		styles: 'component/activity/virtualpatient/tests/Tests.css',
		// collection: new TestResults(),


		initialize: function (vproot,testresults) {
			Component.prototype.initialize.apply(this, arguments);

			this.testresults = testresults;
			this.UrineAnalysisResult = this.testresults.get(1);
			this.vproot = vproot;
			// console.log(this.vproot);

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

		onToggleTarget: function (target, event) {
			target.toggle();

			if(target != this.bloodtestmenu){
				this.bloodtestmenu.hide();
			}

		},

		createTestMenu: function(){
			// for all menu items in collection, add menu item
			this.yOffset = 50;
			this.createMenuButton('Blood Test');
			this.createMenuButton('Xray');
			this.createMenuButton('CTScan');
			this.createMenuButton('Urine');

		},

		createMenuButton: function(label){
			var button = this.createButton(label, 'primary');
			this.yOffset = this.yOffset+50;
			// console.log(this.yoffset);
			button.position.set(0, this.yOffset);

			var target = null;

			// console.log(label);

			if(label==='Blood Test'){
				target = new BloodTest(this.vproot, this.testresults);
				this.bloodtestmenu = target;
				target.position.x = 275;
			}
			else if (label==='Xray' || label ==='CTScan') {
				target = new Scan();
			}
			else if (label==='Urine'){
				target = new TestResult({vproot: this.vproot, model:this.UrineAnalysisResult});
				// target = new TestResult(this.vproot,{model:this.UrineAnalysisResult});
				// target = new TestResult(this.vproot,{model: this.UrineAnalysisResult});
				// target = new TestResult({model:this.UrineAnalysisResult});
				// target = new TestResult(this.UrineAnalysisResult);
			}
			else{}

			// target.position.x = 0;
			target.setInteractive();
			target.hide();

			button.add(target);
			button.on('click', this.onToggleTarget.bind(this, target));
			return this.add(button);
		}

	});

});
