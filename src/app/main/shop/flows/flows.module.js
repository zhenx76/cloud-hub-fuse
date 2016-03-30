(function () {
    'use strict';

    angular
        .module('app.shop.flows', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {
        // State
        $stateProvider
            .state('app.shop_flows', {
                url: '/shop-flows',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/shop/flows/flows.html',
                        controller: 'ShopFlowsController as vm'
                    }
                },
                resolve: {
                    FlowsData: function (apiResolver) {
                        return apiResolver.resolve('Flows@get');
                    }
                }
            });
    }
})();
