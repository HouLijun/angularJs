var app=angular.module("myApp",[]);
app.controller("mainCtrl",["$scope",function ($scope) {
    $scope.list=[
        {id:1,content:"标签1",checked:false},
        {id:2,content:"标签2",checked:true},
        {id:3,content:"标签3",checked:false},
        {id:4,content:"标签4",checked:true},
        {id:5,content:"标签5",checked:false},
    ]
    $scope.myChange=function (index) {
        $scope.list[index].checked=!$scope.list[index].checked;
    }
    // $scope.remove=function (index) {
    //     $scope.list[index].checked=false;
    // }
}])