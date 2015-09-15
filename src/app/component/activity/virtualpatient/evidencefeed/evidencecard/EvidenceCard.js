define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/evidencefeed/evidencecard/EvidenceCard.hbs');

	return Component.extend({
		template: template,
		classes: 'Evidence-card',
		styles: 'component/activity/virtualpatient/evidencefeed/evidencecard/EvidenceCard.css',

        initialize: function (dummyData) {
            Component.prototype.initialize.apply(this, arguments);

            this.dummyData = dummyData;
			
            this.class = "observation"; // or speech

        }
	});

});
