// TODO: merge the transformable items changes into current branch.
//TODO: change saveIssue to saveEvidence. i overlooked thgis for the demo.
//      here the patient collects evidence. the issues/evidence is for synthesis
//      of this evidence into issues.
//TODO: on hover event when evidence cards (observations/responses)
//      are dragged onto save evidence button.
// TODO: save evidence to JSON.
// TODO: convert current demo format into backbones format with models and subviews.
//TODO: hide opened menus when another menu is opened.
//TODO: fix charts showing up at start (should be hidden by default).
//      onready calls dont seem to be working atm. were pre-brendans demo,
//       am guessing this was to optimise the demo,
//       but am not sure atm how to restore.
//TODO: make hotspot from data
// TODO: change hide-chart when opened to keep button there but change text to
// hide chart as it is more consistent with other buttons.

define(function(require){

    //TODO: make cards draggable
    //TODO: make hotspot from data

    var $ = require('jquery');
    var glm = require('glmatrix');
    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour'); //

    var styles = [
        'virtual-patient.css'
    ];

    return ViewController.extend({

        elements: $(),
        multitouch: MultiTouchManager.getInstance(),
        collection: 'Patients',
        styles: 'virtual-patient.css', //default styles: styles,
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
      'click #question-card': '_questionCard',
      'click #results-card1': '_showUrineAnalysisChart',
      'click #hide-chart-button2': '_hideUrineAnalysisChart'

        },
        onAfterRender: function () {
            this._addItems();
        },

        _addItems: function () {
            //---------------------------------------------
            var transformableResources = [
                //'<div style="background-color:#00f;width:100px;height:100px"></div>',
                $('#patients-chart-table').get(), // //jquery fetch things
                $('#speech-card').get(),
                $('#observation-card2').get(),
                $('#observation-card3').get(),
                $('#observation-card4').get()
            ]; // [a,b,c...

            var transforms = [
                //[glm.vec3.fromValues(-300, 0, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0], //(translate,,) (scale,,)
                [glm.vec3.fromValues(300, 0, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],

                [glm.vec3.fromValues(0, 300, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
                [glm.vec3.fromValues(100, 300, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
                [glm.vec3.fromValues(500, 300, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
                [glm.vec3.fromValues(-100, 300, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0]
            ];
            var numItems  = transformableResources.length;
            for (var i =0; i<numItems; i++) {
                var element = $(transformableResources[i]);
                element.addClass("abs-center").appendTo(this.$el);
                element.css('transform', transforms[i]);

                var multiTouchElement = this.multitouch.addElement(element);
                var behaviour = new RotateTranslateScaleBehaviour(multiTouchElement);
                multiTouchElement.addBehaviour(behaviour);
                glm.vec3.copy(behaviour.translation, transforms[i][0]);
                glm.vec3.copy(behaviour.scale, transforms[i][1]);
                glm.vec3.copy(behaviour.rotation, transforms[i][2]);
                behaviour.needsUpdate();
                this.elements = this.elements.add(element);
            }


        },

        onReady: function () {
            this.listenTo(this.collection, 'add', this.render);
            //this.collection.add({name: 'New'});

      // draggables

      //hidden
      $('#patients-chart-table').hide();
      $('#urine-analysis-results').hide();
      $('#hide-chart-button').hide();
      $('.test-card').hide();
      $('.results-card').hide();
      $('.question-card').hide();
      $('.question-card').hide();
      $('#speech-card2').hide();



        },

        _flipPatient: function () {

            var virtual_patient_img = $('#virtual-patient-img');
            if (virtual_patient_img.attr("src") === "resources/images/androg.front.jpg") {
                virtual_patient_img.attr("src", "resources/images/androg.back.jpg");
            }
            else {
                virtual_patient_img.attr("src", "resources/images/androg.front.jpg");
            }

        },
        _showPatientsChart: function () {
            $('#patients-chart-table').show();
            $('#hide-chart-button').show();
            $('#patients-chart-button').hide();

        },


    _hidePatientsChart: function() {

            $('#patients-chart-table').hide();
            $('#hide-chart-button').hide();
            $('#patients-chart-button').show();

        },

    _showUrineAnalysisChart: function() {

      $('#urine-analysis-results').show();
      $('#hide-chart-button2').show();

    },

    _hideUrineAnalysisChart: function() {

      $('#urine-analysis-results').hide();
      $('#hide-chart-button2').hide();

    },

    // hideOtherMenus()

    _questionPatient: function () {

    // TODO: explode options
        if($('.question-card').is(":visible")){
            $('.question-card').hide();

        }else{
            $('.question-card').show();

        }


    },

    _questionCard: function(){
    $('#speech-card2').show();
    },


    _testRequests: function () {

            // TODO: explode options


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
