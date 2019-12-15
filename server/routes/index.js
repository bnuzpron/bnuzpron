//接口文件
var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js');

var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  }else{
    res.json(ret);
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//测试 显示数据
router.get('/list', function(req, res, next) {
  connection.query("SELECT * FROM bili_usermsg", function(error, results, field) {
    console.log(results);
  });
});
//注册接口
router.post('/register', function(req, res, next) {
  var params = req.body;
  connection.query("INSERT INTO bili_usermsg(username, password) VALUES(?,?)", [params.username,params.password], function(error, results, field) {
    if(error){
      console.log(error);
    }
    if(results){
      jsonWrite(res,results);
      res.end("is over");
    }
    console.log("success");
  });
});
//判断用户名是否被使用
router.post('/checkUsername', function(req, res, next) {
  var params = req.body;
  connection.query("SELECT * FROM bili_usermsg WHERE username='${username}'",[params.username], function(error, results) {
    if(error) throw error;
    if(!results.length){
      res.send({error_code: 1, reason: "用户名已存在"});
    } else {
      res.send({error_code: 0, reason: "可以使用的用户名"});
    }
  });
});

//collect test
router.get('/list1', function(req, res, next) {
    connection.query("SELECT * FROM bili_usercollect", function(error, results, field) {
        console.log(results);
    });
});

//get user's collection
router.get('/collect', function(req, res, next) {
  // res.end(1);
  console.log("111");
  res.end("1");
  //   connection.query("SELECT id FROM bili_usercollect where username = 'lxy'", function(error, results, field) {
  //       console.log(results);
  //       res.end(results);
  //   });
});


module.exports = router;
