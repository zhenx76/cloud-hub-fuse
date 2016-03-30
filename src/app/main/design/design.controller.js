(function ()
{
    'use strict';

    angular
        .module('app.design')
        .controller('DesignController', DesignController);

    /** @ngInject */
    function DesignController(DesignData)
    {
        var vm = this;

        // Data
        vm.helloText = 'This is Design';

        // Methods

        //////////
    }
})();
