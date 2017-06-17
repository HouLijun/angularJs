angular.module("work.note",["ngRoute"])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/note",{
            templateUrl:"/component/note.html",
            controller:"NoteCtrl"
        })
    }])
    .service("noteService",[function () {
        this.getData=function () {
            return ["note1","note2","note3"]
        }
    }])
    .controller("NoteCtrl",["$scope","noteService",function($scope,noteService){
        $scope.list=noteService.getData();
        console.log(noteService.getData());
    }])