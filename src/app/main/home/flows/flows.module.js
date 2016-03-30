(function ()
{
    'use strict';

    angular
        .module('app.home.flows', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.home_flows', {
                url    : '/home-flows',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/home/flows/flows.html',
                        controller : 'FlowsController as vm'
                    }
                },
                resolve: {
                    FlowsData: function (apiResolver)
                    {
                        return apiResolver.resolve('RegisteredFlows@get');
                    }
                }
            });
    }
})();
