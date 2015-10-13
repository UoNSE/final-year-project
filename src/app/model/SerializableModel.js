define(function (require, exports, module) {

	var Backbone = require('backbone');

	return Backbone.RelationalModel.extend({
		id: module.id
	});

});
