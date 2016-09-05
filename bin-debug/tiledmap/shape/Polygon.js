var tiled;
(function (tiled) {
    var Polygon = (function (_super) {
        __extends(Polygon, _super);
        /**
         * 创建1个新的多边形实例
         * @param x 水平坐标（单位：像素）
         * @param y 垂直坐标（单位：像素）
         * @param points 多边形对应的点数据列表，三角形有三个点数据，n边形有n个点数据
         * @version Egret 3.0.3
         */
        function Polygon(x, y, points) {
            _super.call(this);
            this.points = points;
            this.x = x;
            this.y = y;
        }
        var d = __define,c=Polygon,p=c.prototype;
        /**
         * 根据参数<code>color</code>绘制多边形，参数为16进制表示形式，例如：0xff0000
         * @param color 颜色值
         * @version Egret 3.0.3
         */
        p.draw = function (color) {
            this.graphics.clear();
            this.graphics.lineStyle(2, color);
            this.graphics.beginFill(color, 0.2);
            if (this.points) {
                for (var i = 0; i < this.points.length; i++) {
                    var _data = this.points[i];
                    if (i == 0)
                        this.graphics.moveTo(_data[0], _data[1]);
                    else
                        this.graphics.lineTo(_data[0], _data[1]);
                }
            }
            this.graphics.endFill();
        };
        return Polygon;
    }(egret.Sprite));
    tiled.Polygon = Polygon;
    egret.registerClass(Polygon,'tiled.Polygon');
})(tiled || (tiled = {}));
//# sourceMappingURL=Polygon.js.map