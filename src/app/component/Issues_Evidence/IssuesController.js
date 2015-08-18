define(function (require) {

    'use strict';

    var $ = require('jquery');

    var ViewController = require('controller/ViewController');
    var Animate = require('behaviour/Animate');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
    return ViewController.extend({

        events: {
            //register drag events by mouseup and mousedown (check with touch input)
            'mousedown .card': 'onDragStart',
            'mouseup .card': 'onDragEnd'

        },

        onAfterRender: function () {

            var Issues = $('#issues').children();
            var Evidencelist = $('#evidences').children();
            var distance = 150;
            var width = window.innerWidth/2;
            var height = window.innerHeight/3;
            var len = Issues.length + Evidencelist.length;
            var i = 0;

            for (; i < Issues.length; i++) {
                var card = $(Issues[i]);
                MultiTouchManager.getInstance().addElementRTS(card);

                var angle =  2 * Math.PI * (i / len);
                Animate.scale(card, {
                    delay: i * 50,
                    animate: {
                        top: (distance * Math.cos(angle)) + height,
                        left: (distance * Math.sin(angle)) + width
                    }
                });
            }
            for (var l=0; i < len; i++, l++) {
                var card = $(Evidencelist[l]);
                MultiTouchManager.getInstance().addElementRTS(card);
                var angle = 2 * Math.PI * (i / len);

                Animate.scale(card, {
                    delay: i * 50,
                    animate: {
                        top: (distance * Math.cos(angle)) + height,
                        left: (distance * Math.sin(angle)) + width
                    }
                });
            }
        },

        onDragStart: function(){
            //show menu
            $( "#menu" ).show();
        },

        onDragEnd: function(){

            //check collisions
            //get btn pos
            var pos=jQuery(event.target).offset();


            //check for card deletion
            var delbtn = $( "#delbtn").offset();
            var deldist = Math.sqrt(Math.abs(Math.pow((delbtn.left - pos.left),2) + Math.pow((delbtn.top - pos.top),2)));
            //console.log(deldist);
            if(deldist<32){
                (event.target).remove();
            }


            if ($(event.target).hasClass("merged")){
                //check card splitting

                var splitbtn = $( "#splitbtn").offset();
                var splitdist = Math.sqrt(Math.abs(Math.pow((splitbtn.left - pos.left),2) + Math.pow((splitbtn.top - pos.top),2)));
                //console.log(splitdist);
                if(splitdist<32){
                    //split cards
                    //get each card data
                    var textmain = $(event.target).text();
                    var issue = textmain.split("|")[0];
                    var evidence = textmain.split("|")[1];
                    //delete base card
                    (event.target).remove();
                    //create new cards
                    $("#issues").html($("#issues").html()+ "<button class='btn btn-default btn-fab btn-raised btn-material-red abs-center issue card' style='position: absolute'>" + issue + "</button>");
                    //add RTS
                    var list = $("#issues").children();
                    for(var i=0; i<list.length;i++){
                        var card = list[i];
                        MultiTouchManager.getInstance().addElementRTS(card);
                    }
                    $("#evidences").html($("#evidences").html()+ "<button class='btn btn-default btn-fab btn-raised btn-material-green abs-center evidence card' style='position: absolute'>" + evidence + "</button>");
                    //add RTS
                    var list = $("#evidences").children();
                    for(var i=0; i<list.length;i++){
                        var card = list[i];
                        MultiTouchManager.getInstance().addElementRTS(card);
                    }
                }
            }
            else {
                //check for card merging

                var list;
                if ($(event.target).hasClass("issue")) {
                    //check all evidence cards
                    list = $('#evidences').children();
                }
                else {
                    //check all issue cards
                    list = $('#issues').children();
                }
                for (var i = 0; i < list.length; i++) {
                    //div
                    var card = $(list[i]);
                    if (!card.hasClass("merged")) {
                        var cardpos = card.offset();
                        var mergeDist = Math.sqrt(Math.abs(Math.pow((cardpos.left - pos.left), 2) + Math.pow((cardpos.top - pos.top), 2)));
                        if (mergeDist < 32) {
                            //add "merged" class to div
                            card.addClass("merged");
                            //update colour
                            card.addClass("btn-material-orange");
                            //update card text
                            if ($(event.target).hasClass("issue")) {
                                card.html($(event.target).text() + " | " + card.text());
                            }
                            else {
                                card.html(card.text() + " | " + $(event.target).text());
                            }
                            //remove old card
                            (event.target).remove();
                        }
                    }
                }
            }

            //hide menu
            $( "#menu" ).hide();
        }

    });

});
