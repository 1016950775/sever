var mysql=require("mysql");
var pool = mysql.createPool({
    host     : '127.0.0.1',
    port     :'3306',
    user     : 'root',
    password : '123456',
    database : 'db_temp',
  multipleStatements: true,
});

var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
    console.log(pool._allConnections.length);
};
module.exports={mysql,query};