define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/emptytestresult/TestResult.hbs');
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
		initialize: function (vproot,results) {
			Component.prototype.initialize.apply(this, arguments);
			this.vproot = vproot;
			this.model = results;
			this.results = results;
			// debugger;
			// var TestResultResult = TestResults[0];
		},

		createTestResults: function () {

		},

		_onHide: function(){
			this.hide();
		},
		_addHighEvidenceCard: function(){
			// debugger;
			this.result = event.target.parentElement.parentElement.id;
			this._addEvidenceCard("high");
		},
		_addLowEvidenceCard: function(){
			this.result = event.target.parentElement.parentElement.id;
			this._addEvidenceCard("low");
			// this.parent.parent.parent._addEvidenceCard("low");
		},

		_addEvidenceCard: function(flag){
			// console.log(flag);
			var metric = this.result;
			var evidenceCard = this.addEvidence(new EvidenceModel({
				width: 200,
				height: 100,
				title: 'Evidence',
				color: 'info',
				body: metric + " is "+flag
			}));

			evidenceCard.position.x = 200;
			this.vproot.add(evidenceCard);

		},


		addEvidence: function (model) {

			// var evidence = this.add(new Evidence({
			var evidence = add(new Evidence({
				model: model
			}));
			// this.bindDraggableEvents(evidence);
			return evidence;
		}

	});

});
