define(function (require) {

	'use strict';

	var bdd = require('intern!bdd');
	var expect = require('intern/chai!expect');
	var Transform = require('math/Transform');
	var Vector2 = require('math/Vector2');

	bdd.describe('the Transform module', function () {

		bdd.it('a Transform applied with its inverse should be an identity', function () {

			var transform = new Transform();
			transform.position.set(2, 5, 13);
			transform.rotation = Math.PI / 4;
			transform.scale.set(0.4, 0.4);

			var inverse = transform.getInverse();

			var result = transform.clone().applyTransform(inverse);

			// TODO
			var epsilon = 1E-5;
			expect(result.position.x).to.be.closeTo(0, epsilon);
			expect(result.position.y).to.be.closeTo(0, epsilon);
			expect(result.rotation).to.be.closeTo(0, epsilon);
			expect(result.scale.x).to.be.closeTo(1, epsilon);
			expect(result.scale.y).to.be.closeTo(1, epsilon);

		});

		bdd.it('applying a Transform to a Vector2 and then applying its inverse should result in the original vector', function () {

			var transform = new Transform();
			transform.position.set(2, 5, 13);
			transform.rotation = Math.PI / 4;
			transform.scale.set(0.4, 0.4);

			var inverse = transform.getInverse();

			var vector = new Vector2(3.4, -9.5);

			var result = vector.applyTransform(transform).applyTransform(inverse);

			// TODO
			var epsilon = 1E-5;
			expect(result.x).to.be.closeTo(3.4, epsilon);
			expect(result.y).to.be.closeTo(-9.5, epsilon);

		});

	});

});
