define(function (require) {

    var Collection = require('collection/Collection');
    var InfoGroup = require('model/InfoGroup');

    return Collection.extend({
        model: InfoGroup,
        urlFragment: '/infogroup'
    });

});
