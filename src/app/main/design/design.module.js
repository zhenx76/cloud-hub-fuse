(function ()
{
    'use strict';

    angular
        .module('app.design', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.design', {
                url    : '/design',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/design/design.html',
                        controller : 'DesignController as vm'
                    }
                },
                resolve: {
                    DesignData: function (apiResolver)
                    {
                        return apiResolver.resolve('design@get');
                    }
                }
          });

        msNavigationServiceProvider.saveItem('design', {
            title : 'DESIGN',
            group : true,
            weight: 3
        });

        msNavigationServiceProvider.saveItem('design.editor', {
            title    : 'Editor',
            state    : 'app.design'
        });
    }
})();
