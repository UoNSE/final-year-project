define(function (require) {
    'use strict';

    var TWEEN = require('tweenjs');

    var Vector2 = require('math/Vector2');

    var Panel = require('component/panel/Panel');

    return Panel.extend({
        initialize: function () {
            this.originalPosititon = null;
            this.hangTime = 3000;
            this.animationTime = 900;

            this.hide();
        },

        setOriginalPosition: function ( pos ) {
            this.originalPosititon = pos;
        },

        popup: function ( popupPos ) {
            this.show();

            var tween = new TWEEN.Tween(this.position)
                .to(popupPos,this.animationTime)
                .easing(TWEEN.Easing.Elastic.Out);

            var tweenBack = new TWEEN.Tween(this.position)
                .to(this.originalPosititon,this.animationTime)
                .delay(this.hangTime)
                .easing(TWEEN.Easing.Elastic.In)
                .onComplete(function() {
                    this.hide();
                }.bind(this));

            tween.chain(tweenBack);

            tween.start();
        }

    });

});