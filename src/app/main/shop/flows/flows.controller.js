(function ()
{
    'use strict';

    angular
        .module('app.shop.flows')
        .controller('ShopFlowsController', ShopFlowsController);

    /** @ngInject */
    function ShopFlowsController(FlowsData)
    {
        var vm = this;

        // Data
        vm.helloText = FlowsData.data.helloText;

        // Methods

        //////////
    }
})();
