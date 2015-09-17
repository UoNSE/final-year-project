define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/scan/Scan.hbs');

	return Component.extend({
		template: template,
		classes: 'scan',
		styles: 'component/activity/virtualpatient/tests/scan/Scan.css',
		events:{
			'click #hide-chart-button': '_onHide'
		},
		initialize: function (results) {
			Component.prototype.initialize.apply(this, arguments);

		},
		_onHide: function(){
			this.hide();
		}

	});

});
