var service = require( '../../service/douban/douban' ),
  utils = require( '../../common/utils/utils' ),
  _fn;

Page( {
  data : {
    movie : {},
    screen : {
      minHeight : 'auto'
    }
  },
  onLoad : function( query ) {
    var self = this;
    utils.showLoading();
    // 设置页面高度，避免底部出现白色区域。
    wx.getSystemInfo( {
      success : function( info ) {
        self.setData( {
          'screen.minHeight' : info.windowHeight + 'px'
        } );
      }
    } )
    // 获取数据
    service.getMovieDetail( query.id, function( data ) {
      utils.hideLoading();
      _fn.render.call( self, data );

    } );
  }
} );

_fn = {
  render : function( data ) {
    // 设置描述
    data.genresStr = data.genres.join( '/' );
    // 把演员和导演都罗列出来
    data.staff = data.directors.concat( data.casts );
    this.setData( {
      movie : data
    } );
  }
}
