(function() {
    angular
        .module("JabongApp")
        .controller("cartCtrl", ['$rootScope', '$timeout', 'network_service', '$scope', '$location', '$window', '$routeParams',
            function($rootScope, $timeout, network_service, $scope, $location, $window, $routeParams) {
                _this = this;

                var urlData = angular.copy($routeParams);

                $scope.urlParamsData = {
                    categoryId: urlData.categoryId ? urlData.categoryId : '17',
                    // categoryName: urlData.categoryName,
                    subCategoryId: urlData.subCategoryId ? urlData.subCategoryId : '194',
                    // subCategoryName: urlData.subCategoryName,
                    bucketId: urlData.bucketId ? urlData.bucketId : '1013'
                }

                $scope.cart = {
                    productList: [],
                    totalPages: 0,
                    pageNo: 1,
                    pageSize: 20,
                };

                var init = function() {
                    $scope.getKartData();
                }

                $scope.getKartData = function() {
                    network_service.GET({
                        url: 'getCartDataById',
                        params: {
                            id: 'shu.ro@gmail.com'
                        }
                    }).then(function(response) {
                        if (response.status === 200) {
                            $scope.cart.kartdata = response.data.items;
                            
                        }
                    })
                };

                init();

            }
        ]);
}());