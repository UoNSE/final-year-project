define(function(require){
  var $ = require('jquery');
  var ViewController = require('controller/ViewController');
  var Animate = require('behaviour/Animate');

  var styles = [
    'virtual-patient.css'
  ];

  var virtual_patient_img_url =  'resources/images/androg.front.jpg';


  return ViewController.extend({
    styles: styles,
    // virtual_patient_img_url: virtual_patient_img_url,
    virtual_patient_img_url:  'resources/images/androg.front.jpg',
    selector: '#virtual-patient-img',


    events: {
      'click .case-information .title': '_onTitle',
      'click #context': '_onContext',
      'click #background': '_onBackground',
      'click #flip-patient-button': '_flipPatient',
      'click #question-patient-button': '_questionPatient',
      'click #test-request-button': '_testRequests',
      'click #test-results-button': '_testResults',

    },
    _onAfterRender: function () {


    },

    _flipPatient: function () {

      var virtual_patient_img = $('#virtual-patient-img');
      if(virtual_patient_img.attr("src") ==="resources/images/androg.front.jpg"){
        virtual_patient_img.attr("src", "resources/images/androg.back.jpg");
      }
      else{
        virtual_patient_img.attr("src", "resources/images/androg.front.jpg");
      }


    },
    _questionPatient: function () {

    // TODO: explode options

    },
    _testRequests: function () {

    // TODO: explode options

    },
    _testResults: function () {

    // TODO: explode options

    }

  });
});
