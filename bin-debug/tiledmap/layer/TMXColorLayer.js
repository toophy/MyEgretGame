var tiled;
(function (tiled) {
    var TMXColorLayer = (function (_super) {
        __extends(TMXColorLayer, _super);
        /**
         * 创建1个Tile颜色图层
         * @param tilemap TMXTilemap实例
         * @param color 颜色值，格式#ff0000
         * @param z 图层深度
         * @version Egret 3.0.3
         */
        function TMXColorLayer(tilemap, color, z) {
            _super.call(this);
            this._tilemap = tilemap;
            this._color = color;
            this._z = z;
            this.graphics.beginFill(tiled.TMXUtils.color16ToUnit(this._color), 1);
            this.graphics.drawRect(0, 0, tilemap.renderwidth, tilemap.renderheight);
            this.graphics.endFill();
        }
        var d = __define,c=TMXColorLayer,p=c.prototype;
        return TMXColorLayer;
    }(egret.Sprite));
    tiled.TMXColorLayer = TMXColorLayer;
    egret.registerClass(TMXColorLayer,'tiled.TMXColorLayer');
})(tiled || (tiled = {}));
//# sourceMappingURL=TMXColorLayer.js.map