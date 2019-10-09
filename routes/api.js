var express = require('express');
var router = express.Router();
var md5 = require('../common/md5');
var mysql = require('../common/mysql');
var svgCaptcha = require('svg-captcha');
var jsona = require('../common/returnJson');
var table2json = require('../common/table2json');

router.get('/captcha',function (req, res) {
  var captcha = svgCaptcha.create({
    inverse: false, // 翻转颜色
    fontSize: 48, // 字体大小
    noise: 2, // 噪声线条数
    width: 100, // 宽度
    height: 40, // 高度
    size: 4,// 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
  });
  // 保存到session,忽略大小写
  req.session.captcha = captcha.text.toLowerCase();
  //保存到cookie 方便前端调用验证
  // res.cookie('captcha', req.session);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.write(String(captcha.data));
  res.end();
});
/* GET users listing. */
router.post('/login', function(req, res, next) {
  const uid = req.body.uid;
  const pwd = md5(req.body.pwd);
  const captcha = req.body.captcha;
  console.log(req.session.captcha);
  req.session.logname = uid;
  res.send({
    flag:true,
    msg:'登陆成功',
    data:{},
    timestamp:new Date().getTime()
  });
  if(1===1){
    mysql.query(mysql.mysql.format('select * from users where uid=? and pwd=?',[uid,pwd]),function (err, result) {
      if(err){
        res.send({
          flag:false,
          msg:'数据库忙',
          data:{},
          timestamp:new Date().getTime()
        })
      }else{
        if(result.length>0){
          req.session.logname = uid;
          res.send({
            flag:true,
            msg:'登陆成功',
            data:{},
            timestamp:new Date().getTime()
          });
        }else{
          res.send({
            flag:false,
            msg:'用户名或密码错误',
            data:{},
            timestamp:new Date().getTime()
          })
        }
      }
    })
  }else{
    res.send(jsona(false,'验证码错误'));
  }

});

router.get('/adminList',function (req, res) {
  if(true){
    const page = req.query.page;
    mysql.query(`select id,uid,tm,(select count(*) from users) as total from users limit 5 offset ${(page-1)*5}`,function (err, result) {
      if(err){
        res.send({
          flag:false,
          msg:'数据库忙',
          data:{},
          timestamp:new Date().getTime()
        })
      }else{
        res.send({
          flag:true,
          msg:'',
          data:result,
          timestamp:new Date().getTime()
        })
      }
    })
  } else {
    res.send(jsona(false,'登陆超时'));
  }
});

router.post('/pwdUpdate',function (req, res) {
  const id = req.body.id;
  const pwd = req.body.password;
  const repwd = req.body.repassword;
  if(pwd!=repwd || pwd=='' || id==''){
    console.log(id,pwd,repwd)
    res.send({
      flag:false,
      msg:'数据不正确，请重新操作',
    })
  }else{
    mysql.query(mysql.mysql.format('update users set pwd=?',[md5(pwd)]),function (err,result) {
      if(err){
        res.send({
          flag:false,
          msg:'数据库出错',
        })
      }else{
        res.send({
          flag:true,
        })
      }
    })
  }
});

router.post('/deladmin',function (req, res) {
  const id = req.body.id;
  const page = req.body.page;
  if(id==''){
    res.send({
      flag:false,
      msg:'数据不正确，请重新操作',
    })
  }else{
    mysql.query(mysql.mysql.format('delete from users where id=?',[id]),function (err,result) {
      if(err){
        res.send({
          flag:false,
          msg:'数据库出错',
        })
      }else{
        mysql.query(`select id,uid,tm,(select count(*) from users) as total from users limit 5 offset ${(page-1)*5}`,function (err, result) {
          if(err){
            res.send({
              flag:false,
              msg:'数据库忙',
              data:{},
              timestamp:new Date().getTime()
            })
          }else{
            res.send({
              flag:true,
              msg:'',
              data:result,
              timestamp:new Date().getTime()
            })
          }
        })
      }
    })
  }
});

router.post('/addAdmin',function (req, res) {
  const uid = req.body.uid;
  const pwd = req.body.pwd;
  mysql.query(mysql.mysql.format(`select * from users where uid=?`,[uid]),function (err, result) {
    if(err){
      res.send({flag:false,msg:'err1'})
    } else{
      if(result.length>0){
        res.send({flag:false,msg:'用户名已存在'});
      }else{
        mysql.query(mysql.mysql.format('insert into users (uid,pwd) values (?,?)',[uid,md5(pwd)]),function (err, result) {
          if(err){
            console.log(err)
            res.send({flag:false,msg:'err2'})
          }else{
            res.send({flag:true,msg:'成功'});
          }
        })
      }
    }
  });
});

router.post('/delAll',function (req, res)  {
  for(let i=0;i<req.body.delList.length;i++){
    if(isNaN(req.body.delList)){
      res.send({flag:false,msg:'不要攻击服务器'});
      return;
    }
  }
  const ids = req.body.delList.join(',');
  const page = req.body.cur_page;
  mysql.query(`DELETE FROM users where id in (${ids})`),function (err, result) {
    console.log(err)
    if(err){
      res.send({flag:false,msg:'服务器错误'})
    }else{
      mysql.query(`select id,uid,tm,(select count(*) from users) as total from users limit 5 offset ${(page-1)*5}`,function (err, result) {
        if(err){
          res.send({flag:false,msg:'服务器错误'})
        }else{
          res.send({
            flag:true,
            data:result
          })
        }
      })
    }
  }
});
//================================================================================================
router.get('/getClassTree',function (req, res) {
  mysql.query('select id,title,parentId from class',function (err, result) {
    if(err){
      res.send({flag:false,msg:'数据库错误'})
    }else{
      res.send({flag:true,data:table2json(result)})
    }
  })
});

