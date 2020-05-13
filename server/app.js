//引入express框架
var express = require("express");
var app = express();
//监听3001端口
app.listen(3301);
//引入mysql数据库
var mysql = require("mysql");
// 创建MySql连接池并配置参数
const mysqlConf = {
    host:"localhost",  //ip或域名
    user:"root",          //用户名
    password:"", //密码
    database:"mymall",   //数据库的名称
    port:"3306",
    dateStrings: true,
    multipleStatements:true
};
// 用于保存数据连接实例
var db = null;
var pingInterval;

// 如果数据连接出错，则重新连接
function handleError(err) {
    logger.info(err.stack || err);
    connect();
}

// 建立数据库连接
function connect() {
    if (db !== null) {
        db.destroy();
        db = null;
    }

    db = mysql.createConnection(mysqlConf);
    db.connect(function (err) {
        if (err) {
            logger.info("error when connecting to db,reConnecting after 2 seconds:", err);
            setTimeout(connect, 2000);
        }
    });
    db.on("error", handleError);

    // 每个小时ping一次数据库，保持数据库连接状态
    clearInterval(pingInterval);
    pingInterval = setInterval(() => {
        db.ping((err) => {
            if (err) {
                console.log('ping error: ' + JSON.stringify(err));
            }
        });
    }, 3600000);
}
connect();
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
//对登录login页面进行配置
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
	db.query(sql,function(error,data){
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
//对注册regist界面的配置
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
	db.query(sql[0],function(error1,data1){
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
				db.query(sql[1],function(error2,data2){
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
// 如果用户已登录，将该用户存在数据库的购物车内容同步至前端
app.post("/cart",function(req,res){
	var params = req.body;
	var uname = params.uname;
	var sql1 =`select * from user where uname='${uname}'`;
	var cartArr = [];
	db.query(sql1,function(error1,data1){
		if (error1) {
			//错误优先原则
			throw new Exception(error1);
		}else{
			var userid = data1[0]["id"];
			var sql2 = `select * from cart where userID='${userid}'`;
			db.query(sql2,function(error2,data2){
				if (error2) {
					//错误优先原则
					throw new Exception(error2);
				}else{
					var goodIdArr = [];
					var buyNumArr = [];
					for(var i = 0;i < data2.length;i ++ ){
						goodIdArr.push(data2[i]["GOODID"]);
						buyNumArr.push(data2[i]["BUYNUM"]);
					}
					for(var j = 0;j < goodIdArr.length;j ++ ){
						var sql3 = `select * from goods where GOODID='${goodIdArr[j]}'`;
						var buyNum = buyNumArr[j];
						var k=0;
						db.query(sql3,function(error3,data3){
							if (error3) {
								//错误优先原则
								throw new Exception(error3);
							}else{
								var detail = [JSON.stringify({ title:data3[0]["GOODTITLE"]+data3[0]["GOODDESCRIBE"],
												des:data3[0]["GOODDESCRIBE"],
												num:buyNum,
												price:data3[0]["GOODPRICE"],
												src:data3[0]["GOODIMG"],
												smlSelOrCom:true
											})]
								var cartGoodsDetail = {
									shopName:data3[0]["SHOPNAME"],
									selOrCom:true,
									detail:detail
								}
								cartArr.push(cartGoodsDetail);
								if (k == (goodIdArr.length-1)) {
									res.send(cartArr);
								}
								k+=1;
							}
						})
					}
				}
			})
		}
	})
})
//如果用户已登录，刷新或关闭网页时将此时购物车的内容同步至数据库
app.post("/addcart",function(req,res){
	var params = req.body;
	var arr = params.cartArr;
	var uname = params.uname;
	for(var i = 0;i < arr.length;i ++ ){
		var detail = arr[i].detail;
		for(var j = 0;j < detail.length;j ++ ){
			detail[j] = JSON.parse(detail[j]);
			var splitArr = detail[j].title.split(detail[j].des);
			var sql1 = `select * from goods where GOODTITLE='${splitArr[0]}';select * from user where uname='${uname}'`
			var buyNum = detail[j].num;
			db.query(sql1,function(error1,data1){
				if (error1) {
					//错误优先原则
					throw new Exception(error1);
				}else{
					var goodId = data1[0][0]["GOODID"];
					var userId = data1[1][0]["id"];
					var sql2 = `select * from cart where userID=? and GOODID=?`;
					db.query(sql2,[userId,goodId],function(error2,data2){
						if (error2) {
							//错误优先原则
							throw new Exception(error2);
						}else{
							if (data2.length == 0) {
								var sql3 = `insert into cart (GOODID,userID,BUYNUM) value ('${goodId}','${userId}','${buyNum}')`
								db.query(sql3,function(error3,data3){
									if (error3) {
										//错误优先原则
										throw new Exception(error3);
									}else{
										// console.log("新的一个商品已加入购物车")
									}
								})
							}else if(data2[0]["BUYNUM"] != buyNum){
								var sql4 = `UPDATE cart SET BUYNUM='${buyNum}' WHERE userID='${userId}' AND GOODID='${goodId}'`
								db.query(sql4,function(error4,data4){
									if (error4) {
										//错误优先原则
										throw new Exception(error4);
									}else{
										// console.log("购物车商品数量已刷新");
									}
								})
							}else{
								// console.log("该商品已在购物车");
							}
						}
					})
				}
			})
		}
	}
})
// 如果用户已登录，将该用户存在数据库的收藏夹内容同步至前端
app.post("/collect",function(req,res){
	var params = req.body;
	var uname = params.uname;
	var sql = `select * from user where uname='${uname}'`;
	var collectArr = [];
	db.query(sql,function(error1,data1){
		if (error1) {
			//错误优先原则
			throw new Exception(error1);
		}else{
			var userid = data1[0]["id"];
			var sql2 = `select * from favorite where userID='${userid}'`;
			db.query(sql2,function(error2,data2){
				if (error2) {
					//错误优先原则
					throw new Exception(error2);
				}else{
					var goodIdArr = [];
					for(var i = 0;i < data2.length;i ++ ){
						goodIdArr.push(data2[i]["GOODID"]);
					}
					for(var j = 0;j < goodIdArr.length;j ++ ){
						var sql3 = `select * from goods where GOODID='${goodIdArr[j]}'`;
						var k=0;
						db.query(sql3,function(error3,data3){
							if (error3) {
								//错误优先原则
								throw new Exception(error3);
							}else{
								var collectGoodsDetail = {
									shopName:data3[0]["SHOPNAME"],
									title:data3[0]["GOODTITLE"]+data3[0]["GOODDESCRIBE"],
									des:data3[0]["GOODDESCRIBE"],
									price:data3[0]["GOODPRICE"],
									src:data3[0]["GOODIMG"]
								}
								collectArr.push(collectGoodsDetail);
								if (k == (goodIdArr.length-1)) {
									res.send(collectArr);
								}
								k+=1;
							}
						})
					}
				}
			})
		}
	})
})
//如果用户已登录，刷新或关闭网页时将此时收藏夹的内容同步至数据库
app.post("/addcollect",function(req,res){
	var params = req.body;
	var arr = params.collectArr;
	var uname = params.uname;
	for(var i = 0;i < arr.length;i ++ ){
		var splitArr = arr[i].title.split(arr[i].des);
		var sql1 = `select * from goods where GOODTITLE='${splitArr[0]}';select * from user where uname='${uname}'`
		db.query(sql1,function(error1,data1){
			if (error1) {
				//错误优先原则
				throw new Exception(error1);
			}else{
				var goodId = data1[0][0]["GOODID"];
				var userId = data1[1][0]["id"];
				var sql2 = `select * from favorite where userID=? and GOODID=?`;
				db.query(sql2,[userId,goodId],function(error2,data2){
					if (error2) {
						//错误优先原则
						throw new Exception(error2);
					}else{
						if (data2.length == 0) {
							var sql3 = `insert into favorite (GOODID,userID) value ('${goodId}','${userId}')`
							db.query(sql3,function(error3,data3){
								if (error3) {
									//错误优先原则
									throw new Exception(error3);
								}else{
									// console.log("新的一个商品已加入收藏夹")
								}
							})
						}else{
							// console.log("该商品已在收藏夹");
						}
					}
				})
			}
		})
	}
})
//如果用户已登录，将足迹内容同步至前端
app.post("/footprint",function(req,res){
	console.log("footprint");
	var params = req.body;
	var uname = params.uname;
	var sql1 = `select * from user where uname='${uname}'`;
	db.query(sql1,function(error1,data1){
		if (error1) {
			throw new Exception(error1);
		}else{
			var userId = data1[0]["id"];
			var sql2 = `select * from footprint where userId='${userId}'`;
			db.query(sql2,function(error2,data2){
				if (error2) {
					throw new Exception(error2);
				}else{
					var dateArr = [];
					var good = [];
					for(var i = 0;i < data2.length;i ++ ){
						dateArr.push(data2[i]["DATE"]);
						good.push(data2[i]["F_GOOD"]);
					}
					var footprint = [];
					for(var j = 0;j < good.length;j ++ ){
						var goodId = good[j].split(",");
						for(var x = 0;x < goodId.length;x ++ ){
							var detail = [];
							var sql3 = `select * from goods where GOODID='${goodId[x]}'`;
							(function(j,x){
								db.query(sql3,function(error3,data3){
									if (error3) {
										throw new Exception(error3);
									}else{
										var content = {src:data3[0]["GOODIMG"],
											title:data3[0]["GOODTITLE"]+data3[0]["GOODDESCRIBE"],
											des:data3[0]["GOODDESCRIBE"],
											price:data3[0]["GOODPRICE"],
											shopName:data3[0]["SHOPNAME"]
										}
										detail.push(JSON.stringify(content));
										if (x == goodId.length-1) {
											footprint.push({date:dateArr[j],detail:detail})
											detail=[];
										}
										if (j == good.length-1 && x == goodId.length-1) {
											res.send(footprint);
										}
									}
								})
							})(j,x)
						}
					}
				}
			})
		}
	})
})
//如果用户已登录，刷新或关闭网页时将此时足迹的内容同步至数据库
app.post("/addfootprint",function(req,res){
	var params = req.body;
	var footprintArr = params.footprintArr || [];
	var uname = params.uname;
	for(var o = 0;o < footprintArr.length;o ++ ){
		var date = footprintArr[o].date;
		var detail = footprintArr[o].detail;
		for(var j = 0;j < detail.length;j ++ ){
			detail[j] = JSON.parse(detail[j]);
			var title = detail[j].title.split(detail[j].des);
			var sql1 = `select * from goods where GOODTITLE='${title[0]}';select * from user where uname='${uname}'`;
			db.query(sql1,function(error1,data1){
				if (error1) {
					throw new Exception(error1);
				}else{
					var goodId = data1[0][0]["GOODID"];
					var userId = data1[1][0]["id"];
					var goodIdArr = [];
					console.log(goodId);
					console.log(userId);
					// console.log(typeof(goodId));
					// goodIdArr.push();
				}
			})
		}
	}
})
//对md5加密进行封装
function md5(pwd){
	var salt = "adereererasdadfa";
	var cp = require("crypto");
	var md5 = cp.createHash("md5");
	md5.update(pwd + salt);
	return md5.digest("hex");
}
