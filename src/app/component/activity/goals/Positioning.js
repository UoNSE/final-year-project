define(function (require) {

    "use strict";

    /**
     * A Utility that provides the absolute values of the number
     * of pixels between the origin (center) and the bounds of
     * the screen.
     *
     * Usage:
     *
     * let Positioning = require('component/activity/goals/Positioning');
     *
     * The following gives 50% of the right-half of the screen.
     * let example = Positioning.widthLimit() * 0.50;
     *
     * The following gives 50% of the left-half of the screen.
     * let negativeExample = -(Positioning.widthLimit() * 0.50);
     */
    return (function Positioning() {

        let that = {
            screenHeight: () => {
                return $(window).innerHeight();
            },

            screenWidth: ()=> {
                return $(window).innerWidth();
            }
        };

        /**
         * This value is the positive offset from the
         * origin (center) to the side of the screen.
         *
         * @returns {number}
         */
        that.widthLimit = () => {
            return that.screenWidth() / 2;
        };

        /**
         * This value is the positive offset from the
         * origin (center) to the top or bottom of the screen.
         *
         * @returns {number}
         */
        that.heightLimit = () => {
            return that.screenHeight() / 2;
        };

        return that;

    }());

});