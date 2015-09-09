define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/Tests.hbs');

	var Button = require('component/button/Button');
	var ButtonModel = require('model/Button');

	var UrineAnalysis = require('component/activity/virtualpatient/tests/urineanalysis/UrineAnalysis');
	var BloodTest = require('component/activity/virtualpatient/tests/bloodtest/BloodTest');
	var Scan = require('component/activity/virtualpatient/tests/scan/Scan');


	return Component.extend({
		template: template,
		classes: 'tests',
		styles: 'component/activity/virtualpatient/tests/Tests.css',

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			var offset = 0;

			// this.urineAnalysis = this.createUrineAnalysis(offset, 0);
			// this.bloodTest = this.createBloodTest(offset, 50);
			// this.xray = this.createXray(offset, 100);
			// this.ctscan = this.createCTScan(offset, 150);
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
			this.yOffset = 0;
			this.addMenuItem('Blood Test');
			// this.addMenuItem('Blood Pressure');
			this.addMenuItem('Xray');
			this.addMenuItem('CTScan');
			this.addMenuItem('Urine');

		},

		addMenuItem: function(label){
			var button = this.createButton(label, 'info');
			this.yOffset = this.yOffset+50;
			console.log(this.yoffset);
			button.position.set(0, this.yOffset);

			var clickable = null;

			console.log(label);

			if(label==='Blood Test'){
				clickable = new BloodTest();
			}
			else if (label==='Blood Pressure') {
				clickable = new BloodTest();
			}
			else if (label==='Xray' || label ==='CTScan') {
				clickable = new Scan();
			}
			else if (label==='Urine'){
				clickable = new UrineAnalysis();
			}
			else{}

			clickable.position.x = 0;
			clickable.hide();

			button.add(clickable);
			button.on('click', this.onToggleTest.bind(this, clickable));

			return this.add(button);
		},

		// createXray: function (x, y) {
		//
		// 	var button = this.createButton('Xray', 'info');
		// 	button.position.set(-x, y);
		//
		// 	var xray = new Scan();
		//
		// 	xray.position.x = x;
		// 	xray.hide();
		//
		// 	button.add(xray);
		// 	button.on('click', this.onToggleTest.bind(this, xray));
		//
		// 	return this.add(button);
		//
		// },
		//
		// createCTScan: function (x, y) {
		//
		// 	var button = this.createButton('CTScan', 'info');
		// 	button.position.set(-x, y);
		//
		// 	var ctscan = new Scan();
		//
		// 	ctscan.position.x = x;
		// 	ctscan.hide();
		//
		// 	button.add(ctscan);
		// 	button.on('click', this.onToggleTest.bind(this, ctscan));
		//
		// 	return this.add(button);
		//
		// },
		//
		// createUrineAnalysis: function (x, y) {
		//
		// 	var button = this.createButton('Urine', 'info');
		// 	button.position.set(-x, y);
		//
		// 	var urineAnalysis = new UrineAnalysis();
		//
		// 	urineAnalysis.position.x = x;
		// 	urineAnalysis.hide();
		//
		// 	button.add(urineAnalysis);
		// 	button.on('click', this.onToggleTest.bind(this, urineAnalysis));
		//
		// 	return this.add(button);
		//
		// },
		//
		// createBloodTest: function (x, y) {
		//
		// 	var button = this.createButton('Blood Test', 'info');
		// 	button.position.set(-x, y);
		//
		// 	var bloodTest = new BloodTest();
		//
		// 	bloodTest.position.x = x;
		// 	bloodTest.hide();
		//
		// 	button.add(bloodTest);
		// 	button.on('click', this.onToggleTest.bind(this, bloodTest));
		//
		// 	return this.add(button);
		//
		// }

	});

});
