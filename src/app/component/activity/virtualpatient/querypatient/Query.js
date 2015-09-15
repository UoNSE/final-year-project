define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/querypatient/Query.hbs');

	var Button = require('component/button/Button');
	var ButtonModel = require('model/Button');

	var EvidenceCard = require('component/activity/virtualpatient/evidencefeed/evidencecard/EvidenceCard');


	return Component.extend({
		template: template,
		classes: 'queries',
		styles: 'component/activity/virtualpatient/querypatient/Query.css',

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
			this.createMenuButton('What is the problem?');
			this.createMenuButton('Where does it hurt?');
			this.createMenuButton('When did the pain begin?');

		},

		createMenuButton: function(label){
			var button = this.createButton(label, 'info');
			this.yOffset = this.yOffset+50;
			// console.log(this.yoffset);
			button.position.set(0, this.yOffset);

			var target = null;

			// console.log(label);

			if(label==='What is the problem?'){
				target = new EvidenceCard();
			}
			else if (label==='Where does it hurt?') {
				target = new EvidenceCard();
			}
			else if (label==='When did the pain begin?'){
				// debugger;
				target = new EvidenceCard();
				// target = new EvidenceCard({model: this.UrineAnalysisResult});
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
