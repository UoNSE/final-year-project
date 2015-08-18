define(function(require){

  //TODO: make cards draggable
  //TODO: make hotspot from data

  var $ = require('jquery');
  var ViewController = require('controller/ViewController');
  var Animate = require('behaviour/Animate');

  var styles = [
    'virtual-patient.css'
  ];


  return ViewController.extend({

    collection: 'Patients',
    styles: styles,
    selector: '#virtual-patient-img',


    events: {
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

      // draggables
      $('#patients-chart-table').draggable();
      $('#virtual-patient-img-container').draggable();
      $(".card").draggable();


      $('#patients-chart-table').hide();
      $('#hide-chart-button').hide();
      $('.test-card').hide();
      $('.results-card').hide();


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

    // var menuItems = $('.virtual-patient-component-container .menu .menu-item');
    // var distance = 100;
    // var min = 3 * Math.PI / 4 ;
    // var max = 5 * Math.PI / 4;
    // Animate.scale($('.virtual-patient-component-container .title'));
    // for (var i = 0, len = menuItems.length; i < len; i++) {
    //     var menuItem = $(menuItems[i]);
    //     var angle = min + ((i / len) * (max - min));
    //     var width = Math.abs($(menuItem.children(0)).width() * 0.5 - $(menuItem.children(1)).width() * 0.5);
    //     Animate.scale(menuItem, {
    //         delay: i * 50,
    //         animate: {
    //             top: -distance * Math.sin(angle),
    //             left: distance * Math.cos(angle) - width
    //         }
    //     });
    // }

    if($('.test-card').is(":visible")){
        $('.test-card').hide();

    }else{
        $('.test-card').show();

    }




    },
    _testResults: function () {

    // TODO: explode options
    if($('.results-card').is(":visible")){
        $('.results-card').hide();

    }else{
        $('.results-card').show();

    }

    }


  });
});
