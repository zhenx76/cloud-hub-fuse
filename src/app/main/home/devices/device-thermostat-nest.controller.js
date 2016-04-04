(function ()
{
    'use strict';

    angular
        .module('app.home.devices')
        .controller('device-thermostat-nest', DeviceNestController);

    /** @ngInject */
    function DeviceNestController(DeviceData, $filter, $log)
    {
        var vm = this;

        vm.title = DeviceData.name;
        vm.currentTemperatureUnit = 'Fahrenheit';
        vm.temperatureUnits = {
            Fahrenheit: '\u00B0F',
            Celsius: '\u00B0C'
        };

        var online = false;
        var currentTemperature = 0;
        vm.goalTemperature = 0;
        var maxTemperature = 140; // Fahrenheit
        var humidity = 0;
        var hvac = 'off';

        // Initialization
        update(DeviceData);
        refreshChart();

        // Methods
        vm.changeTemperatureUnit = function(temperatureType) {
            if (temperatureType == 'Fahrenheit') {
                currentTemperature = toFahrenheit(currentTemperature);
                vm.goalTemperature = toFahrenheit(vm.goalTemperature);
                maxTemperature = toFahrenheit(maxTemperature);
            } else {
                currentTemperature = toCelsius(currentTemperature);
                vm.goalTemperature = toCelsius(vm.goalTemperature);
                maxTemperature = toCelsius(maxTemperature);
            }

            refreshChart();
        };

        vm.getCurrentTemperature = function() {
            return $filter('number')(currentTemperature, 1) + vm.temperatureUnits[vm.currentTemperatureUnit];
        };

        vm.getGoalTemperature = function() {
            return $filter('number')(vm.goalTemperature, 1) + vm.temperatureUnits[vm.currentTemperatureUnit];
        };

        vm.getMaxTemperature = function() {
            return $filter('number')(maxTemperature, 1) + vm.temperatureUnits[vm.currentTemperatureUnit];
        };

        vm.getHumidity = function() {
            return humidity + '%';
        };

        vm.getHVAC = function() {
            return hvac;
        };

        // Private Methods
        function update(device) {
            if (!device.hasOwnProperty('info') || !device.info) {
                $log.warn('Nest: not valid device data');
                return;
            }

            if (device.info.hasOwnProperty('status')) {
                online = (device.info.status == 'present');
            }

            if (device.info.hasOwnProperty('info') && device.info.info) {
                var info = device.info.info;

                // Default from server is Celsius
                currentTemperature = toFahrenheit(info.temperature);
                vm.goalTemperature = toFahrenheit(info.goalTemperature);

                humidity = info.humidity;
                hvac = info.hvac;
            }
        }

        function refreshChart() {
            // donut chart
            vm.donutChart = {
                data   : {
                    series: [
                        {
                            value: currentTemperature,
                            className: (currentTemperature <= vm.goalTemperature) ? 'ct-temp-cooling' : 'ct-temp-warming'
                        },
                        {
                            value: maxTemperature - currentTemperature,
                            className: 'ct-temp-neutral'
                        }
                    ]
                },
                events: {
                    draw: function(ctx) {
                        if (ctx.type === 'label') {
                            if (ctx.index === 0) {
                                ctx.element.attr({
                                    dx: ctx.element.root().width() / 2,
                                    dy: ctx.element.root().height() / 2
                                });
                            } else {
                                ctx.element.remove();
                            }
                        }
                    }
                },
                options: {
                    donut: true,
                    donutWidth: 60,
                    startAngle: 180,
                    total: 0,
                    showLabel: true,
                    labelInterpolationFnc: function() {
                        return $filter('number')(currentTemperature, 1) + vm.temperatureUnits[vm.currentTemperatureUnit];
                    }
                }
            };
        }

        function toFahrenheit(temperature) {
            return temperature * 9.0 / 5.0 + 32;
        }

        function toCelsius(temperature) {
            return (temperature - 32) * 5.0 / 9.0;
        }

    }
})();
