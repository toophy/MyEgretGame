var tiled;
(function (tiled) {
    var TMXLayer = (function (_super) {
        __extends(TMXLayer, _super);
        /**
         * 创建1个基本图层实例
         * 为了优化渲染，这里创建了静态图层与动画图层<br/>
         * 静态图层中没有任何动画组件，将其缓存为位图，即container.cacheAsBitmap=true;<br/>
         * 动态图层中有动画
         * @param tilemap TMXTilemap实例引用
         * @param tilewidth 格子宽
         * @param tileheight 格子高
         * @param orientation 渲染方向
         * @param tilesets tilesets组
         * @param z 层深
         * @param data
         * @version Egret 3.0.3
         */
        function TMXLayer(tilemap, tilewidth, tileheight, orientation, tilesets, z, data) {
            _super.call(this, tilemap, data, z);
            this._staticContainer = new egret.Sprite();
            //
            this.addChild(this._staticContainer);
            //为了防止地图坐标为负时出现无法显示的问题，这里延迟2秒进行缓存
            setTimeout(function (self) {
                self._staticContainer.cacheAsBitmap = true;
            }, 2000, this);
            this._animationContainer = new egret.Sprite();
            this.addChild(this._animationContainer);
            this._tilemap = tilemap;
            this._tilewidth = tilewidth;
            this._tileheight = tileheight;
            this._orientation = orientation;
            this._tilesets = tilesets;
            this.tileset = this._tilesets ? this._tilesets.getTilesetByIndex(0) : null;
            this.maxTileSize = { "width": 0, "height": 0 };
            //根据Tile设置来设置图层数据
            for (var i = 0; i < this._tilesets.length; i++) {
                var tileset = this._tilesets.getTilesetByIndex(i);
                this.maxTileSize.width = Math.max(this.maxTileSize.width, tileset.tilewidth);
                this.maxTileSize.height = Math.max(this.maxTileSize.height, tileset.tileheight);
            }
            this._name = data.attributes.name;
            this._cols = +data.attributes.width;
            this._rows = +data.attributes.height;
            this._opacity = (typeof data.attributes.opacity !== "undefined") ? parseFloat(data.attributes.opacity) : 1;
            this.visible = (typeof data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;
            this._hexsidelength = +data.attributes.hexsidelength;
            this._staggeraxis = data.attributes.staggeraxis;
            this._staggerindex = +data.attributes.staggerindex;
            // layer "real" size
            if (this._orientation === "isometric") {
                this.width = (this._cols + this._rows) * (this._tilewidth / 2);
                this.height = (this._cols + this._rows) * (this._tileheight / 2);
            }
            else {
                this.width = this._cols * this._tilewidth;
                this.height = this._rows * this._tileheight;
            }
            this.initArray(this._cols, this._rows);
            //解析子属性
            var children = data.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    switch (child.localName) {
                        case tiled.TMXConstants.DATA:
                            this.parseLayerData(tiled.TMXUtils.decode(child, child.attributes.encoding, child.attributes.compression));
                            break;
                        case tiled.TMXConstants.PROPERTIES:
                            this._properties = this.tilemap.parseProperties(child);
                            break;
                        default:
                            throw new Error("TMXTileMap decode Layer is Error：" + child.localName);
                            break;
                    }
                }
            }
            this.alpha = this._opacity;
            this.visible = this.visible;
        }
        var d = __define,c=TMXLayer,p=c.prototype;
        d(p, "name"
            /**
             * 返回层的名字
             * @version Egret 3.0.3
             */
            ,function () {
                return this._name;
            }
        );
        d(p, "staticContainer"
            /**
             * 获取静态层容器（用于渲染静态对象）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._staticContainer;
            }
        );
        d(p, "animationContainer"
            /**
             * 获取动画层容器（用于渲染动画）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._animationContainer;
            }
        );
        d(p, "tilewidth"
            /**
             * 获取tile宽
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tilewidth;
            }
        );
        d(p, "tileheight"
            /**
             * 获取tile高
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tileheight;
            }
        );
        d(p, "orientation"
            /**
             * 获取渲染方向
             * @version Egret 3.0.3
             */
            ,function () {
                return this._orientation;
            }
        );
        d(p, "rows"
            /**
             * 获取水平格子数
             * @version Egret 3.0.3
             */
            ,function () {
                return this._rows;
            }
        );
        d(p, "cols"
            /**
             * 获取垂直格子数
             * @version Egret 3.0.3
             */
            ,function () {
                return this._cols;
            }
        );
        d(p, "hexsidelength"
            /**
             * @version Egret 3.0.3
             */
            ,function () {
                return this._hexsidelength;
            }
        );
        d(p, "staggeraxis"
            /**
             * @version Egret 3.0.3
             */
            ,function () {
                return this._staggeraxis;
            }
        );
        d(p, "staggerindex"
            /**
             * @version Egret 3.0.3
             */
            ,function () {
                return this.staggerindex;
            }
        );
        d(p, "opacity"
            /**
             * 获取透明度
             * @version Egret 3.0.3
             */
            ,function () {
                return this._opacity;
            }
        );
        d(p, "properties"
            /**
             * 获取图层属性列表
             * @version Egret 3.0.3
             */
            ,function () {
                return this._properties;
            }
        );
        /**
         * 设置渲染器
         * @param renderer 渲染器(包括：1、TMXHexagonoalRenderer,2、TMXIsometricRenderer,3、TMXOrthogonalRenderer)
         * @version Egret 3.0.3
         */
        p.setRenderer = function (renderer) {
            this.renderer = renderer;
        };
        /**
         * 根据像素坐标获取Tile Id
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        p.getTileId = function (x, y) {
            var tile = this.getTile(x, y);
            return tile ? tile.gid : 0;
        };
        /**
         * 根据像素坐标获取格子信息
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        p.getTile = function (x, y) {
            if (this.renderer instanceof tiled.TMXOrthogonalRenderer) {
                return this.layerData[~~this.renderer.pixelToTileX(x)][~~this.renderer.pixelToTileY(y)];
            }
            else if (this.renderer instanceof tiled.TMXIsometricRenderer) {
                return this.layerData[~~this.renderer.pixelToTileX(x, y)][~~this.renderer.pixelToTileY(y, x)];
            }
            return this.layerData[~~this.renderer.pixelToTileX(x, y)][~~this.renderer.pixelToTileY(y, x)];
        };
        /**
         * TMXTileMap#setLayerData调用
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param tileId tileset所对应的id
         * @version Egret 3.0.3
         */
        p.setTile = function (tileX, tileY, tileId) {
            if (!this.tileset.contains(tileId))
                this.tileset = this._tilesets.getTilesetByGid(tileId);
            if (this.tileset) {
                var tile = this.layerData[tileX][tileY] = new tiled.TMXTile(tileX, tileY, tileId, this.tilemap, this.tileset);
                return tile;
            }
            return null;
        };
        /**
         * 清除Tile
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @version Egret 3.0.3
         */
        p.clearTile = function (tileX, tileY) {
            this.layerData[tileX][tileY] = null;
        };
        /**
         * 绘制
         * @param rect 要绘制的矩形区域
         * @version Egret 3.0.3
         */
        p.draw = function (rect) {
            this.renderer.drawTileLayer(this, rect);
        };
        /**
         * 渲染
         * @version Egret 3.0.3
         */
        p.render = function () {
            this.renderer.render(this._animationContainer);
        };
        /**
         * 根据水平格子数与垂直格子数初始化图层数据
         * @param rows 水平格子数
         * @param cols 垂直格子数
         * @version Egret 3.0.3
         */
        p.initArray = function (rows, cols) {
            this.layerData = [];
            for (var x = 0; x < rows; x++) {
                this.layerData[x] = [];
                for (var y = 0; y < cols; y++) {
                    this.layerData[x][y] = null;
                }
            }
        };
        /**
         * 解析图层数据
         * @param data
         * @version Egret 3.0.3
         */
        p.parseLayerData = function (data) {
            if (data) {
                var idx = 0;
                for (var y = 0; y < this.rows; y++) {
                    for (var x = 0; x < this.cols; x++) {
                        var gid = data[idx];
                        if (gid !== 0)
                            this.setTile(x, y, gid);
                        idx++;
                    }
                }
            }
        };
        return TMXLayer;
    }(tiled.TMXLayerBase));
    tiled.TMXLayer = TMXLayer;
    egret.registerClass(TMXLayer,'tiled.TMXLayer');
})(tiled || (tiled = {}));
//# sourceMappingURL=TMXLayer.js.map