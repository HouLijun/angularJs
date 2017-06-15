var app=angular.module("test",[]);
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
    //加入购物车
    $scope.add= function (obj) {
        var id= obj.id;
        //如果id存在，则数量加1;不存在则购物车追加
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
        //数量小于1时，把该条数据删除
        if(num<=0){
            $scope.shopCar.splice(i,1);
        }
    }
}])