var tiled;
(function (tiled) {
    var TMXImageLayer = (function (_super) {
        __extends(TMXImageLayer, _super);
        /**
         * 创建1个图像图层实例
         * @param tilemap TMXTilemap实例
         * @param data 图像图层数据
         * @param z 层深
         * @version Egret 3.0.3
         */
        function TMXImageLayer(tilemap, data, z) {
            _super.call(this, tilemap, data, z);
            this._name = data.attributes.name;
            this.x = +data.attributes.x;
            this.y = +data.attributes.y;
            this._z = z;
            this._opacity = (typeof +data.attributes.opacity !== "undefined") ? +data.attributes.opacity : 1;
            this.visible = (typeof +data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;
            //解析源
            var children = data.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var child = data.children[i];
                    switch (child.localName) {
                        case tiled.TMXConstants.IMAGE:
                            this._source = child.attributes.source;
                            this._transColor = child.attributes.trans;
                            this.loadImage(this.tilemap.baseURL + this._source);
                            break;
                        case tiled.TMXConstants.PROPERTIES:
                            this._properties = this._tilemap.parseProperties(child);
                            break;
                        default:
                            throw new Error("TMXTileMap decode ImageLayer is Error：" + child.localName);
                            break;
                    }
                }
            }
        }
        var d = __define,c=TMXImageLayer,p=c.prototype;
        d(p, "bitmap"
            /**
             * 获取图像图层的位图，如果源图像没有加载完成，那么，数据为空
             * @version Egret 3.0.3
             */
            ,function () {
                return this._bitmap;
            }
        );
        d(p, "texture"
            /**
             * 获取图像图层的纹理，如果源图像没有加载完成，那么，数据为空
             * @version Egret 3.0.3
             */
            ,function () {
                return this._texture;
            }
        );
        d(p, "alpha"
            /**
             * 创建图像图层的透明度
             * @version Egret 3.0.3
             */
            ,function () {
                return this._opacity;
            }
        );
        /**
         * 加载图片
         * @param $url 图片地址
         * @version Egret 3.0.3
         */
        p.loadImage = function (url) {
            if (url == null || url == "")
                return;
            RES.getResByUrl(url, function (texture) {
                if (texture) {
                    this._sourcebitmap.texture = texture;
                    this._texture = texture;
                    this.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, texture));
                }
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        /**
         * 绘制矩形区域内的图像
         * @param rect 矩形区域
         * @version Egret 3.0.3
         */
        p.draw = function (rect) {
            var renderTexture = new egret.RenderTexture();
            var brect = new egret.Rectangle(this.x, this.y, this._sourcebitmap.width, this._sourcebitmap.height);
            rect = brect.intersection(rect);
            rect.right = Math.ceil(this.tilemap.width / this.tilemap.tilewidth) * this.tilemap.tilewidth;
            rect.bottom = Math.ceil(this.tilemap.height / this.tilemap.tileheight) * this.tilemap.tileheight;
            //补充可能缺失的部分像素区域
            renderTexture.drawToTexture(this._sourcebitmap, rect);
            this._bitmap = new egret.Bitmap();
            this._bitmap.texture = renderTexture;
            this._bitmap.alpha = this._opacity;
            this._bitmap.visible = this.visible;
            this.addChild(this._bitmap);
        };
        return TMXImageLayer;
    }(tiled.TMXLayerBase));
    tiled.TMXImageLayer = TMXImageLayer;
    egret.registerClass(TMXImageLayer,'tiled.TMXImageLayer');
})(tiled || (tiled = {}));
//# sourceMappingURL=TMXImageLayer.js.map