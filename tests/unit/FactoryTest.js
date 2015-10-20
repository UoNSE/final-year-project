define(function (require) {

	'use strict';

	var bdd = require('intern!bdd');
	var expect = require('intern/chai!expect');
	var Factory = require('Factory');

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

			bdd.it('should return an instance of the TestObject when using no arguments', function () {

				expect(factory.getInstance()).to.be.an.instanceof(TestObject);

			});

			bdd.it('should return an instance of the TestObject when using isSingleton = false', function () {

				expect(factory.getInstance(false)).to.be.an.instanceof(TestObject);

			});

			bdd.it('should return an instance of the TestObject when using isSingleton = true', function () {

				expect(factory.getInstance(true)).to.be.an.instanceof(TestObject);

			});

			bdd.it('should return the same instance when called multiple times', function () {

				expect(factory.getInstance()).to.equal(factory.getInstance());

			});

			bdd.it('should return the same instance when calling when using isSingleton = true or no arguments', function () {

				expect(factory.getInstance(true)).to.equal(factory.getInstance());

			});

			bdd.it('should return the same instance when calling multiple times when using isSingleton = true', function () {

				expect(factory.getInstance(true)).to.equal(factory.getInstance(true));

			});

			bdd.it('should create separate instances when using isSingleton = false', function () {

				expect(factory.getInstance(false)).to.not.equal(factory.getInstance(false));

			});

			bdd.it('should create separate instances when using isSingleton = true and isSingleton = false', function () {

				expect(factory.getInstance(true)).to.not.equal(factory.getInstance(false));

			});

		});

	});

});
