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

                $scope.catalog = {
                    productList: [],
                    totalPages: 0,
                    pageNo: 1,
                    pageSize: 20,
                };

                var init = function() {
                    $scope.getCatlogData();
                }

                $scope.getCatlogData = function() {

                    network_service.GET({
                        url: 'getbrandCatalogData',
                        params: {
                            pageNo: $scope.catalog.pageNo,
                            pageSize: $scope.catalog.pageSize
                        }
                    }).then(function(response) {
                        if (response.status === 200) {
                            $scope.catalog.productList = response.data.docs;
                            $scope.catalog.totalPages = response.data.total;

                        }

                        // $("body").animate({
                        //     scrollTop: 0,
                        // }, 1000);
                    })

                };

                init();

            }
        ]);
}());