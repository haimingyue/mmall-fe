/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-16 15:21:03
 * @LastEditTime: 2019-03-24 10:44:07
 */
'use strict';

require('page/common/header/index.js')
require('page/common/nav/index.js')
require('./index.css')
require('util/slider/index.js')
var sliderHtml = require('./slider.string')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')

$(function(){
  var bannerHtml = _mm.renderHtml(sliderHtml);
  $('.banner-con').html(bannerHtml)
  var $slider = 
      $('.banner').unslider({
        dots: true
      });

  // 前一张和后一张操作的事件绑定
  $('.banner-con .banner-arrow').click(function(){
    var forward = $(this).hasClass('prev') ? 'prev' : 'next';

    console.log('$slider', $slider)
    console.log('$$slider.data(unslider)', $slider.data('unslider'))
    // console.log(forward)
    $slider.data('unslider')[forward]();
});
})