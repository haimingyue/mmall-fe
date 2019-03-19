/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-17 06:34:59
 * @LastEditTime: 2019-03-18 05:20:06
 */

 'strict'
 var conf= {
  serverHost: ''
 }
 var Hogan = require('hogan.js');
 var _mm = {
   request : function(param) {
     var _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success: function(res) {
        if(res.status === 0) {
          // 请求成功
          typeof param.success === 'function' && param.success(res.data, res.msg)
        } else if(10 === status) {
          //没有登录
          _this.doLogin();
        } else if(1 === status) {
          //请求数据错误
          typeof param.error === 'function' && param.error(res.data, res.msg)
        }
      },
      error: function(err) {
        typeof param.error === 'function' && param.error(err.statusText)
      }
    }) 
   },
   // 获取服务器地址
   getServerUrl: function(path) {
     return conf.serverHost + path
   },
   // 获取url的参数
   getUrlParam: function(name) {
    // happymall.com/product/list?keyword=xxx$page=1
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null
   },

   renderHtml: function(htmlTemplate, data) {
     // 第一步编译
     var template = Hogan.compile(htmlTemplate),
         result = template.render(data);

      return result;

   },

   // 提示的方法处理
   
   successTips: function(msg) {
    alert(msg || '操作成功！')
   },
   errorTips: function(msg) {
    alert(msg || '哪里失败了！')
   },

   // 其他处理,!空，email，phone
   validate: function(value, type) {
    var value = $.trim(value);
    // 非空验证
    if(type === 'require') {
      return !!value;
    }
    // 手机号验证
    if(type==='phone') {
      return /^1\d{10}$/.test(value)
    }
    // 邮箱格式验证
    if(type==='email') {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
    }
   },
   // 统一登录处理
   doLogin: function() {
    window.location.href = './login.html?redirect=' + encodeURI(window.location.href)
   },
   // goHome
   goHome: function() {
    window.location.href = './index.html'
   }
 };

 module.exports = _mm;