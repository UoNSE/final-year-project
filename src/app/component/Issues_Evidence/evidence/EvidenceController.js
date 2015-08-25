define(function (require) {

	'use strict';

	var $ = require('jquery');

	var ViewController = require('controller/ViewController');
	var template = require('text!component/Issues_Evidence/evidence/EvidenceView.html');

	var MultiTouchManager = require('behaviour/MultiTouchManager').getInstance();
	var DraggableBehaviour = require('behaviour/DraggableBehaviour');

	return ViewController.extend({

		template: template,

		initialize: function () {
			ViewController.prototype.initialize.apply(this, arguments);
			this.render();
			MultiTouchManager.addElementRTS(this.el);
			MultiTouchManager.addElementDraggable(this.el);
		}

	});

});
