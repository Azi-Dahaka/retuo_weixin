// index.js
// 获取应用实例
import api from '../../config/api.js'
const app = getApp()

Page({
  data: {
    imgsrc: '/images/dabai2.jpeg',
  },
  onLoad() {
  },
  wxlogin(){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //console.log(res);
        var that = this;
        // 获取用户信息
        wx.getSetting({
          success: resp => {
            if (resp.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: userResult => {
                  var platUserInfoMap = {}
                  platUserInfoMap["encryptedData"] = userResult.encryptedData;
                  platUserInfoMap["iv"] = userResult.iv;
                  //console.log(res.code)
                  //console.log(platUserInfoMap)
                  wx.request({
                    url: api.wxlogin,
                    data: { 
                      platCode: res.code,
                      platUserInfoMap: platUserInfoMap,
                    },
                    header: {
                      "Content-Type": "application/json;charset=utf-8"
                    },
                    method: 'POST',
                    dataType:'json',
                    success: function (res) {
                      console.log(res)
                      if(res.data.code==200){
                        wx.setStorageSync("userinfo", res.data.userinfo) //设置本地缓存
                        wx.navigateTo({
                          url: '../chat/chat',
                        })
                      }
                    },
                  fail: function (err) { },//请求失败
                  complete: function () { }//请求完成后执行的函数
                  })
                }
               })
              } 
            }
        })
      }
    })
  }
})
