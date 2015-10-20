define(function (require) {
    'use strict';

    var Backbone = require('backbone');
    var TWEEN = require('tweenjs');
    var Vector2 = require('math/Vector2');

    var Component = require('core/Component');

    var template = require('text!component/activity/issues/score/Score.hbs');

    return Component.extend({
        template : template,
        styles: 'component/activity/issues/score/Score.css',
        originX: -250,
        originY: -300,//TODO:position in relation to bottom of 'viewport'

        initialize: function (params) {
            params = params || {};

            Component.prototype.initialize.apply(this, arguments);
            this.model = new Backbone.Model({
                score:0,
                title: params.title || 'SCORE'
            });

            this.position.set(this.originX, this.originY);
        },

        setScore: function(score){
            this.model.set({score:score});
        },

        invalidAction: function(){
            this.position.x = this.originX;
            this.shake();
        }
    });
});