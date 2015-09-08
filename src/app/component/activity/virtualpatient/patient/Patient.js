define(function(require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/activity/virtualpatient/tests/patient/Patient.hbs');

	return Component.extend({
		template: template,
		classes: 'patient',
		styles: 'component/activity/virtualpatient/tests/patient/Patient.css'

        // addHotSpots: function() {
        //     $('#eve').click(function(e) { //e is the event that get passed to anonymous functions by click()
        //         var divCoords = $(this).offset();
        //
        //         var relX = e.pageX - divCoords.left;          // get mouse coords relative to
        //         var relY = e.pageY - divCoords.top;
        //         relX *= 100 / $(this).width();                // convert to percent
        //         relY *= 100 / $(this).height();
        //
        //         relX = relX.toFixed(2);
        //         relY = relY.toFixed(2); //round
        //         console.log(relX + '% : ' + relY+'%');
        //     });
        // }


	});

});
