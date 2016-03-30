(function () {
    'use strict';

    angular
        .module('app.shop', [
            'app.shop.flows',
            'app.shop.devices'
        ])
        .config(config)
        .run(run);

    /** @ngInject */
    function config(msNavigationServiceProvider) {
        msNavigationServiceProvider.saveItem('shop', {
            title: 'Shop',
            group: true,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('shop.solution', {
            title: 'By Flows',
            state: 'app.shop_flows'
        });
    }

    /** @ngInject */
    function run(runtimeState, msNavigationService, deviceRegistry, $log) {
        deviceRegistry.load()
            .then(function(deviceModels) {
                $log.info(deviceModels);

                // Loop through device registry tree and add menu items.
                // Menu items should be only added once therefore we do it in the run block instead of controller
                addDeviceModel(deviceModels, 'shop');

                function validateDeviceModel(deviceModel) {
                    return (typeof deviceModel !== 'undefined' && deviceModel
                            && deviceModel.hasOwnProperty('name')
                            && deviceModel.hasOwnProperty('type')
                            && deviceModel.hasOwnProperty('children'));
                }

                function addDeviceModel(deviceModel, path) {
                    if (validateDeviceModel(deviceModel)) {
                        var parts = deviceModel.type.split('/');
                        var type = parts[parts.length-1];
                        path = path + '.' + type;
                        var stateName = 'app.shop_' + type;

                        // Add corresponding state for each menu item except top-level menu
                        if (type != 'device') {
                            runtimeState.addState(
                                stateName, {
                                    url: '/shop-' + type,
                                    views: {
                                        'content@app': {
                                            templateUrl: 'app/main/shop/devices/devices.html',
                                            controller: 'DeviceModelController as vm'
                                        }
                                    },
                                    resolve: {
                                        DeviceModelData: function(deviceRegistry) {
                                            return deviceRegistry.get(type);
                                        }
                                    }
                                });

                            // Add menu item with state
                            msNavigationService.saveItem(path, {
                                title: deviceModel.name,
                                state: stateName
                            });
                        } else {
                            // Just add menu item for top-level
                            msNavigationService.saveItem(path, {
                                title: deviceModel.name
                            });
                        }

                        // Add sub device models
                        for (var i = 0; i < deviceModel.children.length; i++) {
                            addDeviceModel(deviceModel.children[i], path);
                        }
                    }
                }
            });
    }
})();
