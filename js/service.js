app.factory('BusinessService', ['$http', function ($http) {
    var list = function (page, size) {
        return $http({
            params: {
                page: page,
                size: size
            },
            url: '/merchants/business/list'
        });
    };

    var total = function () {
        return $http.get('/merchants/business/total');
    };

    var post = function (business) {
        return $http.post('/merchants/business/post', business);
    };

    return {
        list: function (page, size) {
            return list(page, size);
        },
        total: function () {
            return total();
        },
        post: function (business) {
            return post(business);
        }
    };
}]);