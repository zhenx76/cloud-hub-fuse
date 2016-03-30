(function () {
    'use strict';

    angular
        .module('app.home', [
            'app.home.dashboard',
            'app.home.flows',
            'app.home.devices'
        ]).config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider) {
        msNavigationServiceProvider.saveItem('home', {
            title: 'HOME',
            group: true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('home.dashboard', {
            title: 'Dashboard',
            icon: 'icon-tile-four',
            state: 'app.home_dashboard'
        });

        msNavigationServiceProvider.saveItem('home.flows', {
            title: 'Flows',
            state: 'app.home_flows'
        });

        msNavigationServiceProvider.saveItem('home.devices', {
            title: 'Devices',
            state: 'app.home_devices'
        });
    }
})();
