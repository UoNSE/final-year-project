define(function (require) {
	'use strict';

	var $ = require('jquery');

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
});

