var app = angular.module("phone", []);         //提供数据的增删改查服务,angular内置$http
app.service("phoneService", ["$http", function ($http) {  //http请求  get post put delete依赖注入
    this.getList = function () {
        return $http.get("/contact");
    };
}])
app.controller("mainCtrl", ["$scope", "phoneService", function ($scope, phoneService) {
    $scope.list=[];
    phoneService.getList().then(function (result) {
        var arr=[];
        var dict={};
        result.data.forEach(function (v,i) {
            var I = v.pinyin[0].toUpperCase();
            if(!dict[I]){
                var o={
                    index:I,
                    peoples:[]
                };
                o.peoples.push(v);
                arr.push(o);
                dict[I]=true;
            }else{
                arr.forEach(function (d) {
                    if(d.index==I){
                        d.peoples.push(v)
                    }
                })
            }
        })
        arr.sort(function(a,b){
            return a.index > b.index;
        })
        $scope.list =arr;
    });
    $scope.letter=[];
    for(var i=65;i<91;i++){
        $scope.letter.push(String.fromCharCode(i));
    }
    console.log($scope.letter);
}])