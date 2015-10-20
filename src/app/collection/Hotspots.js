define(function (require) {

	var Collection = require('collection/Collection');
	var Hotspot = require('model/Hotspot');

	return Collection.extend({
		model: Hotspot,
		urlFragment: '/hotspots'
	});

});
