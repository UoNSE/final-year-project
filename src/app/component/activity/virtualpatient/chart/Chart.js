define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/chart/Chart.hbs');
	var Evidence = require('component/activity/issues/card/evidence/Evidence');
	var EvidenceCollection = require('collection/Evidence');
	var EvidenceModel = require('model/Evidence');

	return Component.extend({
		template: template,
		classes: 'chart',
		styles: 'component/activity/virtualpatient/chart/Chart.css',

		events:{
			'click #hide-chart-button': '_onHide',
			'click .flag-btn-high': '_addHighEvidenceCard',
			'click .flag-btn-low': '_addLowEvidenceCard',
			'click .flag-btn-flag': '_addFlagEvidenceCard',

		},

		initialize: function(params){
			Component.prototype.initialize.apply(this, arguments);
			this.patient = params.model;
			this.vproot = params.vproot;
		},
		_onHide: function(){
			this.hide();
		},

		_addHighEvidenceCard: function(){
			var clickedTableRow = event.target.parentElement.parentElement;
			var metric = clickedTableRow.children.namedItem("value").innerHTML;
			this._addEvidenceCard(clickedTableRow,"high"+ "("+metric+")");
		},

		_addLowEvidenceCard: function(){
			var clickedTableRow = event.target.parentElement.parentElement;
			var metric = clickedTableRow.children.namedItem("value").innerHTML;
			this._addEvidenceCard(clickedTableRow,"low"+ " ("+metric+")");
		},

		_addFlagEvidenceCard: function(){
			var clickedTableRow = event.target.parentElement.parentElement;
			var metric = clickedTableRow.children.namedItem("value").innerHTML;
			this._addEvidenceCard(clickedTableRow,metric);
		},

		addEvidence: function (model) {
			var evidence = this.vproot.add(new Evidence({
				model: model
			}));
			return evidence;
		},

		_addEvidenceCard: function(clicked, flag){
			var evidenceCard = this.addEvidence(new EvidenceModel({
				width: 200,
				height: 100,
				title: 'Evidence',
				color: 'info',
				body: clicked.id + " is "+flag
			}));

			evidenceCard.position.x = 200;

		}

	});

});
