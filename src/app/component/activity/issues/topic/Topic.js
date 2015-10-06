define(function (require) {
    'use strict';

    var ActionButton = require('component/actionbutton/ActionButton');
    var ActionButtonModel = require('model/ActionButton');

    var TWEEN = require('tweenjs');
    var Vector2 = require('math/Vector2');

    return ActionButton.extend({
        topicId: null,

        initialize: function (params) {
            ActionButton.prototype.initialize.apply(this, arguments);
            this.issues = [];

            this.topicId = params.topicId;

            this.model = new ActionButtonModel({
                text: params.name,
                color: 'purple',
                styles: {
                    width: 150,
                    height: 150
                }
            });
        },

        addIssue: function (issue) {
            this.issues.push(issue);
        },

        onClick: function( event ){
            this.trigger('topicSelected',this);

            var radius = 200;
            var n = this.issues.length;

            this.issues.forEach(function(theIssue,index){
                theIssue.show();
                theIssue.position.set(0,0);

                new TWEEN.Tween(theIssue.position)
                    .to(Vector2.fromPolar(radius, index / n * Math.TAU), 1500)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .start();
            },this);
        },

        hideIssues: function() {
            this.issues.forEach(function(theIssue,index){
                theIssue.hide();
            });
        }
    });
});