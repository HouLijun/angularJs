    var app=angular.module("contactAdmin",[]);               //提供数据的增删改查服务,angular内置$http
app.service("adminService",["$http",function ($http) { //http请求  get post put delete依赖注入
    //获取数据
    this.getList = function () {
        return $http.get("/getContact");   //promise对象   异步请求
    };
    //新增数据
    this.addContact = function (name) {
        return $http.post("/addContact", {  //返回对象，对象身上有then方法
            name: name
        });
    }
    //更新数据
    this.update = function (id, key, value) {
        return $http.put("/updateContact", {
            id: id,
            key: key,
            value: value
        });
    }
    //删除数据
    this.delete = function (ids) {
        return $http({
            url: "/deleteContact",
            method: "post",
            data: {
                ids: JSON.stringify(ids)
            }
        })
    }
}])
app.controller("mainCtrl", ["$scope", "adminService", function ($scope, adminService) {
    $scope.list=[];
    adminService.getList().then(function (result) {
        result.data.forEach(function (v,i) {
            v.checked=false;            //添加属性 未选中状态
        })
        $scope.list = result.data;
        console.log($scope.list);
    });
    //增加
    $scope.add = function () {
        adminService.addContact("").then(function (result) {
            var person = {
                id: result.data,
                name: "",
                phone: "",
                pinyin:"",
                checked:false
            }
            $scope.list.push(person);
        });
    }
    //修改
    $scope.updateName = function (id, value) {
        adminService.update(id, 'name', value).then(function (result) {
            if(result.code==200){
                alert(result.info);
                //修改成功后续操作
            }
        });
    }
    $scope.updatePhone = function (id, value) {
        console.log(value);
        adminService.update(id, 'phone', value).then(function (result) {
            if(result.code==200){
                alert(result.info);
                //修改成功后续操作
            }
        });
    }
    //全选/全不选
    $scope.toggleCheck= function () {
        if($scope.checkAll){
            $scope.list.forEach(function (v,i) {
                v.checked=true;
            })
        }else{
            $scope.list.forEach(function (v,i) {
                v.checked=false;
            })
        }
    }
    //监测（所有全部选中之后全选按钮选中状态）
    $scope.$watch("list", function (newVal,oldVal) {
        var flag=true;
        newVal.forEach(function(v,i){
            if(!v.checked){
                flag=false;
            }
        })
        $scope.checkAll=flag;
    },true);
    //删除
    $scope.delete = function () {
        var ids=[];
        $scope.list.forEach(function (v,i) {
            if(v.checked){
                ids.push(v.id);
            }
        })
        adminService.delete(ids).then(function () {
            var newarr = [];
            $scope.list.forEach(function (v, i) {
                //jquery方法判断是否为选中要删除的id
                if ($.inArray(v.id, ids) == -1) {
                    newarr.push(v);
                }
            })
            $scope.list = newarr;
        });
    }
}])