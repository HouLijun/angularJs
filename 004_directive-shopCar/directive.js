var app=angular.module("directive",[]);
app.controller("mainCtrl",["$scope", function ($scope) {
    $scope.prevent= function (e) {
        e.stopPropagation();
    }
    $scope.goods=[
        {id:1,name:"电饭锅",price:500,img:"imgs/1.jpg",des:"电饭锅"},
        {id:2,name:"电磁炉",price:200,img:"imgs/2.jpg",des:"电磁炉"},
        {id:3,name:"微波炉",price:300,img:"imgs/3.jpg",des:"微波炉"},
        {id:4,name:"电饭煲",price:450,img:"imgs/4.jpg",des:"电饭煲"},
        {id:5,name:"冰箱",price:1500,img:"imgs/5.jpg",des:"冰箱"},
        {id:6,name:"电陶炉",price:350,img:"imgs/6.jpg",des:"电陶炉"}
    ];
    $scope.shopCar=[];
    //检测数组里有无某个id
    function check(id){
        var flag=false;
        $scope.shopCar.forEach(function(v,i){
            if(v.id==id){
                flag=true;
            }
        })
        return flag;
    }
    $scope.add= function (obj) {
        var id= obj.id;
        if(check(id)){
            $scope.shopCar.forEach(function (v,i) {
                if(v.id==id){
                    obj.num+=1;
                }
            })
        }else{
            $scope.shopCar.push(obj);
            obj.num=1;
        }
    }
    $scope.remove= function (num,i) {
        if(num<=0){
            $scope.shopCar.splice(i,1);
        }
    }
    //计算商品总数
    $scope.number=function(){
        var n=0;
        $scope.shopCar.forEach(function (v,i) {
            n+= v.num;
        })
        return n;
    }
    //计算商品总价
    $scope.expense= function () {
        var price=0;
        $scope.shopCar.forEach(function (v,i) {
            price += ( v.price * v.num ) ;
        })
        return price;
    }
}])
app.directive("templateHeader",[function () {
    return {
        restrict:"AE",
        replace:true,
        templateUrl:"template/header.html"
    }
}])
app.directive("card",[function () {
    return {
        restrict:"AE",
        replace:true,
        scope:{         //加上scope这个配置项，这个自定义指令会变成独立作用域，看不到外层的$scope对象
            data:"=",    //接收HTML传来的数据data     用于从外层作用于传值给指令
            fn:"&"       //&绑定 允许对函数表达式求值  用于从外层作用于传函数给指令
        },
        templateUrl:"template/card.html",
        link: function (scope,element,attr) {
            //操作DOM元素，很多效果anjular不好做
            //element == JQlite对象       引入jquery.js以后自动转为jquery对象

            //添加效果
            element.on("click",".btn-primary", function (e) {
                var car=$(".dropdown-toggle");
                var circle=$("<div class='circle'><div>");
                circle.appendTo("body").css({
                    top: e.clientY-10,
                    left: e.clientX-10
                }).animate({
                    top:car.offset().top+25,
                    left:car.offset().left+50,
                    opacity:0
                },800).queue(function () {
                    $(this).remove().dequeue();
                });
            })
        }
    }
}])