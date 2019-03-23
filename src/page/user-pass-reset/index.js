/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-19 17:49:56
 * @LastEditTime: 2019-03-22 04:56:54
 */

require('./index.css')
require('page/common/nav-simple/index.js')
var _user = require('service/user_service.js')
var _mm = require('util/mm.js')

// 表单里的错误提示
var formError = {
    show: function(errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg)
    },
    hide: function() {
        $('.error-item').hide().find('.err-msg').text('')
    }
};

var page = {
    data: {
      username: '',
      question: '',
      answer: '',
      token: ''
    },
    init: function() {
      this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
      this.loadStepUsername()
    },
    bindEvent: function() {
        var _this = this;
        $('#submit-username').click(function() {
            var username = $.trim($('#username').val())
            if(username) {
              _user.getQuestion(username, function(res) {
                _this.data.username = username;
                _this.data.question = res;
                _this.loadStepQuestion();
              }, function(errMsg) {
                formError.show(errMsg)
              })
            } else {
              formError.show('请输入用户名')
            }
        })
        // 输入密码提示中的答案的问题
        $('#submit-question').click(function() {
          var answer = $.trim($('#answer').val())
          if(username) {
            _user.checkAnswer({
              username : _this.data.username,
              question : _this.data.question,
              answer : answer
            }, function(res) {
              _this.data.answer = answer;
              _this.data.token = res;
              _this.loadStepPassword();
            }, function(errMsg) {
              formError.show(errMsg)
            })
          } else {
            formError.show('请输入密码提示答案')
          }
      })
      // 输入新密码按钮点击
      $('#submit-password').click(function() {
        var password = $.trim($('#password').val())
        if(password && password.length >= 6) {
          _user.resetPassword({
            username : _this.data.username,
            passwordNew : password,
            forgetToken : _this.data.token
          }, function(res) {
            window.location.href = './result.html?type=pass-reset'
          }, function(errMsg) {
            formError.show(errMsg)
          })
        } else {
          formError.show('请输入不少于6位新密码')
        }
    })
    },
    loadStepUsername: function() {
      // 加载输入用户名的一步
      $('.step-username').show()
    },
    loadStepQuestion: function() {
      var _this = this;
      // 加载输入提示密码的一步
      formError.hide();
      $('.step-username').hide()
        .siblings('.step-question').show()
        .find('.question').text(_this.data.question);
      
    },
    loadStepPassword: function() {
      // 加载输入密码的一步
      formError.hide();
      $('.step-question').hide()
        .siblings('.step-password').show()
    }
}
$(function() {
    page.init();
})