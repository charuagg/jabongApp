(function() {
    angular
        .module('JabongApp')
        .factory('EP', ['$location', function($location) {
            return {
                getAPIEndpoint: function() {
                    if ($location.host().indexOf("localhost") > -1) {

                        // node Server
                        return "http://localhost:3000/";
                    }
                    return $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/assortment-api/";
                }
            }
        }]);
})();