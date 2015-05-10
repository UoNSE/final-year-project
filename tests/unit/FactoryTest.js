define(function (require) {

	'use strict';

	var bdd = require('intern!bdd');
	var expect = require('intern/chai!expect');
	var Factory = require('app/Factory');

	bdd.describe('the Factory module', function () {

		var TestObject;

		bdd.before(function () {

			TestObject = function () {};

		});

		bdd.it('should be able to create a factory', function () {

			expect(Factory.createFactory(TestObject)).to.be.an.instanceof(Factory);

		});

		bdd.describe('the getInstance method', function () {

			var factory;

			bdd.beforeEach(function () {

				factory = Factory.createFactory(TestObject);

			});

			bdd.it('should be able to create a singleton using the factory', function () {

				expect(factory.getInstance()).to.equal(factory.getInstance());

			});

			bdd.it('should be create separate instances when passing false to getInstance', function () {

				expect(factory.getInstance(false)).to.not.equal(factory.getInstance(false));

			});

			bdd.it('should return the singleton when calling getInstance with no arguments', function () {

				expect(factory.getInstance()).to.equal(factory.getInstance(true));

			});

			bdd.it('should be create separate instances when using isSingleton = true and isSingleton = false', function () {

				expect(factory.getInstance(true)).to.not.equal(factory.getInstance(false));

			});

		});

	});

});
