define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var template = require('text!view/CaseOverview.html');
	var styles = [
		'../resources/css/case-overview.css'
	];

	return Backbone.View.extend({
		template: Handlebars.compile(template),
		styles: styles,
		render: function () {
			// Get all the buttons from the view.
			var buttons = $('.case-overview button');
			// Iterate through every button except for the last.
			for (var i = 0, len = buttons.length - 1; i < len; i++) {
				// Get the current button.
				var button = $(buttons[i]);
			}
		}
	});

});
