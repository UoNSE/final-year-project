define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/querypatient/Query.hbs');

	var Button = require('component/button/Button');
	var ButtonModel = require('model/Button');

	var Evidence = require('component/activity/issues/card/evidence/Evidence');
	var EvidenceCollection = require('collection/Evidence');
	var EvidenceModel = require('model/Evidence');
	// var Zim = require('behaviour/ZIndexManager');


	return Component.extend({
		template: template,
		classes: 'queries',
		styles: ['component/activity/virtualpatient/querypatient/Query.css',
		// 'component/activity/virtualpatient/Panel.css'
		'component/activity/virtualpatient/VirtualPatient.css'
		],

		initialize: function (testresults) {
			Component.prototype.initialize.apply(this, arguments);

			// this.testresults = testresults;
			// this.UrineAnalysisResult = this.testresults.get(1);
			this.createTestMenu();

		},

		bindDraggableEvents: function (component) {
			component.on({
				drag: this.onDrag.bind(this),
				dragendsink: this.onDrop.bind(this)
			});
		},

		createButton: function (text, color) {
			return new Button({
				model: new ButtonModel({
					text: text,
					color: color
				})
			});
		},

		onToggleButton: function (button, event) {
			if(button.visible){
				button.children().foreach(child => {
					child.hide();
				});
			}
			// button.children.hide();
			button.toggle();
		},

		createTestMenu: function(){

			// for all menu items in collection, add menu item
			this.yOffset = 50;
			var testMenu = [];
			this.createMenuButton('What is the problem?');
			this.createMenuButton('Where does it hurt?');
			this.createMenuButton('Have you noticed any swelling?');
			this.createMenuButton('When did the pain begin?');

		},

		addEvidence: function (model) {
			// var evidence = this.add(new Evidence());
			var evidence = this.addEvidence(new EvidenceModel({
				width: this.width,
				height: this.height,
				title: 'test',
				body: 'hello',
				color: 'info'
			}));
			var scale = i - ((n - 1) / 2);
			card.position.set(300, scale * (distance + card.model.get('height')));
			return evidence;
		},

		/**
		 * Iterates through the evidence collection and adds the cards to the view.
		 *
		 * @param model The evidence model.
		 * @returns {*}
		 */
		addEvidence: function (model) {
			var evidence = this.add(new Evidence({
				model: model
			}));
			// this.bindDraggableEvents(evidence);
			return evidence;
		},

		createMenuButton: function(label){
			var button = this.createButton(label, 'info');
			this.yOffset = this.yOffset+60;
			// console.log(this.yoffset);
			button.position.set(0, this.yOffset);

			var target = null;

			// console.log(label);

			if(label==='What is the problem?'){
				var dummyData = "I hurt my knee";
				// target = new EvidenceCard(dummyData);
				target = this.addEvidence(new EvidenceModel({
					width: 200,
					height: 100,
					title: 'Evidence',
					color: 'info'
				}));
				// this.Zim.bringToFront(target);

			}
			else if (label==='Where does it hurt?') {
				var dummyData = "I hurt my knee";
				target = this.addEvidence(new EvidenceModel({
					width: 200,
					height: 100,
					title: 'Evidence',
					color: 'info'
				}));
			}
			if(label==='Have you noticed any swelling?'){
				var dummyData = "Yes, in my hand";
				// target = new EvidenceCard(dummyData);
				target = this.addEvidence(new EvidenceModel({
					width: 200,
					height: 100,
					title: 'Evidence',
					color: 'info'
				}));
			}
			else if (label==='When did the pain begin?'){
				var dummyData = "I hurt my knee";
				target = this.addEvidence(new EvidenceModel({
					width: 200,
					height: 100,
					title: 'Evidence',
					color: 'info'
				}));

			}
			else{}

			target.position.x = 200;
			target.hide();

			button.add(target);
			button.on('click', this.onToggleButton.bind(this, target));

			return this.add(button);
		}

	});

});
