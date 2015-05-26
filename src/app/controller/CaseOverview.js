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
			/*// Get all the buttons from the view.
			var buttons = $('.case-overview button');
			// Iterate through every button.
			for (var i = 0, len = buttons.length; i < len; i++) {
				// Get the current button.
				var button = $(buttons[i]);
				// Get the html of the button.
				var html = button.html();
				// To get the textwidth of a button, a span must be inserted and the width can then be obtained.
				var size = (button.html('<span>' + html + '</span>')).find('span:first').width();
				// Revert the html and adjust the width and height accordingly.
				button.html(html).width(size).height(size);
			}*/
		}
	});

});
