require('./index.css')
require('page/common/header/index.js')
require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user_service.js')



var page = {
  init: function() {
      this.onLoad();
      this.bindEvent();
  },
  onLoad: function() {
    // 初始化左侧菜单
    navSide.init({
      name: 'user-pass-update'
    })
  },
  bindEvent: function() {
    var _this = this;
    $(document).on('click', '.btn-submit', function() {
      console.log(1)
      var userInfo = {
        password : $.trim($('#password').val()),
        passwordNew : $.trim($('#password-new').val()),
        passwordConfirm : $.trim($('#password-confirm').val())
      }
      console.log('userinfo', userInfo)
      validityResult = _this.validateForm(userInfo);
      if(validityResult.status) {
        _user.passwordUpdate({
          passwordOld: userInfo.password,
          passwordNew: userInfo.passwordNew
        }, function(res, msg) {
          _mm.errorTips(msg)
        }, function(errMsg) {
          _mm.errorTips(errMsg)
        });
      } else {
        _mm.errorTips(validityResult.msg)
      }
    })
  },
  validateForm: function(formData) {
    var result = {
      status : false,
      msg: ''
    }

    if(!_mm.validate(formData.password, 'require')) {
      result.msg = '原密码不能为空';
      return result;
    }
    if(!formData.passwordNew || formData.passwordNew.length < 6) {
      result.msg = '新密码长度不能小于6位';
      return result;
    }
    if(formData.passwordNew !== formData.passwordConfirm) {
      console.log(formData.passworddNew)
      console.log(formData.passwordConfirm)
      result.msg = '密码不一致';
      return result;
    }

    result.status = true;
    result.msg = '验证通过';
    return result;
  }
}
$(function() {
  page.init();
})