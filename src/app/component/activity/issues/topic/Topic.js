define(function (require) {

    'use strict';

    var ViewController = require('controller/ViewController');
    var template = require('text!component/Issues_Evidence/topic/TopicView.html');

    return ViewController.extend({

        template: template,

        initialize: function () {
            ViewController.prototype.initialize.apply(this, arguments);
            this.render();
        }

    });

});
