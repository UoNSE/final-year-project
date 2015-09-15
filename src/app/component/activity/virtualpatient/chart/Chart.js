define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/chart/Chart.hbs');

	return Component.extend({
		template: template,
		classes: 'chart',
		styles: 'component/activity/virtualpatient/chart/Chart.css',

		events:{
			'click #hide-chart-button': '_onHide'
		},
		initialize: function(patient){
			Component.prototype.initialize.apply(this, arguments);
			// this.collection = patient;
		},
		_onHide: function(){
			this.hide();
		}

	});

});
