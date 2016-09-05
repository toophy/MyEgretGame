var tiled;
(function (tiled) {
    var TMXAnimationFrame = (function () {
        /**
         * 创建1个动画帧数据解析类
         * @param tilemap 获取Tiledmap实例
         * @param tileset
         * @param tileX
         * @param tileY
         * @param data
         *
         * @version egret 3.0.3
         */
        function TMXAnimationFrame(tilemap, tileset, col, row, data) {
            this._tiledid = +data.attributes.tileid;
            this._duration = +data.attributes.duration;
            this._tile = new tiled.TMXTile(col, row, this._tiledid + tileset.firstgid, tilemap, tileset);
        }
        var d = __define,c=TMXAnimationFrame,p=c.prototype;
        d(p, "tile"
            /**
             * 获取当前画帧所使用的<code>TMXTile实例</code>
             * @version egret 3.0.3
             */
            ,function () {
                return this._tile;
            }
        );
        d(p, "tiledId"
            /**
             * 获取当前帧所使用的tileset中的id号
             * @version egret 3.0.3
             */
            ,function () {
                return this._tiledid;
            }
        );
        d(p, "duration"
            /**
             * 获取每帧持续时间(单位：毫秒)
             * @version egret 3.0.3
             */
            ,function () {
                return this._duration;
            }
        );
        return TMXAnimationFrame;
    }());
    tiled.TMXAnimationFrame = TMXAnimationFrame;
    egret.registerClass(TMXAnimationFrame,'tiled.TMXAnimationFrame');
})(tiled || (tiled = {}));
//# sourceMappingURL=TMXAnimationFrame.js.map