(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Sample
            //'app.sample',

            // Cloud Hub Services
            'app.services',

            // Home Screen
            'app.home',

            // Shopping Screen
            'app.shop',

            // Design Screen
            'app.design'
        ]);
})();
