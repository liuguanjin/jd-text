//引入express框架
var express = require("express");
var app = express();
//监听3000端口
app.listen(3000);
//引入mysql数据库
var mysql = require("mysql");
//对数据库进行配置
var conn = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"mymall",
	port:"3306"
})
//引入bodyparser模块
var bodyParser = require("body-parser");
//对bodyparser解析json进行配置
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));
//对跨域进行配置
app.use("*",function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
});
//静态文件读取
app.use(express.static("../src/components/mine/public"));
//对login页面进行配置
app.post("/login",function(req,res){
	//通过bodyparser解析body
	var params = req.body;
	var uname = params.uname;
	var upwd = params.upwd;
	//对密码进行md5加密
	upwd = md5(upwd);
	//对用户名的sql查询语句
	var sql = `select * from user where uname='${uname}'`;
	//通过query连接数据库并传入sql查询语句得到data
	conn.query(sql,function(error,data){
		if(error){
			//错误优先原则
			throw new Exception(error);
		}
		//如果返回的数组长度为0表示用户不存在
		if(data.length == 0){
			var obj = {
				msg:"当前用户不存在",
				unameUndefine:true,
				showPwdPrompt:false,
				isAllowLogin:false
			}
			//将结果返回至前端
			res.send(obj);
		}else{
			//判断密码是否正确
			if (upwd == data[0]["upwd"]) {
				var obj = {
					msg:"登录成功",
					showPwdPrompt:false,
					isAllowLogin:true
				}
				//将结果返回至前端
				res.send(obj);
			}else{
				var obj = {
					msg:"密码错误",
					showPwdPrompt:true,
					isAllowLogin:false
				}
				//将结果返回至前端
				res.send(obj);
			}
		}
	})
});
//对regist界面的配置
app.post("/regist",function(req,res){
	//通过bodyparser解析body
	var params = req.body;
	var uname = params.uname;
	var upwd = params.upwd;
	//对密码进行md5加密
	upwd = md5(upwd);
	//对用户名的sql查询语句
	var sql = [`select * from user where uname='${uname}'`,`insert into user (uname,upwd) value ('${uname}','${upwd}')`];
	//通过query连接数据库并传入sql查询语句得到data
	conn.query(sql[0],function(error1,data1){
		if(error1){
			//错误优先原则
			throw new Exception(error1);
		}else{
			//如果长度值不为0表示用户已存在
			if (data1.length != 0) {
				var obj1 = {
					msg:"用户名已存在",
					isOk:false
				}
				//将结果返回至前端
				res.send(obj1);
			}else{
				//如果用户不存在即注册成功
				conn.query(sql[1],function(error2,data2){
					if(error2){
						throw new Exception(error2);
					}else{
						var obj2 = {
							msg:"注册成功",
							isOk:true
						}
						//将结果返回至前端
						res.send(obj2);
					}
				})
			}
		}
	})
});
//对md5加密进行封装
function md5(pwd){
	var salt = "adereererasdadfa";
	var cp = require("crypto");
	var md5 = cp.createHash("md5");
	md5.update(pwd + salt);
	return md5.digest("hex");
}


