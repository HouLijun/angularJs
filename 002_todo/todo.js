var app=angular.module("todo",[]);
app.controller("todoCtrl",["$scope",function ($scope) {
    //默认显示全部
    $scope.state=0;
    //读取本地存储
    if(localStorage.todoList){
        $scope.list=JSON.parse(localStorage.todoList);
    }else{
        $scope.list=[];
    }
    //保存到本地存储
    $scope.save=function () {
        localStorage.todoList=JSON.stringify($scope.list);
    }
    //添加待办事项
    $scope.add=function () {
        var key=$scope.key;
        if(key){
            $scope.list.push({content:key,isDone:false});
        }
        $scope.key="";
        $scope.save();
    }
    //删除事项
    $scope.remove=function (index) {
        $scope.list.splice(index,1);
        $scope.save();
    }
    //未完成
    $scope.todo=function (v) {
        return !v.isDone;
    }
    //完成
    $scope.done=function (v) {
        return v.isDone;
    }
    //数据过滤
    $scope.dataFilter=function (v) {
        if($scope.state==0){
            return true;
        }else if($scope.state==1){
            return v.isDone;
        }else if($scope.state==2){
            return !v.isDone;
        }
    }
}])