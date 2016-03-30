(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('deviceRegistry', deviceRegistryService);

    /** @ngInject */
    function deviceRegistryService($q, $log, api) {
        var deviceModels = {};

        var deviceRegistry = {};

        // Methods
        deviceRegistry.load = function() {
            return $q(function(resolve, reject) {
                var DeviceRegistry = api.deviceRegistry.list;
                deviceModels = DeviceRegistry.get(
                    // Success
                    function (response) {
                        resolve(response);
                    },

                    // Error
                    function (response) {
                        $log.error(response);
                        reject(null);
                    });
            });
        };

        deviceRegistry.list = function() {
            return deviceModels;
        };

        deviceRegistry.get = function(type) {
            return getModelByType(deviceModels, type);
        };

        function getModelByType(deviceModel, type) {
            if (deviceModel.hasOwnProperty('type')) {
                var parts = deviceModel.type.split('/');
                if (type == parts[parts.length - 1]) {
                    return deviceModel;
                }
            }

            // Find child device models
            if (deviceModel.hasOwnProperty('children')) {
                for (var i = 0; i < deviceModel.children.length; i++) {
                    var model = getModelByType(deviceModel.children[i], type);
                    if (!!model) {
                        return model;
                    }
                }
            }

            return null;
        }

        return deviceRegistry;
    }
})();
