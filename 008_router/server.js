var express=require("express");
var app=express();
app.use(express.static(__dirname+"/www"));
app.get("/",function (req,res) {
    res.sendfile(__dirname+"/www/view/index.html");
})
app.listen(4000);