define(function (require) {
	'use strict';

	var $ = require('jquery');
	var Handlebars = require('handlebars');

	$.fn.insertAt = function (index, element) {
		var lastIndex = this.children().size();
		if (index < 0) {
			index = Math.max(0, lastIndex + 1 + index)
		}
		this.append(element);
		if (index < lastIndex) {
			this.children().eq(index).before(this.children().last())
		}
		return this;
	};

	if (Math.TAU === undefined) {
		Math.TAU = 2 * Math.PI;
	}


	// http://stackoverflow.com/a/12397602/868679
	Handlebars.registerHelper('breaklines', function (text) {
		text = Handlebars.Utils.escapeExpression(text);
		text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
		return new Handlebars.SafeString(text);
	});

	Handlebars.registerHelper('units', function (value) {
		return value + 'px';
	});

	Handlebars.registerHelper('mtl-color', function (colour) {
		var colours = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
		// Check if the colour is not in the colours array.
		if (colours.indexOf(colour) === -1) {
			// Prepend material to the colour when not from the theme.
			colour = 'material-' + colour;
		}
		return colour;
	});
});

