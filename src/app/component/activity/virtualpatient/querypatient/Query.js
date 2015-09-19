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
		// 'component/button/Button.css',
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

			// for all menu items in JSON make a button with a label
			// and give it a target

			this.menuBtn1 = this.createMenuButton('What is the problem?')

			this.addEvidenceTarget(this.menuBtn1, "I hurt my knee");

			var menuBtn2 = this.createMenuButton('Where does it hurt?');
			this.addEvidenceTarget(menuBtn2, "On my knee");

			var menuBtn3 = this.createMenuButton('When did the pain begin?');
			this.addEvidenceTarget(menuBtn3, "Yesterday");

			var menuBtn4 = this.createMenuButton('Have you noticed any swelling?');
			this.addEvidenceTarget(menuBtn4, "On my knee");

			var menuBtn5 = this.createMenuButton('Has your skin been dry?');
			this.addEvidenceTarget(menuBtn5, "No");

			var menuBtn6 = this.createMenuButton('How old are you?');
			this.addEvidenceTarget(menuBtn6, "Im 75");

			var menuBtn7 = this.createMenuButton('How have you been sleeping?');
			this.addEvidenceTarget(menuBtn7, "Not well. Iâ€™ve been waking up frequently.");

			var menuBtn8 = this.createMenuButton('Have you noticed any swelling?');
			this.addEvidenceTarget(menuBtn8, "On my knee");

			var menuBtn9 = this.createMenuButton('Do you have family here?');
			this.addEvidenceTarget(menuBtn9, "Yes, Toi song voi con gai cua toi");
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
			var button = this.createButton(label, 'primary');
			this.yOffset = this.yOffset+60;
			// console.log(this.yoffset);
			button.position.set(0, this.yOffset);

			return this.add(button);
		},

		addEvidenceTarget: function(button, dummy){
			var target = this.addEvidence(new EvidenceModel({
				width: 200,
				height: 100,
				title: 'Evidence',
				color: 'info',
				body: button.model.attributes.text + "\n" + "</br>" + dummy
			}));
			var yTarget = button.position.y;
			target.position.y = yTarget;
			target.position.x = 200;
			target.hide();
			button.add(target);
			button.on('click', this.onToggleButton.bind(this, target));
		}

	});

});
