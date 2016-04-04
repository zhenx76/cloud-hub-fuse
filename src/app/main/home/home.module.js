(function () {
    'use strict';

    angular
        .module('app.home', [
            'app.home.dashboard',
            'app.home.flows',
            'app.home.devices'
        ])
        .config(config)
        .run(run);

    /** @ngInject */
    function config(msNavigationServiceProvider) {
        msNavigationServiceProvider.saveItem('home', {
            title: 'HOME',
            group: true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('home.dashboard', {
            title: 'Dashboard',
            icon: 'icon-tile-four',
            state: 'app.home_dashboard'
        });

        msNavigationServiceProvider.saveItem('home.flows', {
            title: 'Flows',
            state: 'app.home_flows'
        });

        msNavigationServiceProvider.saveItem('home.device', {
            title: 'Devices'
        });
    }

    /** @ngInject */
    function run(runtimeState, msNavigationService, deviceManager, $log) {
        deviceManager.load()
            .then(function (devices) {
                if (devices && devices.hasOwnProperty('devices')) {
                    // Loop through devices array and add menu and state for each item
                    for (var i = 0; i < devices.devices.length; i++) {
                        var device = devices.devices[i];
                        if (validateDevice(device)) {
                            addDevice(device);
                        }
                    }
                }

                function validateDevice(device) {
                    return (typeof device !== 'undefined' && device
                    && device.hasOwnProperty('id')
                    && device.hasOwnProperty('name')
                    && device.hasOwnProperty('type')
                    && device.hasOwnProperty('info'));
                }

                function addDevice(device) {
                    var id = device.id;
                    var parts = id.split('/');
                    var stateName = 'app.home_' + parts.join('_');
                    var path = 'home.' + parts.join('.');
                    var url = '/home-' + parts.join('-');
                    var type = device.type.split('/').slice(1).join('-');
                    var templateUrl = 'app/main/home/devices/' + type + '.html';
                    var controller = type + ' as vm';

                    // Add corresponding state for each device
                    runtimeState.addState(
                        stateName, {
                            url: url,
                            views: {
                                'content@app': {
                                    templateUrl: templateUrl,
                                    controller: controller
                                }
                            },
                            resolve: {
                                DeviceData: function(deviceManager) {
                                    return deviceManager.get(id);
                                }
                            }
                        });

                    // Add menu item with state
                    msNavigationService.saveItem(path, {
                        title: device.name,
                        state: stateName
                    });
                }

            });
    }

})();