router.get('/delClass/:id',function (req, res) {
  const id=req.params.id*1;
  mysql.query("CREATE table tmp as SELECT class.id as id FROM class WHERE CONCAT(class.parentPath,',',class.id,',') LIKE '%"+id+",%';\n" +
    "delete from class where class.id in(select tmp.id from tmp);\n" +
    "drop table tmp;",function (err, result) {
    if(err){
      res.send({flag:false,msg:'删除失败'})
    }else{
      res.send({flag:true});
      // res.redirect('/api/getClassTree');
    }
  })
});

router.get('/addClass/:parentid/:title',function (req, res) {
  const parentid = req.params.parentid;
  const title = req.params.title;
  mysql.query(mysql.mysql.format('select parentPath,level from class where id=?',[parentid]),function (err, result) {
    if(err || (result.length==0 && parentid != 0)){
      res.send({flag:false,msg:'数据库错误1'});
    }else{
      const parentPath = parentid!=0?result[0].parentPath+','+parentid:'0';
      const lv = parentid!=0?result[0].level++:1;
      mysql.query(mysql.mysql.format('insert into class (title,parentId,parentPath,level) values (?,?,?,?)',[title,parentid,parentPath,lv]),function (err, result) {
        if(err){
          console.log(err)
          res.send({flag:false,msg:'数据库错误2'});
        }else{
          res.send({flag:true})
        }
      })
    }
  })
});

router.post('/addNews',function (req,res) {
  const classid = req.body.classid;
  const title = req.body.title;
  const content = req.body.content;
  mysql.query(mysql.mysql.format('insert into news (classid,title,content) values (?,?,?)',[classid,title,content]),function (err, result) {
    if(err){
      res.send({flag:false,msg:'数据库错误'})
    }else{
      res.send({flag:true})
    }
  });
});

router.get('/newslist',function (req, res) {
  if(true){
    const page = req.query.page;
    mysql.query(`select id,title,tm,(select count(*) from news) as total from news limit 5 offset ${(page-1)*5}`,function (err, result) {
      if(err){
        res.send({
          flag:false,
          msg:'数据库忙',
          data:{},
          timestamp:new Date().getTime()
        })
      }else{
        res.send({
          flag:true,
          msg:'',
          data:result,
          timestamp:new Date().getTime()
        })
      }
    })
  } else {
    res.send(jsona(false,'登陆超时'));
  }
});

router.post('/delnews',function (req, res) {
  const id = req.body.id;
  const page = req.body.page;
  if(id==''){
    res.send({
      flag:false,
      msg:'数据不正确，请重新操作',
    })
  }else{
    mysql.query(mysql.mysql.format('delete from news where id=?',[id]),function (err,result) {
      if(err){
        res.send({
          flag:false,
          msg:'数据库出错',
        })
      }else{
        mysql.query(`select id,title,tm,(select count(*) from news) as total from news limit 5 offset ${(page-1)*5}`,function (err, result) {
          if(err){
            res.send({
              flag:false,
              msg:'数据库忙',
              data:{},
              timestamp:new Date().getTime()
            })
          }else{
            res.send({
              flag:true,
              msg:'',
              data:result,
              timestamp:new Date().getTime()
            })
          }
        })
      }
    })
  }
});

router.post('/newsUpdate',function (req, res) {
  const id = req.body.id;
  const title = req.body.title;
  const content = req.body.content;
  mysql.query(mysql.mysql.format(`update news set title=?,content=? where id=?`,[title,content,id]),function (err,result) {
    if(err){
      res.send({
        flag:false,
        msg:'数据库出错',
      })
    }else{
      res.send({
        flag:true,
      })
    }
  })
});

router.post('/delAllnews',function (req, res)  {
  for(let i=0;i<req.body.delList.length;i++){
    if(isNaN(req.body.delList)){
      res.send({flag:false,msg:'不要攻击服务器'});
      return;
    }
  }
  const ids = req.body.delList.join(',');
  const page = req.body.cur_page;
  mysql.query(`DELETE FROM news where id in (${ids})`),function (err, result) {
    console.log(err)
    if(err){
      res.send({flag:false,msg:'服务器错误'})
    }else{
      mysql.query(`select id,title,tm,(select count(*) from news) as total from news limit 5 offset ${(page-1)*5}`,function (err, result) {
        if(err){
          res.send({flag:false,msg:'服务器错误'})
        }else{
          res.send({
            flag:true,
            data:result
          })
        }
      })
    }
  }
});

//uni-app用的接口
router.get('/newslists',function (req, res) {
  mysql.query('select id,title,tm from news order by tm desc',function (err, result) {
    if(err){
      res.send({flag:false});
    }else{
      res.send({flag:true,data:result});
    }
  })
});
module.exports = router;