angular.module("work.common",[])
    .service(["commonService","$http", function ($http) {
        this.get= function () {
            return $http.get("/contact")
        }
    }])