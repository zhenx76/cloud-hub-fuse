(function () {
    'use strict';

    angular
        .module('app.services', [])
        .provider('runtimeState', function($stateProvider) {
            // runtime dependencies for the service can be injected here, at the provider.$get() function.
            this.$get = function() { // for example
                return {
                    addState: function(name, state) {
                        $stateProvider.state(name, state);
                    }
                }
            }
        })
    ;
})();
