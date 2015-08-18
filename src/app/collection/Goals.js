define(function (require) {

    var Collection = require('collection/Collection');
    var Goal = require('model/Goal');

    return Collection.extend({
        model: Goal,
        urlFragment: '/goals',

        search: function(letters) {
            var pattern = new RegExp(letters,"gi");
            return (this.filter(function(goal) {
                return pattern.test(goal.get("content"));
            }));
        }

    });

});