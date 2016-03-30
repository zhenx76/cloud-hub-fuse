(function ()
{
    'use strict';

    angular
        .module('app.home.dashboard')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController(DashboardData)
    {
        var vm = this;

        // Data
        vm.helloText = DashboardData.data.helloText;

        // Methods

        //////////
    }
})();
