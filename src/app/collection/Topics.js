define(function (require) {

    var Collection = require('collection/Collection');
    var Topic = require('model/Topic');

    return Collection.extend({
        model: Topic,
        urlFragment: '/topics'
    });

});
