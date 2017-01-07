(function() {
    angular
        .module('JabongApp')
        .factory('EP', ['$location', function($location) {
            return {
                getAPIEndpoint: function() {
                    if ($location.host().indexOf("localhost") > -1) {

                        // return "http://localhost:8080/assortment-api/";

                        //Gaurav
                        // return "http://10.20.58.125:7080/assortment-api/";

                        //Bhandari
                        // return "http://10.20.79.124:8081/AssortmentAPI/";

                        //Production
                        // return "http://52.76.199.82:8080/assortment-api/";

                        // node Server
                        return "http://localhost:3000/";
                    }
                    return $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/assortment-api/";
                }
            }
        }]);
})();