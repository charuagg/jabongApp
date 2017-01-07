(function() {
    angular
        .module('JabongApp')
        .run(["$route", "$rootScope", "$location", "$log", "$templateCache", "$timeout",
            function($route, $rootScope, $location, $log, $templateCache, $timeout) {

                // register listener to watch route changes
                $rootScope.$on("$routeChangeStart", function(event, next, current) {

                    // Handling Cache issue
                    if (typeof(current) !== 'undefined') {
                        $templateCache.remove(current.templateUrl);
                    }

                });

                $rootScope.$on('$locationChangeStart', function(event, next, current) {
                    $log.info("location changing to: " + next);
                });
                
            }
        ]);
})();