(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('deviceManager', deviceManagerService);

    /** @ngInject */
    function deviceManagerService($q, $log, api) {
        var devices = {};

        var deviceManager = {};

        // Methods
        deviceManager.load = function() {
            return $q(function(resolve, reject) {
                var DeviceManager = api.deviceManager.list;
                devices = DeviceManager.get(
                    // Success
                    function (response) {
                        $log.info(response);
                        resolve(response);
                    },

                    // Error
                    function (response) {
                        $log.error(response);
                        reject(null);
                    });
            });
        };

        deviceManager.list = function() {
            return devices;
        };

        deviceManager.get = function(id) {
            if (devices.hasOwnProperty('devices')) {
                for (var i = 0; i < devices.devices.length; i++) {
                    var device = devices.devices[i];
                    if (device.hasOwnProperty('id') && device.id == id) {
                        return device;
                    }
                }
            }
            return null;
        };

        return deviceManager;
    }
})();
