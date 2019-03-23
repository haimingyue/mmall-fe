/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-19 17:49:56
 * @LastEditTime: 2019-03-21 05:50:26
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
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        // 验证username
        $('#username').blur(function() {
          var username = $.trim($(this).val());
          if(!username) {return}
          // 异步验证用户名是否存在
          _user.checkUsername(username, function(res) {
            formError.hide()
          }, function(errMsg) {
            formError.show(errMsg)
          })
        })
        // 点击注册按钮
        $('#submit').click(function() {
            _this.submit()
        })
        $('.user-content').keyup(function(e) {
            if(e.keyCode===13) {
                _this.submit()
            }
        })
    },
    submit: function() {
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#passwordConfirm').val()),
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val())
        },
        validateResult = this.formValidate(formData);
        if(validateResult.status) {
            _user.register(formData, function(res) {
                window.location.href = './result.html?type=register'
            }, function(errMsg) {
                console.log(errMsg)

                formError.show(errMsg)
            })
        } else {
            // console.log(validateResult)
            // 失败
            formError.show(validateResult.msg)
        }
    },
    formValidate: function(formData) {
        var result = {
            status : false,
            msg: ''
        }
        if(!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length < 6) {
          result.msg = '密码不能少于6位';
          return result;
        }
        if(formData.password !== formData.passwordConfirm) {
          result.msg = '密码不一致';
          return result;
        }

        if(!_mm.validate(formData.phone, 'phone')) {
          console.log('formData.phone', formData.phone)
          // result.msg = '手机号码格式不正确';
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
    }
}
$(function() {
    page.init();
})