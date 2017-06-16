//引入别的js，用express服务器
var express=require("express");
var app=express();
//连接数据库
var mysql=require("./mysql.js");
//body-parser用来处理post接收的数据
var bodyParser = require('body-parser');
var pinyin = require("pinyin");

//将public文件路径变为静态路径，引用public里的文件直接/css/index.css即可
app.use(express.static(__dirname+"/www/public"));
//保存视图路径
var views=__dirname+"/www/view";
//访问前台localhost:3000/
app.get("/",function (req,res) {
    res.sendfile(views+"/index.html");
})
//访问后台localhost:3000/admin
app.get("/admin",function (req,res) {
    res.sendfile(views+"/admin.html");
})

////////////////////前后台获取数据////////////////////
app.get("/getContact",function (request,response) {
    var sql="select * from contact";
    mysql.query(sql,[],function (err,result) {
        response.json(result);
    })
})
////////////////////增加数据////////////////////
//处理Post请求//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/addContact', function (request,response) {
    var sql = 'insert into contact (name) values(?)';
    mysql.query(sql,[request.body.name],function (err,result) {
        response.json(result.insertId);         //返回id
    })
})
////////////////////修改数据////////////////////
app.put('/updateContact', function (request,response) {
    var sql="";
    if(request.body.key == "name"){
        var py=pinyin(request.body.value,{
            style:pinyin.STYLE_NORMAL,
            heteronym: true
        }).join(" ");
        sql = 'update contact set name = ?,pinyin=? where id=? ';//键用?? 值用?
        mysql.query(sql,[request.body.value,py,request.body.id],function (err,result) {
            if(!err){
                response.json({
                    code:200,
                    info:"修改成功"
                })
            }else{
                response.json({
                    code:501,
                    info:"修改失败"
                })
            }
        })
    }else if(request.body.key == "phone"){
        sql = 'update contact set phone = ? where id=? ';//键用?? 值用?
        mysql.query(sql,[request.body.value,request.body.id],function (err,result) {
            if(!err){
                response.json({
                    code:200,
                    info:"修改成功"
                })
            }else{
                response.json({
                    code:501,
                    info:"修改失败"
                })
            }
        })
    }

})
////////////////////批量删除////////////////////
app.post('/deleteContact', function (request,response) {
    var ids=JSON.parse(request.body.ids).join(',');
    var sql = `delete from contact where id in (${ids})`;
    mysql.query(sql,[],function (err,result) {
        if(!err){
            response.json({
                code:200,
                info:"删除成功"
            })
        }else{
            response.json({
                code:501,
                info:"删除失败"
            })
        }
    })
})






//监听端口号3000，默认是80
app.listen(3000);