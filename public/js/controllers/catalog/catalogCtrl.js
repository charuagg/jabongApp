(function() {
    angular
        .module("JabongApp")
        .controller("catalogCtrl", ['$rootScope', '$timeout', 'network_service', '$scope', '$location', '$window', '$routeParams',
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
                            $scope.catalog.totalProduct = response.data.total;

                        }

                        $("body").animate({
                            scrollTop: 0,
                        }, 1000);
                    })

                };

                $scope.addToKart = function(product) {

                    var kartObj = {
                        brandId: product.brandId,
                        productId: product.productId,
                        bucketId: product.bucketId,
                        subcategoryId: product.subCategoryId,
                        brandName: product.brandName,
                        productName: product.productName,
                        mrp: product.mrp,
                        url: product.url,
                        imageUrl: product.imageUrl,
                        quantity: 1
                    }

                    var kartItems = [];
                    kartItems.push(kartObj);

                    network_service.POST({
                        url: 'addToCart',
                        data: {
                            _id: 'shu.ro@gmail.com',
                            items: kartItems
                        }
                        // formPOST: true
                    }).then(function(response) {
                        if (response.status === 200) {
                            // $scope.brandSellerInfo.jiraData = {
                            //     jiraUrl: response.data.jiraUrl,
                            //     jiraId: response.data.jiraId
                            // };
                            // var jiraMessage = 'Jira has been Created : ' + '<a href=' + $scope.brandSellerInfo.jiraData.jiraUrl + ' target="_blank">' + $scope.brandSellerInfo.jiraData.jiraId + '</a>';
                            // $rootScope.showPopupMessage('Jira Created', 'Seller Jira Created', jiraMessage);

                        }
                    });
                }

                init();

            }
        ]);
}());