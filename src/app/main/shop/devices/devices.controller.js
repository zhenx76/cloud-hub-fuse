(function ()
{
    'use strict';

    angular
        .module('app.shop.devices')
        .controller('DeviceModelController', DeviceModelController);

    /** @ngInject */
    function DeviceModelController(DeviceModelData, $log)
    {
        var vm = this;

        // Data
        vm.helloText = DeviceModelData;

        // Methods

        //////////
    }
})();
