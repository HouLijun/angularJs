angular.module("work.contact",["ngRoute"])
    .config(["$routeProvider",function ($routeProvider) {
        $routeProvider.when("/contact",{
            templateUrl:"/component/contact.html",
            controller:"contactCtrl"
        })
    }])
    .service("contactService",["$http",function ($http) {
        this.getList=function () {
            return $http.get("/contact");
        }
    }])
    .controller("contactCtrl",["$scope",function ($scope) {
        $scope.list=["c1","c2","c3"];
    }])