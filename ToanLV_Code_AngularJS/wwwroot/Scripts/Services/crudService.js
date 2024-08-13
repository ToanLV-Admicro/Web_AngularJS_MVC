app.service('IteamService', function ($http) {
    var baseUrl = '/api/Product'; // ??a ch? API c?a b?n

    // L?y t?t c? s?n ph?m
    this.getAll = function () {
        return $http.get(baseUrl);
    };

    // Th�m s?n ph?m m?i
    this.create = function (product) {
        return $http.post(baseUrl, product);
    };

    // X�a s?n ph?m
    this.delete = function (id) {
        return $http.delete(baseUrl + '/' + id);
    };

    // C?p nh?t s?n ph?m
    this.update = function (product) {
        return $http.put(baseUrl + '/' + product.id, product);
    };
    // L?y th�ng tin
    this.getInfor = function (id) {
        return $http.get(baseUrl + '/' + id);
    };
});
