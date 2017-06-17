var app=angular.module("list",[]);
app.service('appService',[function () {     //提供数据的增删改查服务
    this.aa=1;		                        //属性
    this.getAllData=function(){		//方法
        if(localStorage.array){
            return JSON.parse(localStorage.array);
        }else{
            return [];
        }
    };
    this.saveAllDataToLacal= function (notes) {
        localStorage.array=JSON.stringify(notes);
    }
}

])
app.controller("mainCtrl",["$scope","appService", function ($scope,appService) {
    /*$scope.list=[
        {id:1,title:"angular",content:"用angular做便签",theme:"primary",position:{left:10,top:10}},
        {id:2,title:"angular",content:"用angular做便签",theme:"success",position:{left:30,top:30}},
        {id:3,title:"angular",content:"用angular做便签",theme:"info",position:{left:60,top:60}}
    ]*/
    //读取
    $scope.zIndex=[0];
    $scope.list=appService.getAllData();
    //存储
    $scope.$watch("list",function (newVal,oldVal) {
        $scope.zIndex=[];
        //localStorage.array=JSON.stringify(newVal);
        appService.saveAllDataToLacal(newVal);
        newVal.forEach(function(v,i){
            $scope.zIndex.push(v.index);
        })
        $scope.zIndex.sort(function (x,y) {
            return y-x;
        })
    },true);
    $scope.add= function () {
        if($scope.list.length==0){
            $scope.zIndex=[0];
        }else{
            $scope.zIndex=[];
            $scope.list.forEach(function(v,i){
                $scope.zIndex.push(v.index);
            })
            $scope.zIndex.sort(function (x,y) {
                return y-x;
            })
        }

        var index=0;
        var length=$scope.list.length;
        var num=1;
        if(length !== 0){
            num=$scope.list[length-1].id + 1;
        }
        var newData={id:num,title:"题目",content:"内容",theme:"primary",position:{left:0,top:0},index:$scope.zIndex[0]+1};
        $scope.list.push(newData);
    }
    $scope.del= function (i) {
        $scope.list.splice(i, 1);
    }
}])
app.directive("memo",[function(){
    return {
        restrict:"AE",
        replace:true,
        scope:{
            data:"=",
            position:"=",
            remove:"&",
            z:"="
        },
        templateUrl:"memo.html",
        controller: function ($scope,$element) {
            $scope.up= function () {
                $scope.data.index=$scope.z[0] + 1;
                //$scope.data.index=$scope.indexData[0]+1;
            }
        },
        link: function (scope,element,attr) {
            element.on("dblclick","input",function () {
                $(this).removeAttr("disabled");
            })
            element.on("blur","input", function () {
                $(this).attr("disabled","disabled");
            })
            /*element.removeClass("toTop");
            element.on("click", function () {
                if($(document).find(".toTop")){
                    $(document).find(".toTop").removeClass("toTop");
                }
                $(this).addClass("toTop");
            })*/
            var parent=element.closest(".panel-body");
            var width=parent.innerWidth();
            var left=parent.offset().left;
            var top=parent.offset().top;
            var height=parent.innerHeight();
            var note=element.children(".panel-heading");
            var flag;
            note.on("mousedown",function(e){
                var ev=e||window.event;//解决兼容问题
                var ox=ev.offsetX;//距事件源的距离
                var oy=ev.offsetY;
                if($(this).closest(".panel").find("input[disabled]").length !== 0){
                    $(document).on("mousemove",function(e){//如果对象是note，移动太快会脱落；
                        var ev=e||window.event;
                        var cx=ev.clientX;//距浏览器窗口的距离
                        var cy=ev.clientY;
                        var l=cx-left-ox;//盒子距浏览器窗口的距离
                        var t=cy-top-oy;
                        if(l<=0){//最小到达0
                            l=0;
                        }
                        if(t<=0){
                            t=0;
                        }
                        if(l>=width-element.innerWidth()){//最大到达的距离
                            l=width-element.innerWidth();
                        }
                        if(t>=height-element.innerHeight()){
                            t=height-element.innerHeight();
                        }
                        //$(that).css({left:l+"px",top:t+"px"})
                        scope.$apply(function () {
                            scope.position.left=l;
                            scope.position.top=t;
                        })
                    })
                    $(document).on("mouseup",function(){
                        $(document).off("mousemove");//鼠标弹起时移动事件移除；
                    })
                }



            })
        }
    }
}])