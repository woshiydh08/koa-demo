var userName="jspang";    //声明一个登录名             
var timeStamp=Date.parse(new Date());     //声明登录时的时间戳  
var jsonDdatabase={"loginUnser":userName,"loginTime":timeStamp}; //组成JSON字符串
var db = connect('log');   //链接数据库
db.login.insert(jsonDdatabase);  //插入数据

print('[demo]log  print success');  //没有错误显示成功
