/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-19 17:49:56
 * @LastEditTime: 2019-03-20 05:25:02
 */

 require('./index.css')
 require('page/common/nav-simple/index.js')
 var _mm = require('util/mm.js')

 $(function() {
    console.log(1111)
    
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    // 显示对应的元素
    $element.show();
 })