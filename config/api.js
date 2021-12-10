// 以下是业务服务器API地址
// 本机开发时使用
var WxApiRoot = 'http://localhost:5000/';
// 局域网测试使用
//var WxApiRoot = 'http://10.3.105.81:5000/';
//热点
//var WxApiRoot= 'http://192.168.215.242:5000/';
module.exports = {
  reply: WxApiRoot+'reply',//回复功能
  wxlogin: WxApiRoot+'auth/wxlogin',//微信登录
}