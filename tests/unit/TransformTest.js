define(function (require) {
	'use strict';

	var bdd = require('intern!bdd');
	var expect = require('intern/chai!expect');
	var Transform = require('math/Transform');
	var Vector2 = require('math/Vector2');
	require('tests/helpers/AlmostEqual');

	bdd.describe('the Transform module', function () {

		bdd.it('a Transform applied with its inverse should be an identity', function () {

			var transform = new Transform();
			transform.position.set(2, 5, 13);
			transform.rotation = Math.PI / 4;
			transform.scale.set(0.4, 0.4);

			var inverse = transform.getInverse();

			var result = transform.clone().applyTransform(inverse);

			expect(result).to.be.almost.equal(new Transform());

		});

		bdd.it('applying a Transform to a Vector2 and then applying its inverse should result in the original vector', function () {

			var transform = new Transform();
			transform.position.set(2, 5, 13);
			transform.rotation = Math.PI / 4;
			transform.scale.set(0.4, 0.4);

			var inverse = transform.getInverse();

			var vector = new Vector2(3.4, -9.5);

			var result = vector.applyTransform(transform).applyTransform(inverse);

			expect(result).to.be.almost.equal(vector);

		});

		bdd.it('Transforms should be chainable', function () {

			var transformA = new Transform();
			transformA.position.set(2, 3);
			transformA.rotation = Math.PI / 2;
			transformA.scale.set(2, 2);

			var transformB = new Transform();
			transformB.position.set(3, 4);
			transformB.rotation = -Math.PI;
			transformB.scale.set(1.5, 1.5);

			var transformC = new Transform();
			transformC.position.set(-8, 1);
			transformC.rotation = Math.PI / 2;
			transformC.scale.set(0.5, 0.5);

			var result = new Transform()
				.applyTransform(transformA)
				.applyTransform(transformB)
				.applyTransform(transformC);

			console.log(result);
			console.log(result.rotation);
		});

	});

});
