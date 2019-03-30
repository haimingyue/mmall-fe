/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-19 17:49:56
 * @LastEditTime: 2019-03-28 15:13:20
 */

require('./index.css')
require('page/common/nav-simple/index.js')
var _user = require('service/user_service.js')
var _mm = require('util/mm.js')

// $(function() {
//    console.log(1111)
   
//    var type = _mm.getUrlParam('type') || 'default',
//        $element = $('.' + type + '-success');
//    // 显示对应的元素
//    $element.show();
    
// })
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
        },
        validateResult = this.formValidate(formData);
        if(validateResult.status) {
            _user.login(formData, function(res) {
                console.log(1)
                window.location.href = _mm.getUrlParam('redirect') || './index.html'
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
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}
$(function() {
    page.init();
})