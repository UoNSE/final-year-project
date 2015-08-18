define(function (require) {

    //TODO: make cards draggable
    //TODO: make hotspot from data

    var $ = require('jquery');
    var glm = require('glmatrix');
    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');

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
            this._addItems();
        },

        _addItems: function () {
            //---------------------------------------------
            var transformableResources = [
                '<div style="background-color:red;width:100px;height:100px"></div>'
            ]; // [a,b,c...

            var transforms = [
                [glm.vec3.fromValues(300, 100, 0), glm.vec3.fromValues(0.5, 0.5, 1), 0]
            ];
            var numItems  = transformableResources.length;
            //var container = $('<div class')



        },

        _onReady: function () {
            this.listenTo(this.collection, 'add', this.render);
            //this.collection.add({name: 'New'});

            // draggables
            $('#patients-chart-table').draggable();
            $('#virtual-patient-img-container').draggable();
            // $(".btn").draggable();


            $('#patients-chart-table').hide();
            $('#hide-chart-button').hide();

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

        _hidePatientsChart: function () {

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

    }); //end return function to send to viewController
});   //end require
