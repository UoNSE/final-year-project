// TODO: move module into activity folder as per http://wiki.uonse.org/display/FYP/2015/08/16/Creating+an+Activity
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
    var numberItemsShowingInFeed = 0;
    var feedCardSchedule = [1000,2000,3000,4000];
    // var eventFeedCardQueue = ["hello", "hello goodbye", "you say", "hello", "and i say", "goodbye"];
    var eventCardFeedQueue = ["observation-card1", "observation-card2", "observation-card3"];

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
      'click #context': '_onContext', /* @TODO: delete most of these (depracated) */
      'click #background': '_onBackground',
      'click #flip-patient-button': '_flipPatient',
      'click #test-results-button': '_testResults',
      'click #hide-chart-button': '_hidePatientsChart',
      'click #query-card': '_queryCard',
      'click #results-card1': '_showUrineAnalysisChart',
      'click #hide-chart-button2': '_hideUrineAnalysisChart',

        'click #button-query': '_queryPatient',
        'click #button-tests': '_testPatient',
        'click #button-chart': '_showPatientsChart'

        },

        // add child views here.
        onBeforRender: function(){

        },

        // make any dynamic changes to the DOM here (eg. Animations, etc).
        onAfterRender: function () {
            this._transformItems();
        },

        // everything should have loaded. Add Model and Collection event handling here.
        onReady: function () {
            this.listenTo(this.collection, 'add', this.render);
            //this.collection.add({name: 'New'});

            this._hideElements();
            this._startEventFeed();


        },

        _hideElements: function(){
            $('#patients-chart-table').hide();
            $('#urine-analysis-results').hide();
            $('#hide-chart-button').hide();
            $('.observation-card').hide();
            $('.speech-card').hide();
            //$('.query-card').hide();
            $('#query-menu').hide();
            $('#test-menu').hide();
        },

        _startEventFeed: function() {
            // while there are still feed item / event cards unshown,
            // progressively show them as per the hardcoded schedule.
            // will eventually depend on JSON data.
            // TODO: replace hardcoded schedule with JSON.

            // loop through queue
            // while(eventFeedCardQueue.length > 0){
            for (var i = 0; i < eventCardFeedQueue.length; i++) {
                // after interval, reveal element
                var myVar=setInterval(function(){
                    // show element
                    // alert("#"+eventCardFeedQueue[i]);
                    // $('#'+eventCardFeedQueue[i]).show();
                    $('#observation-card1').show();
                },1000);
            }
        },

        _transformItems: function () {
            //---------------------------------------------
            var transformableResources = [
                //'<div style="background-color:#00f;width:100px;height:100px"></div>',
                $('#speech-card1').get(),
                $('#speech-card2').get(),

                $('#observation-card1').get(),
                $('#observation-card2').get(),
                $('#observation-card3').get(),
                $('#virtual-patient-img-container').get(),

                $('#button-chart').get(),
                // $('#button-query').get(),
                // $('#button-tests').get(),

                $('#patients-chart-container').get(), // //jquery fetch things
                $('#query-menu-container').get(),
                $('#test-menu-container').get()
            ]; // [a,b,c...

            var transforms = [
                [glm.vec3.fromValues(-420, -300, 0),   glm.vec3.fromValues( .25,.25, 1), 0], //(translate,,) (scale,,)
                [glm.vec3.fromValues(-420, -300, 0),   glm.vec3.fromValues( .25,.25, 1), 0],

                [glm.vec3.fromValues(-420, -300, 0), glm.vec3.fromValues(.25,.25, 1), 0],
                [glm.vec3.fromValues(-420, -300, 0), glm.vec3.fromValues(.25,.25, 1), 0],
                [glm.vec3.fromValues(-420, -300, 0),glm.vec3.fromValues(.25,.25, 1), 0],
                [glm.vec3.fromValues(0, 0, 0),glm.vec3.fromValues(2.5,2.5, 1), 0],

                [glm.vec3.fromValues(-430, 300, 0),   glm.vec3.fromValues( 1.0,1.0, 1), 0],
                // [glm.vec3.fromValues(-330, 300, 0),   glm.vec3.fromValues( 1.0,1.0, 1), 0],
                // [glm.vec3.fromValues(-230, 300, 0),   glm.vec3.fromValues( 1.0,1.0, 1), 0],

                [glm.vec3.fromValues(-334, -50, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
                [glm.vec3.fromValues(500, 800, 0), glm.vec3.fromValues(1.0, 1.0, 1), 0],
                [glm.vec3.fromValues(500, 800, 0), glm.vec3.fromValues(1.0,1.0, 1), 0]
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

    _queryPatient: function () {

        if($('#query-menu').is(":visible")){
            $('#query-menu').hide();

        }else{
            $('#query-menu').show();

        }

        // should be replaced with this._offsetMenu();
        $('.button-menu').each(function() {
            //get number of menu items
            // var numMenuItems = $( this ).find('.menu-item').length;
            // console.log(numMenuItems);
            // // get height of menu item.
            // var menuItemHeight = $( this ).children('button').css('height')
            // console.log(menuItemHeight);
            // // calculate height of menu
            // var menuHeight = numMenuItems * menuItemHeight;
            // console.log(menuHeight);
            menuHeight = 500;
            $(this).offset({top:menuHeight});

        });
    },

    _testPatient: function () {

    if($('#test-menu').is(":visible")){
        $('#test-menu').hide();

    }else{
        $('#test-menu').show();

    }
        // should be replaced with this._offsetMenu();
        $('.button-menu').each(function() {
            // //get number of menu items
            // var numMenuItems = $( this ).find('.menu-item').length;
            // console.log(numMenuItems);
            // // get height of menu item.
            // var menuItemHeight = $( this ).children('button').css('height')
            // console.log(menuItemHeight);
            // // calculate height of menu
            // var menuHeight = numMenuItems * menuItemHeight;
            // console.log(menuHeight);
            menuHeight = 500;
            $(this).offset({top:menuHeight});

        });

    },

    _offsetMenu: function (){
        //position the menu based on how big it is (how many items)
        // num.elements * size.element (menu-item)
        // TODO: fix this.
        // $('.button-menu').each(function() {
            // get number of menu items
            // var numMenuItems = $( this ).find('.menu-item').length;
            // console.log(numMenuItems);
            // // get height of menu item.
            // var menuItemHeight = $( this ).children('button').css('height')
            // console.log(menuItemHeight);
            // // calculate height of menu
            // var menuHeight = numMenuItems * menuItemHeight;
            // console.log(menuHeight);
        //     menuHeight = 500;
        //     $(this).offset({top:menuHeight});
        //
        // });
    }


  });
});
