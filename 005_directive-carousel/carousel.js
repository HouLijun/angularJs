var app=angular.module("directive",[]);
app.controller("mainCtrl",["$scope", function ($scope) {
    $scope.list=[
        {id:1,title:"1",img:"imgs/1.jpg"},
        {id:2,title:"2",img:"imgs/2.jpg"},
        {id:3,title:"3",img:"imgs/3.jpg"},
        {id:4,title:"4",img:"imgs/4.jpg"}
    ]
}]);
app.directive("carousel", function () {
    return {
        restrict:"AE",
        replace:true,
        scope:{
            data:"=",
            speed:"=",
            control:"=",
            type:"@",
            callback:"&"
        },
        templateUrl:"carousel.html",
        controller:function ($scope) {
            $scope.index=0;
            setInterval(function () {
                $scope.$apply();
                $scope.index = ($scope.index + 1 < $scope.data.length) ? $scope.index + 1 : 0;
            },$scope.speed);
            $scope.prev= function () {
                $scope.index = ($scope.index - 1 < 0) ? $scope.data.length - 1 : $scope.index - 1;
            }
            $scope.next= function () {
                $scope.index = ($scope.index + 1 < $scope.data.length) ? $scope.index + 1 : 0;
            }
            $scope.indicator= function (i) {
                $scope.index=i;
            }
        },
        link: function (scope,element,attr) {
            /* var index=0;
            function render(direction){
                var indicators=element.find(".carousel-indicators li");
                var slides=element.find(".carousel-inner .item");
                index=element.find(".carousel-inner .active").index();
                direction = direction||"next";
                if(direction == "prev"){
                    index -= 1;
                    if(index < 0){
                        index = scope.data.length-1;
                    }
                }else if(direction == "next"){
                    index += 1;
                    if(index >= scope.data.length){
                        index=0;
                    }
                }
                indicators.removeClass("active").eq(index).addClass("active");
                slides.removeClass("active").eq(index).addClass("active");
            }
            setInterval(render,scope.speed)*/
        }
    }
})