(function() {
    angular
        .module("JabongApp")
        .controller("catalogCtrl", ['$rootScope', '$timeout', 'network_service', '$scope', '$location', '$window', '$routeParams',
            function($rootScope, $timeout, network_service, $scope, $location, $window, $routeParams) {

                $scope.catalog = {
                    productList: [],
                    totalPages: 0,
                    pageNo: 1,
                    pageSize: 20,
                    kartdata: []
                };

                var kartProducts = {};

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
                            $scope.catalog.kartdata = response.data.items;
                            kartProducts = {};
                            for (var i = 0; i < $scope.catalog.kartdata.length; i++) {
                                var item = $scope.catalog.kartdata[i];
                                kartProducts[item.productId] = item.quantity;
                            }
                            $scope.getCatlogData();
                        }
                    })
                };

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
                            for (var i = 0; i < $scope.catalog.productList.length; i++) {
                                var product = $scope.catalog.productList[i];
                                if (kartProducts[product.productId]) {
                                    product.quantity = kartProducts[product.productId];
                                } else {
                                    product.quantity = 0;
                                }
                            }

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
                            $scope.catalog.kartdata = response.data.items;
                            kartProducts = {};
                            for (var i = 0; i < $scope.catalog.kartdata.length; i++) {
                                var item = $scope.catalog.kartdata[i];
                                kartProducts[item.productId] = item.quantity;
                            }
                            $scope.getCatlogData();
                        }
                    });
                }

                $scope.redirectToKart = function() {

                    $location.path('/cart');
                }


                init();

            }
        ]);
}());