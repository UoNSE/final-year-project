define(function (require) {

    var Collection = require('collection/Collection');
    var Action = require('model/Action');

    return Collection.extend({
        model: Action,
        urlFragment: '/actions'
    });

});