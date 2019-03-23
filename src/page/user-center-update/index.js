require('./index.css')
require('page/common/header/index.js')
require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user_service.js')
var templateIndex = require('./user-info.string')



var page = {
  init: function() {
      this.onLoad();
      this.bindEvent();
  },
  onLoad: function() {
    // 初始化左侧菜单
    navSide.init({
      name: 'user-center'
    })
    this.loadUserInfo()
  },
  bindEvent: function() {
    var _this = this;
    $(document).on('click', '.btn-submit', function() {
      console.log(1)
      var userInfo = {
        phone : $.trim($('#phone').val()),
        email : $.trim($('#email').val()),
        question : $.trim($('#question').val()),
        answer : $.trim($('#answer').val()),
      }
      validityResult = _this.validateForm(userInfo);
      if(validityResult.status) {
        _user.updateUserInfo(userInfo, function(res, msg) {
          _mm.errorTips(msg)
          window.location.href = './user-center.html';
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

    if(!_mm.validate(formData.phone, 'phone')) {
      result.msg = '手机号码格式不正确';
      return result;
    }
    if(!_mm.validate(formData.email, 'email')) {
      result.msg = '邮箱格式不正确';
      return result;
    }
    if(!_mm.validate(formData.answer, 'require')) {
      result.msg = '答案不能为空';
      return result;
    }
    if(!_mm.validate(formData.question, 'require')) {
      result.msg = '问题不能为空';
      return result;
    }

    result.status = true;
    result.msg = '验证通过';
    return result;
  },
  loadUserInfo: function() {
    var userHtml = '';
    _user.getUserInfo(function(res) {
      userHtml = _mm.renderHtml(templateIndex, res)
      $('.panel-body').html(userHtml);
    }, function(errMsg) {
      _mm.errorTips(errMsg)
    })
  }
}
$(function() {
  page.init();
})