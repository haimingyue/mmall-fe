require('./index.css');

var _mm = require('util/mm.js');

var header = {
  init: function() {
    this.bindEvent();
  },
  onLoad: function() {
    var keyword = _mm.getUrlParam('keyword');
    if(keyword) {
      $('#search-input').val(keyword);
    }
  },
  bindEvent: function() {
    var _this = this
    $('#search-btn').click(function() {
      _this.searchSubmit();
    })
    // 输入会车后，做搜索提交
    $('#search-input').keyup(function(e){
      // 13是回车键的keyCode
      if(e.keyCode === 13){
          _this.searchSubmit();
      }
  });
  },
  searchSubmit : function() {
    console.log('click')
    var keyword = $.trim($('#search-input').val())
    console.log(keyword)
    if(keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    } else {
      _mm.goHome()
    }
  }
}
header.init();