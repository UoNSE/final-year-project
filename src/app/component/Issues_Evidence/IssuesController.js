define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');

    return ViewController.extend({

        collection: 'Cases',

        events: {
            'click .title': '_onTitle'
        },

        _onAfterRender: function () {
            var Issues = $('.identify-issues .issues .issue');
            var Evidencelist = $('.identify-issues .evidences .evidence');
            var distance = 375;
            var min = 3 * Math.PI / 4;
            var max = 5 * Math.PI / 4;
            Animate.scale($('.title'));
            for (var i = 0, len = Issues.length; i < len; i++) {
                var Issue = $(Issues[i]);
                var angle = min + ((i / len) * (max - min));
                var width = Math.abs($(Issue.children(0)).width() * 0.5 - $(Issue.children(1)).width() * 0.5);
                Animate.scale(Issue, {
                    delay: i * 50,
                    animate: {
                        top: -distance * Math.sin(angle),
                        left: distance * Math.cos(angle) - width
                    }
                });
            }
        },

        _onTitle: function(){
            this.back();
        }


    });

});
