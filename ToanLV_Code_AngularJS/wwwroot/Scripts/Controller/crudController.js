app.controller('ProductController', ['$scope', 'IteamService', function ($scope, IteamService) {
    $scope.entities = [];        
    $scope.entitiesEdit = {};    
    $scope.formedit = false;     

    // Tải danh sách sản phẩm
    $scope.loadEntities = function () {
        IteamService.getAll().then(function (response) {
            $scope.entities = response.data;
        }, function (error) {
            console.error('Error fetching data', error);
        });
    };

    // Tạo sản phẩm mới
    $scope.createEntity = function () {
        IteamService.create($scope.newEntity).then(function () {
            $scope.loadEntities();
            $scope.newEntity = {};
            Swal.fire(
                'Thêm mới thành công!',
                'Sản phẩm đã được thêm mới thành công.',
                'success'
            );
        }, function (error) {
            console.error('Error creating entity', error);
        });
    };

    // Cập nhật sản phẩm
    $scope.updateEntity = function () {
        IteamService.update($scope.entitiesEdit).then(function () {
            $scope.formedit = false; 
            Swal.fire(
                'Cập nhật thành công!',
                'Sản phẩm đã được cập nhật mới thành công.',
                'success'
            );
            $scope.loadEntities();
        }, function (error) {
            console.error('Error updating entity', error);
        });
    };

    // Lấy thông tin sản phẩm để chỉnh sửa
    $scope.getInforUpdate = function (id) {
        IteamService.getInfor(id).then(function (response) {
            $scope.entitiesEdit = response.data; // Lưu thông tin sản phẩm vào biến entitiesEdit
            $scope.formedit = true;              // Hiển thị form chỉnh sửa
        }, function (error) {
            console.error('Error fetching entity information', error);
        });
    };

    // đóng form sửa lại 
    $scope.closeFormEdit = function () {
        $scope.formedit = false;             
    };

    // Xóa sản phẩm
    $scope.deleteEntity = function (id) {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa?',
            text: "Hành động này không thể hoàn tác!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa'
        }).then((result) => {
            if (result.isConfirmed) {
                IteamService.delete(id).then(function () {
                    Swal.fire(
                        'Đã xóa!',
                        'Sản phẩm đã được xóa.',
                        'success'
                    );
                    $scope.loadEntities();
                }, function (error) {
                    Swal.fire(
                        'Lỗi',
                        'Có lỗi xảy ra khi xóa sản phẩm.',
                        'error'
                    );
                    console.error('Error deleting entity', error);
                });
            }
        });
    };

    // Khởi tạo
    $scope.loadEntities();
}]);
