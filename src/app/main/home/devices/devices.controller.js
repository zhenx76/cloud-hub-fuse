(function ()
{
    'use strict';

    angular
        .module('app.home.devices')
        .controller('DeviceController', DeviceController);

    /** @ngInject */
    function DeviceController(DeviceData)
    {
        var vm = this;

        // Data
        vm.helloText = DeviceData;

        // Methods

        //////////
    }
})();
