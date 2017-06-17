angular.module("work.todo",["ngRoute"])
    .config(["$routeProvider",function ($routeProvider) {
        $routeProvider.when("/todo",{
            templateUrl:"/component/todo.html",
            controller:"todoCtrl"
        })
    }])
    .controller("todoCtrl",["$scope",function ($scope) {
        $scope.list=["todo1","todo2","todo3"];
    }])