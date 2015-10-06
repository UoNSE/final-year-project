define(function(require){
    "use strict";

    let Backbone = require('backbone');

    let IssueGoalPair = require('model/IssueGoalPair');

    /**
     * @class IssueGoalMatches
     */
    let IssueGoalMatches = Backbone.Collection.extend({
        model: IssueGoalPair
    });

    return IssueGoalMatches;

});