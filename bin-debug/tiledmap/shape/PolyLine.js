var tiled;
(function (tiled) {
    var PolyLine = (function (_super) {
        __extends(PolyLine, _super);
        /**
         * 创建1个新的折线实例
         * @param x 水平坐标（单位：像素）
         * @param y 垂直坐标（单位：像素）
         * @param points 折线对应的点数据列表
         * @version Egret 3.0.3
         */
        function PolyLine(x, y, points) {
            _super.call(this);
            this.points = points;
            this.x = x;
            this.y = y;
        }
        var d = __define,c=PolyLine,p=c.prototype;
        /**
         * 根据参数<code>color</code>绘制折线，参数为16进制表示形式，例如：0xff0000
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
        return PolyLine;
    }(egret.Sprite));
    tiled.PolyLine = PolyLine;
    egret.registerClass(PolyLine,'tiled.PolyLine');
})(tiled || (tiled = {}));
//# sourceMappingURL=PolyLine.js.map