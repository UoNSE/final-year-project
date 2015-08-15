define(function(require){
  var $ = require('jquery');
  var ViewController = require('controller/ViewController');
  var Animate = require('behaviour/Animate');

  var styles = [
    'virtual-patient.css'
  ];

  var virtual_patient_img_url =  'resources/images/androg.front.jpg';


  return ViewController.extend({

    collection: 'Patients',
    styles: styles,
    selector: '#virtual-patient-img',


    events: {
      'click .case-information .title': '_onTitle',
      'click #context': '_onContext',
      'click #background': '_onBackground',
      'click #flip-patient-button': '_flipPatient',
      'click #question-patient-button': '_questionPatient',
      'click #test-request-button': '_testRequests',
      'click #test-results-button': '_testResults',
      'click #patients-chart-button': '_showPatientsChart',
      'click #hide-chart-button': '_hidePatientsChart',

    },
    _onAfterRender: function () {

    },

    _onReady: function () {
      this.listenTo(this.collection, 'add', this.render);
      //this.collection.add({name: 'New'});

      $('#patients-chart-table').draggable();
      $('#patients-chart-table').hide();
      $('#hide-chart-button').hide();

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
    _showPatientsChart: function() {

      $('#patients-chart-table').show();
      $('#hide-chart-button').show();
      $('#patients-chart-button').hide();

    },

    _hidePatientsChart: function() {

      $('#patients-chart-table').hide();
      $('#hide-chart-button').hide();
      $('#patients-chart-button').show();

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
