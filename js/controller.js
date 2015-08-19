var app = angular.module('app',[]);
app.controller('BusinessCtrl', ['$scope', '$rootScope', 'BusinessService', function ($scope, $rootScope, BusinessService) {
    $rootScope.title = '流水列表';

    $scope.currentPage = 1;
    $scope.totalPage = 1;
    $scope.pageSize = 40;
    $scope.pages = [];
    $scope.endPage = 1;
    //获取总流水
    BusinessService.total().success(function (data) {
        $scope.total = data;
    });

    $scope.load = function () {
        BusinessService.list($scope.currentPage, $scope.pageSize).success(function (data) {
            $scope.items = data.list;
            //获取总页数
            $scope.totalPage = Math.ceil(data.count / $scope.pageSize);
            $scope.endPage = $scope.totalPage;
            //生成数字链接
            if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
                $scope.pages = [
                    $scope.currentPage - 1,
                    $scope.currentPage,
                    $scope.currentPage + 1
                ];
            } else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
                $scope.pages = [
                    $scope.currentPage,
                    $scope.currentPage + 1
                ];
            } else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
                $scope.pages = [
                    $scope.currentPage - 1,
                    $scope.currentPage
                ];
            }
        });
    };

    $scope.next = function () {
        if ($scope.currentPage < $scope.totalPage) {
            $scope.currentPage++;
            $scope.load();
        }
    };

    $scope.prev = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.load();
        }
    };

    $scope.loadPage = function (page) {
        $scope.currentPage = page;
        $scope.load();
    };

}]);