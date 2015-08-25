define(function (require) {

	'use strict';

	var ViewController = require('controller/ViewController');
	var template = require('text!component/Issues_Evidence/issue/IssueView.html');

	var MultiTouchManager = require('behaviour/MultiTouchManager').getInstance();
	var DraggableBehaviour = require('behaviour/DraggableBehaviour');
	var $ = require('jquery');

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
