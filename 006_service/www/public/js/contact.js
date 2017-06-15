var app = angular.module("contact", []);                       //提供数据的增删改查服务,angular内置$http
app.service("contactService", ["$http", function ($http) {  //http请求  get post put delete依赖注入
    //获取数据
    this.getList = function () {
        return $http.get("/contact");   //promise对象   异步请求
    };
    //新增数据
    this.addContact = function (name) {
        return $http.post("/contact", {  //返回对象，对象身上有then方法
            name: name
        });
    }
    //更新数据
    this.update = function (id, key, value) {
        return $http.put("/contact", {
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
app.controller("mainCtrl", ["$scope", "contactService", function ($scope, contactService) {
    $scope.list=[];
    contactService.getList().then(function (result) {
        result.data.forEach(function (v,i) {
            v.checked=false;            //添加属性 未选中状态
        })
        $scope.list = result.data;
    });
    //增加
    $scope.add = function () {
        contactService.addContact("").then(function (result) {
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
        contactService.update(id, 'name', value);
    }
    $scope.updatePhone = function (id, value) {
        contactService.update(id, 'phone', value);
    }
    //删除
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
    $scope.$watch("list", function (newVal,oldVal) {
        var flag=true;
        newVal.forEach(function(v,i){
            if(!v.checked){
                flag=false;
            }
        })
        $scope.checkAll=flag;
    },true);
    $scope.delete = function () {
        var ids=[];
        $scope.list.forEach(function (v,i) {
            if(v.checked){
                ids.push(v.id);
            }
        })
        contactService.delete(ids).then(function () {
            var newarr = [];
            $scope.list.forEach(function (v, i) {
                if ($.inArray(v.id, ids) == -1) {
                    newarr.push(v);
                }
            })
            $scope.list = newarr;
        });
    }
}])
