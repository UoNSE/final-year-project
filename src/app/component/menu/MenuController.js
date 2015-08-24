define(function (require) {

	var ViewController = require('controller/ViewController');

	return ViewController.extend({

		onBeforeRender: function () {
			this.addChildView('#content', 'component/start/Start');
		}

	});

});
