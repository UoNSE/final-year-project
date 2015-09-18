define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/testresult/TestResult.hbs');
	var Evidence = require('component/activity/issues/card/evidence/Evidence');
	var EvidenceCollection = require('collection/Evidence');
	var EvidenceModel = require('model/Evidence');

	return Component.extend({
		template: template,
		classes: 'urine-analysis',
		styles: 'component/activity/virtualpatient/tests/testresult/TestResult.css',
		events:{
			'click #hide-chart-button': '_onHide',
			'click .flag-btn-high': '_addHighEvidenceCard',
			'click .flag-btn-low': '_addLowEvidenceCard',

		},
		initialize: function (results) {
			Component.prototype.initialize.apply(this, arguments);
			this.results = results;
			// debugger;
			// var TestResultResult = TestResults[0];
		},

		createTestResults: function () {
			this.add(new EvidenceCard());
		},

		_onHide: function(){
			this.hide();
		},
		_addHighEvidenceCard: function(){
			this._addEvidenceCard("high");
		},
		_addLowEvidenceCard: function(){
			this._addEvidenceCard("low");
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

		_addEvidenceCard: function(flag){
			// console.log(flag);
			var metric = "Glucose";
			var target = this.addEvidence(new EvidenceModel({
				width: 200,
				height: 100,
				title: 'Evidence',
				color: 'info',
				body: metric + "is "+flag + "\n" + "</br>"
			}));
			// var yTarget = button.position.y;
			target.position.y = yTarget;
			target.position.x = 200;
			target.hide();
			// button.add(target);
			// button.on('click', this.onToggleButton.bind(this, target));
		}

	});

});
