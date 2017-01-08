(function() {
    angular
        .module("JabongApp")
        .controller("cartCtrl", ['$rootScope', '$timeout', 'network_service', '$scope', '$location', '$window', '$routeParams',
            function($rootScope, $timeout, network_service, $scope, $location, $window, $routeParams) {

                $scope.cart = {
                    productList: [],
                    totalPages: 0,
                    pageNo: 1,
                    pageSize: 3,
                    totalAmount: 0,
                };

                var init = function() {
                    $scope.getKartData();
                }

                $scope.editQuantity = function(product) {
                    product.isEdit = true;
                };

                $scope.saveItemQuantity = function(product) {
                    product.isEdit = false;
                    network_service.POST({
                        url: 'changeQuantity',
                        data: {
                            _id: 'shu.ro@gmail.com',
                            item: product
                        }
                        // formPOST: true
                    }).then(function(response) {
                        if (response.status === 200) {
                            $scope.getKartData();
                        }
                    });
                };

                $scope.deleteKartItem = function(product) {
                    network_service.POST({
                        url: 'removeItemFromCart',
                        data: {
                            _id: 'shu.ro@gmail.com',
                            item: product
                        }
                        // formPOST: true
                    }).then(function(response) {
                        if (response.status === 200) {
                            $scope.getKartData();
                        }
                    });
                };

                $scope.getKartData = function() {

                    $scope.cart.totalAmount = 0;

                    network_service.GET({
                        url: 'getCartDataById',
                        params: {
                            id: 'shu.ro@gmail.com'
                        }
                    }).then(function(response) {
                        if (response.status === 200) {
                            $scope.cart.kartdata = response.data.items;
                            $scope.cart.totalProduct = response.data.items.length;
                            for (var i = 0; i < $scope.cart.kartdata.length; i++) {
                                $scope.cart.kartdata[i].isEdit = false;
                                $scope.cart.totalAmount += $scope.cart.kartdata[i].quantity * $scope.cart.kartdata[i].mrp;
                            }
                            $scope.getPaginatedKartData();
                        }
                    })
                };

                $scope.placeOrder = function() {

                    var orderData = [];
                    for (var i = 0; i < $scope.cart.kartdata.length; i++) {
                        var kartData = $scope.cart.kartdata[i];
                        var obj = {
                            brandId: kartData.brandId,
                            productId: kartData.productId,
                            bucketId: kartData.bucketId,
                            subcategoryId: kartData.subCategoryId,
                            brandName: kartData.brandName,
                            productName: kartData.productName,
                            mrp: kartData.mrp,
                            url: kartData.url,
                            imageUrl: kartData.imageUrl,
                            quantity: kartData.quantity
                        };

                        orderData.push(obj);
                    }

                    network_service.POST({
                        url: 'addToOrder',
                        data: {
                            userId: 'shu.ro@gmail.com',
                            items: orderData,
                        }
                        // formPOST: true
                    }).then(function(response) {
                        if (response.status === 200) {
                            $location.path('/catalog');
                            $rootScope.showPopupMessage('Order Placed', 'Order Placed', 'Order has been successfully Placed', '');
                        }
                    });
                };

                $scope.getPaginatedKartData = function() {
                    $scope.cart.kartdataToDisplay = [];
                    var offset = ($scope.cart.pageNo - 1) * $scope.cart.pageSize,
                        limit = $scope.cart.pageSize;

                    $scope.cart.kartdataToDisplay = $scope.cart.kartdata.slice(offset, offset + limit);

                    $("body").animate({
                        scrollTop: 0,
                    }, 1000);

                };

                init();

            }
        ]);
}());