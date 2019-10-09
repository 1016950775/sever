var express = require('express');
var router = express.Router();
var mysql = require('../common/mysql');
var table2json = require('../common/table2json');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/addClass',function (req, res) {
  // title,parentId,parentPath,level
  const title = req.query.title;
  const parentId = req.query.parentId?req.query.parentId:0;
  let parentPath = '0';
  let level = 1;
  if(parentId){
    mysql.query(`select * from class where id=${parentId}`,function (err, result) {
      parentPath = result[0].parentPath?result[0].parentPath+','+result[0].id:result[0].id;
      level = result[0].level+1;
      mysql.query(`insert into class (title,parentId,parentPath,level) values ('${title}',${parentId},'${parentPath}',${level})`,function (err, resilt) {
        if(err){
          console.log(err)
          res.send('err');
        }else{
          res.send('ok');
        }
      })
    })
  }else{
    mysql.query(`insert into class (title,parentId,parentPath,level) values ('${title}',${parentId},'${parentPath}',${level})`,function (err, resilt) {
      if(err){
        console.log(err)
        res.send('err');
      }else{
        res.send('ok');
      }
    })
  }


});
router.get('/getClass',function (req,res) {
  mysql.query('select * from class order by id asc',function (err, result) {
    if(err){
      res.send('err')
    }else{
      res.json(table2json(result));
    }
  })
});

router.get('delClass',function (req, res) {
  let sql = "delete from class where CONCAT(',',parentPath,',',id,',') LIKE '%,6,%'"
});
module.exports = router;
