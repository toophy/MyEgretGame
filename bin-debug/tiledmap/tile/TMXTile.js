var tiled;
(function (tiled) {
    var TMXTile = (function (_super) {
        __extends(TMXTile, _super);
        /**
         * 创建一个新的TMXTile实例，此类存储了场景的格子数据与Tileset中格子的数据
         * @param tileX 场景中的水平格子坐标
         * @param tileY 场景中的垂直格子坐标
         * @param gid tileset中的格子id
         * @param tilemap TMXTilemap实例
         * @param tileset TMXTileset实例
         * @version Egret 3.0.3
         */
        function TMXTile(tileX, tileY, gid, tilemap, tileset) {
            _super.call(this);
            this._tileset = tileset;
            this._tileX = tileX;
            this._tileY = tileY;
            this._tilemap = tilemap;
            this._gid = gid;
            this._flippedX = (this._gid & tiled.TMXConstants.TMX_FLIP_H) !== 0;
            this._flippedY = (this._gid & tiled.TMXConstants.TMX_FLIP_V) !== 0;
            this._flippedAD = this._flippedX && this._flippedY; //(this._gid & tiled.TMXConstants.TMX_FLIP_AD) !== 0;
            this._flipped = this._flippedX || this._flippedY || this._flippedAD;
            this._gid &= tiled.TMXConstants.TMX_CLEAR_BIT_MASK;
            this._tileData = tileset.getSpecialTileDataByTileId(this._gid);
            if (this._tileData) {
                var children = this._tileData.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        switch (child.localName) {
                            case tiled.TMXConstants.PROPERTIES:
                                this._properties = tilemap.parseProperties(child);
                                break;
                            case tiled.TMXConstants.OBJECT_GROUP:
                                break;
                            case tiled.TMXConstants.IMAGE:
                                this._image = new tiled.TMXImage(child, this.tilemap.baseURL);
                                break;
                            case tiled.TMXConstants.ANIMATION:
                                this._animation = new tiled.TMXAnimation(tilemap, tileset, tileX, tileY, child);
                                break;
                        }
                    }
                }
            }
        }
        var d = __define,c=TMXTile,p=c.prototype;
        d(p, "gid"
            /**
             * 获取在tileset所对应的格子id
             * @version Egret 3.0.3
             */
            ,function () {
                return this._gid;
            }
        );
        d(p, "tileX"
            /**
             * 获取其在场景水平格子坐标
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tileX;
            }
        );
        d(p, "tileY"
            /**
             * 获取其在场景中垂直格子坐标
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tileY;
            }
        );
        d(p, "tileset"
            /**
             * 获取其在场景中所引用的TMXTileset实例
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tileset;
            }
        );
        d(p, "image"
            ,function () {
                return this._image;
            }
        );
        d(p, "tilemap"
            /**
             * 获取对TMXTilemap实例的引用
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tilemap;
            }
        );
        d(p, "flippedX"
            /**
             * 获取格子是否进行了水平方向翻转
             * @version Egret 3.0.3
             */
            ,function () {
                return this._flippedX;
            }
        );
        d(p, "flippedY"
            /**
             * 获取格子是否进行了垂直方向翻转
             * @version Egret 3.0.3
             */
            ,function () {
                return this._flippedY;
            }
        );
        d(p, "flippedAD"
            /**
             * 获取格子是否进行了水平且垂直方向翻转
             * @version Egret 3.0.3
             */
            ,function () {
                return this._flippedAD;
            }
        );
        d(p, "flipped"
            /**
             * 获取格子是否进行了翻转（不管是水平还是垂直）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._flipped;
            }
        );
        d(p, "animation"
            /**
             * 获取格子的动画信息(如果没有动画信息，那么为空)
             * @version Egret 3.0.3
             */
            ,function () {
                return this._animation;
            }
        );
        return TMXTile;
    }(egret.Sprite));
    tiled.TMXTile = TMXTile;
    egret.registerClass(TMXTile,'tiled.TMXTile');
})(tiled || (tiled = {}));
//# sourceMappingURL=TMXTile.js.map