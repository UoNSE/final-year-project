define(function (require) {
    'use strict';

    var Component = require('core/Component');
    var Model = require('model/Issue');
    var template = require('text!component/activity/issues/topic/issue/Issue.hbs');

    return Component.extend({
        topicId: null,
        template:template,

        events: {
            'click .issue': 'onClick'
        },

        initialize: function (params) {
            Component.prototype.initialize.apply(this, arguments);
            this.topicId = params.topicId;

            this.purchased = false;

            this.model = new Model({
                body: params.name,
                cost: params.cost,
                color: 'blue',
                styles: {
                    width: 150,
                    height: 150
                }
            });
        },

        onClick: function(event) {
            this.trigger('issueSelected',this);
        },

        canPurchase: function(availableCredit){
            if ( this.purchased ){
                return false;
            }
            return availableCredit >= this.model.get('cost');
        },

        purchase: function(){
            this.purchased = true;
            this.model.set({color:'red'});
        },

        getCost: function(){
            return this.model.get('cost');
        }
    });
});