var tiled;
(function (tiled) {
    var TMXLayerBase = (function (_super) {
        __extends(TMXLayerBase, _super);
        /**
         * 图层基类
         * @param tilemap TMXTilemap实例
         * @param data
         * @param z 图层层深
         * @version Egret 3.0.3
         */
        function TMXLayerBase(tilemap, data, z) {
            _super.call(this);
            this._tilemap = tilemap;
            this._data = data;
            this._z = z;
        }
        var d = __define,c=TMXLayerBase,p=c.prototype;
        d(p, "tilemap"
            /**
             * 获取TMXTilemap实例
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tilemap;
            }
        );
        d(p, "z"
            /**
             * 获取图层所在的层深
             * @version Egret 3.0.3
             */
            ,function () {
                return this._z;
            }
        );
        /**
         * 实现ILayer绘制<code>draw</code>接口
         * @param rect 绘制的矩形区域
         * @version Egret 3.0.3
         */
        p.draw = function (rect) {
        };
        return TMXLayerBase;
    }(egret.Sprite));
    tiled.TMXLayerBase = TMXLayerBase;
    egret.registerClass(TMXLayerBase,'tiled.TMXLayerBase',["tiled.ILayer"]);
})(tiled || (tiled = {}));
//# sourceMappingURL=TMXLayerBase.js.map