define(function (require) {

	'use strict';

	var bdd = require('intern!bdd');
	var should = require('intern/chai!should')();
	var Factory = require('app/Factory');

	bdd.describe('the Factory module', function () {

		var TestObject;

		bdd.before(function () {

			TestObject = function () {};

		});

		bdd.it('should be able to create a factory', function () {

			should.exist(Factory.createFactory(TestObject));

		});

		bdd.describe('the getInstance method', function () {

			var factory;

			bdd.before(function () {

				factory = Factory.createFactory(TestObject);

			});

			bdd.it('should be able to create a singleton using the factory', function () {

				factory.getInstance().should.equal(factory.getInstance());

			});

			bdd.it('should be create separate instances when passing false to getInstance', function () {

				factory.getInstance(false).should.not.equal(factory.getInstance(false));

			});

			bdd.it('should return the singleton when calling getInstance with no arguments', function () {

				factory.getInstance().should.equal(factory.getInstance(true));

			});

			bdd.it('should be create separate instances when using isSingleton = true and isSingleton = false', function () {

				factory.getInstance(true).should.not.equal(factory.getInstance(false));

			});

		});

	});

});
