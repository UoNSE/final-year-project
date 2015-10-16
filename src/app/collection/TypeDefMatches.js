define(function(require){
    "use strict";

    let Backbone = require('backbone');

    let TypeDefPair = require('model/TypeDefPair');

    /**
     * @class IssueGoalMatches
     */
    let TypeDefMatches = Backbone.Collection.extend({
        model: TypeDefPair
    });

    return TypeDefMatches;

});