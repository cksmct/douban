var service = require( '../../service/douban/douban' ),
  utils = require( '../../common/utils/utils' ),
  _fn;

Page( {
  data : {
    movies : {},
    tabs : {
      currentIndex : 0,
      list : [{
        text : '正在热映',
        type : '1'
      },{
        text : '即将上映',
        type : '2'
      },{
        text: 'TOP250',
        type : '3'
      }]
    }
  },
  onReady : function() {
    // 进入便选择第一项
    _fn.selectTab.call(this, 0 );  
  },
  changeTab : function( e ) {
    var target = e.target;
        // 选中不同项
    _fn.selectTab.call( this, target.dataset.index );
  }
} );

_fn = {
  selectTab : function( index ) {
    var self = this,
      tabs = self.data.tabs;
    // 切换状态
    self.setData( {
      'tabs.currentIndex' : index
    } );
    utils.showLoading();
    // 获取数据
    service.getMovieList( tabs.list[index].type, function( data ) {
      utils.hideLoading();
      // 渲染页面
      _fn.renderList.call( self, data );
    } );
  },
  renderList : function( data ) {
    //data = data || listData;
    // 可能会对数据进行处理
    this.setData( {
      movies : data
    } );
  }
}