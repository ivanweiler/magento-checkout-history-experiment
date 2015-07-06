/**
 * Magento Onepage History
 *
 * @version     1.0
 * @copyright   Copyright (c) 2015 Inchoo (http://inchoo.net)
 */

if(typeof Checkout == 'undefined') {
    throw("opcheckout_history.js needs to be included after opcheckout.js script");
}

Checkout = Class.create(Checkout, {

    useHistory: true,
    initHash: "",
    stepHash: "#/steps",

    initialize: function($super, accordion, urls) {
        $super(accordion, urls);

        if(this.useHistory && this.isHistorySupported()) {
            this.initBackHistory();
        }
    },

    isHistorySupported: function() {
        /**
         * Logic borrowed from Modernizr
         * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
         */
        var ua = navigator.userAgent;

        // We only want Android 2 and 4.0, stock browser, and not Chrome which identifies
        // itself as 'Mobile Safari' as well, nor Windows Phone (issue #1471).
        if ((ua.indexOf('Android 2.') !== -1 ||
            (ua.indexOf('Android 4.0') !== -1)) &&
            ua.indexOf('Mobile Safari') !== -1 &&
            ua.indexOf('Chrome') === -1 &&
            ua.indexOf('Windows Phone') === -1) {
            return false;
        }

        // Return the regular check
        return (window.history && 'pushState' in window.history);
    },

    initBackHistory: function() {

        this.firstStep = this.accordion.sections.first().readAttribute('id').replace('opc-', '');

        //@todo: possible to resolve initHash other than "" here?

        if(window.location.hash == this.initHash) {
            history.pushState(true, "", this.stepHash);

        } else if(window.location.hash == this.stepHash && !history.state) {
            history.replaceState(undefined, "", this.initHash + " ");
            /**
             * Chrome won't replace state with empty hash, " " is a workaround
             */
        }

        Event.observe(window, 'popstate', this.onPopState.bindAsEventListener(this));
    },

    onPopState: function() {
        if(window.location.hash == this.initHash) {

            //Position.prepare();

            if(this.currentStep != this.firstStep) {
                this.back();
                history.pushState(true, "", this.stepHash);
                $("opc-"+this.currentStep).scrollTo();

            } else {
                //if(confirm(Translator.translate('You are leaving Checkout. Are you sure?'))) {
                    history.back();
                //} else {
                //    history.pushState(true, undefined, "#/steps");
                //}
            }

            //jump to previous scrollTop, not possible in FF
            //window.scrollTo(Position.deltaX, Position.deltaY);

        }
    }

});
