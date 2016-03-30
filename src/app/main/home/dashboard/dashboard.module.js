(function () {
    'use strict';

    angular
        .module('app.home.dashboard', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {
        // State
        $stateProvider
            .state('app.home_dashboard', {
                url: '/home-dashboard',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/home/dashboard/dashboard.html',
                        controller: 'DashboardController as vm'
                    }
                },
                resolve: {
                    DashboardData: function (apiResolver) {
                        return apiResolver.resolve('dashboard@get');
                    }
                }
            });
    }
})();
