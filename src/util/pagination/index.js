/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-26 05:26:30
 * @LastEditTime: 2019-03-30 05:11:46
 */


require('./index.css')
var templatePagination = require('./index.string');
var _mm = require('util/mm.js')


var Pagination = function() {
  var _this = this;
  this.defaultOption = {
    container: null,
    pageNum : 1,
    pageRange : 3,
    onSelectPage : null
  }
  // 事件处理
  $(document).on('click', '.pg-item', function() {
    var $this = $(this)
    // 判断按钮点击不做处理
    if($this.hasClass('avtive') || $this.hasClass('disabled')) {
      return
    }
    typeof _this.option.onSelectPage === 'function'
      ?  _this.option.onSelectPage($this.data('value')) : null
  })
}
// 渲染分页
Pagination.prototype.render = function(userOption) {
  this.option = $.extend({}, this.defaultOption, userOption); 
  // 判断容器是否是合法的option
  if(!(this.option.container instanceof jQuery)) {
    return;
  }
  if(this.option.pages <= 1) {
    return;
  }
  // 渲染分页内容
  this.option.container.html(this.getPaginationHtml());
}

Pagination.prototype.getPaginationHtml = function() {
  var html = '',
      option = this.option,
      pageArray = [],
      start       = option.pageNum - option.pageRange > 0 
          ? option.pageNum - option.pageRange : 1,
      end         = option.pageNum + option.pageRange < option.pages
          ? option.pageNum + option.pageRange : option.pages;
  pageArray.push({
    name : '上一页',
    value: this.option.prePage,
    disabled : !this.option.hasPreviousPage
  })
  // 数字按钮的处理
  for(var i = start; i <= end; i++) {
    console.log(option.pageNum)
    pageArray.push({
      name : i,
      value: i,
      active : (i === option.pageNum)
    })
  }

  pageArray.push({
    name : '下一页',
    value: this.option.nextPage,
    disabled : !this.option.hasNextPage
  })

  html = _mm.renderHtml(templatePagination, {
    pageArray: pageArray,
    pageNum : option.pageNum,
    pages : option.pages
  })

  return html;

  // |上一页| 1 2 3 4 =5= 6 |下一个| 5/6
}

module.exports = Pagination;