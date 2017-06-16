var mysql=require("mysql");
//创建连接池pool，连接数据库
var pool=mysql.createPool({
    connectionLimit : 1000,
    host             : 'localhost',
    user             : 'root',
    password        : '',
    database        : 'work'
})
//sql为sql语句，arr为需要传入sql的数据
//sql语句键用?? 值用?
function query(sql,arr,fn) {
    pool.getConnection(function (err,connection) {
        connection.query(sql,arr,function (err,result,fields) {
            //释放连接
            connection.release();
            //fields=字段
            fn(err,result,fields);
        })
    })
}
module.exports={
    query:query
}