define(function (require) {

	'use strict';

	var ViewController = require('controller/ViewController');
	var template = require('text!component/cases/case/CaseView.html');

	return ViewController.extend({

		template: template

	});

});
