define(function(require){
  var $ = require('jquery');
  var Controller = require('controller/Controller');
  var Animate = require('behaviour/Animate');

  var styles = [
    'virtual-patient.css'
  ];

  return Controller.extend({
    styles: styles,

    events: {
      'click .case-information .title': '_onTitle',
      'click #context': '_onContext',
      'click #background': '_onBackground'
    },
    _onAfterRender: function () {


    },

    _onTitle: function () {
      this.back();
    },

    _onPatientBackground: function () {
      // TODO
    },

    _onContext: function () {
      // TODO
    },

    _onBackground: function () {
      Animate.scaleOut($('.case-information'), {
        duration: 500,
        easing: 'easeInBack'
      });
    }

  });
});
