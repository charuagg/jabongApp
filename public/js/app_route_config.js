(function() {
    angular
        .module("JabongApp")
        .config(["$routeProvider", function($routeProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl'
                })
                .when('/login', {
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl'
                })
                .when('/errorPage', {
                    templateUrl: 'templates/errorPage.html'
                })
                .when('/catalog', {
                    templateUrl: 'templates/pages/catalog/catalogData.html',
                    controller: 'catalogCtrl'
                })
                .when('/cart', {
                    templateUrl: 'templates/pages/cart/cartData.html',
                    controller: 'cartCtrl'
                })
                .otherwise({
                    redirectTo: '/errorPage'
                });
        }]);
})();