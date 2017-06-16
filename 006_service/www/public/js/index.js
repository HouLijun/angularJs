var app=angular.module("contactIndex",[]);
//依赖注入$http($http 是 AngularJS 中的一个核心服务，用于读取远程服务器的数据)
app.service("indexService",["$http",function ($http) {
    this.getList=function () {
        return $http.get("/getContact");
    }
}])
//依赖注入indexService服务
app.controller("mainCtrl",["$scope","indexService",function ($scope,indexService) {
    $scope.list=[];
    // $scope.list=[
    //     {
    //         index:"A",
    //         peoples:[
    //             {id:1,name:"阿妹",phone:"15934528727"},
    //             {id:2,name:"阿狗",phone:"15934528727"},
    //         ]
    //     },
    //     {
    //         index:"B",
    //         peoples:[
    //             {id:3,name:"宝贝",phone:"15934528727"},
    //             {id:4,name:"棒槌",phone:"15934528727"},
    //         ]
    //     }
    // ]
    indexService.getList().then(function (result) {
        var arr=[];
        var dict={};
        //result.data为想要的数组对象
        result.data.forEach(function (v,i) {
            //姓名首字母大写
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
        //按姓名拼音首字符排序
        arr.sort(function(a,b){
            return a.index > b.index;
        })
        $scope.list =arr;
    });
    //26个字母
    $scope.letter=[];
    for(var i=65;i<91;i++){
        $scope.letter.push(String.fromCharCode(i));
    }
}])