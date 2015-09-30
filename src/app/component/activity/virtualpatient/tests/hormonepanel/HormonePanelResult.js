define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/hormonepanel/HormonePanelResult.hbs');
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
		initialize: function (params) {
			Component.prototype.initialize.apply(this, arguments);
			this.vproot = params.vproot;
			this.model = params.model;
		},

		createTestResults: function () {

		},

		_onHide: function(){
			this.hide();
		},
		_addHighEvidenceCard: function(){
			var clicked = event.target.parentElement.parentElement;
			this.metric = clicked.id;
			this._addEvidenceCard(clicked,"high");

		},
		_addLowEvidenceCard: function(){
			var clicked = event.target.parentElement.parentElement;
			this.metric = clicked.id;
			this._addEvidenceCard(clicked,"low");
		},

		_addEvidenceCard: function(clicked, flag){
			// var metric = this.result;
			var evidenceCard = this.addEvidence(new EvidenceModel({
				width: 200,
				height: 100,
				title: 'Evidence',
				color: 'info',
				body: clicked.id + " is "+flag
			}));

			evidenceCard.position.x = 200;
			this.vproot.add(evidenceCard);

		},

		addEvidence: function (model) {

			var evidence = new Evidence({
				model: model
			});
			return evidence;
		}

	});

});
