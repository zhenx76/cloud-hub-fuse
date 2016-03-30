(function ()
{
    'use strict';

    angular
        .module('app.home.flows')
        .controller('FlowsController', FlowsController);

    /** @ngInject */
    function FlowsController(FlowsData)
    {
        var vm = this;

        // Data
        vm.helloText = FlowsData.data.helloText;

        // Methods

        //////////
    }
})();
