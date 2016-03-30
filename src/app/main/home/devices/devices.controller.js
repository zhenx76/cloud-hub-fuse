(function ()
{
    'use strict';

    angular
        .module('app.home.devices')
        .controller('DevicesController', DevicesController);

    /** @ngInject */
    function DevicesController(RegisteredDevicesData)
    {
        var vm = this;

        // Data
        vm.helloText = RegisteredDevicesData.data.helloText;

        // Methods

        //////////
    }
})();
