require('./index.css')
var _mm = require('util/mm.js')
var _user = require('service/user_service.js')
var _cart = require('service/cart_service.js')
var nav = {
  init : function() {
    console.log('mm', _mm)
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartCount();
    return this;
  },
  bindEvent: function() {
    console.log(0)
    // 登录点击事件
    $('.js-login').click(function() {
      console.log(1)
      _mm.doLogin();
    })
    // 注册点击事件
    $('.js-register').click(function() {
      console.log(2)
      window.location.href = './register.html'
    })
    // 退出点击事件
    $('.js-logout').click(function() {
      console.log(2)
      _user.logout(function(res) {
        window.location.reload();
      }, function(errMsg) {
        _mm.errorTips(errMsg);
      })
    })
  },
  // 加载用户信息
  loadUserInfo: function () {
    _user.checkLogin(function(res) {
      $('.user.not-login').hide().sibilings('.uer.login').show()
      .find('.username').text(res.username)
    }, function(errMsg) {
      // doSomthing
    })
  },
  // 加载购物车数量
  loadCartCount: function() {
    _cart.getCartCount(function(res) {
      $('.nav .cart-count').text(res || 0)
    }, function(errMsg) {
      $('.nav .cart-count').text(0)
    })
  }
};

module.exports = nav.init();