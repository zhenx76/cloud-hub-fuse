(function ()
{
    'use strict';

    angular
        .module('app.home.devices', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.home_devices', {
                url    : '/home-devices',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/home/devices/devices.html',
                        controller : 'DevicesController as vm'
                    }
                },
                resolve: {
                    RegisteredDevicesData: function (apiResolver)
                    {
                        return apiResolver.resolve('RegisteredDevices@get');
                    }
                }
            });
    }
})();
