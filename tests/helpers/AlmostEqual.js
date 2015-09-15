define(function (require) {
	'use strict';

	var use = require('intern/chai!use');
	var Assertion = require('intern/chai!Assertion');

	var Transform = require('math/Transform');
	var Vector2 = require('math/Vector2');

	use(function (chai, utils) {
		Assertion.addProperty('almost', function () {
			utils.flag(this, 'almost', true);
		});

		Assertion.overwriteMethod('equal', function (_super) {
			return function equal(exp, precision) {
				var object = utils.flag(this, 'object');
				var isAlmost = utils.flag(this, 'almost');

				if (precision === undefined) {
					precision = 1E-7;
				}
				if (isAlmost && object instanceof Transform) {
					let assertion = new Assertion(object);
					assertion.assert(new Assertion(assertion._obj.position.x).to.be.closeTo(exp.position.x, precision));
					assertion.assert(new Assertion(assertion._obj.position.y).to.be.closeTo(exp.position.y, precision));
					assertion.assert(new Assertion(assertion._obj.rotation).to.be.closeTo(exp.rotation, precision));
					assertion.assert(new Assertion(assertion._obj.scale.x).to.be.closeTo(exp.scale.x, precision));
					assertion.assert(new Assertion(assertion._obj.scale.y).to.be.closeTo(exp.scale.y, precision));
					return assertion;
				}
				else if (isAlmost && object instanceof Vector2) {
					let assertion = new Assertion(object);
					assertion.assert(new Assertion(assertion._obj.x).to.be.closeTo(exp.x, precision));
					assertion.assert(new Assertion(assertion._obj.y).to.be.closeTo(exp.y, precision));
					return assertion;
				} else {
					_super.apply(this, arguments);
				}
			};
		});
	});
});
