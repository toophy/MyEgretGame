var tiled;
(function (tiled) {
    var TMXImage = (function (_super) {
        __extends(TMXImage, _super);
        /**
         * Tile图像
         * @param data 图像数据
         * @param baseURL 地址前缀
         * @version Egret 3.0.3
         */
        function TMXImage(data, baseURL) {
            _super.call(this);
            this._width = +data.attributes.width;
            this._height = +data.attributes.height;
            this._source = data.attributes.source;
            this._trans = (typeof data.attributes.trans !== "undefined") ? data.attributes.trans : '000000';
            this._bitmap = new egret.Bitmap();
            this._source = baseURL + this._source;
            this.loadImage(this._source);
        }
        var d = __define,c=TMXImage,p=c.prototype;
        d(p, "texture"
            /**
             * 获取图像加载完后的纹理
             * @version Egret 3.0.3
             */
            ,function () {
                return this._texture;
            }
        );
        d(p, "bitmap"
            /**
             * 获取图像加载完后的图片
             * @version Egret 3.0.3
             */
            ,function () {
                return this._bitmap;
            }
        );
        d(p, "source"
            /**
             * 获取图像加载的源地址
             * @version Egret 3.0.3
             */
            ,function () {
                return this._source;
            }
        );
        d(p, "width"
            /**
             * 获取图像的原始宽（单位：像素）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._width;
            }
        );
        d(p, "height"
            /**
             * 获取图像的原始高（单位：像素）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._height;
            }
        );
        /**
         * 加载图像
         * @param $url
         * @version Egret 3.0.3
         */
        p.loadImage = function (url) {
            if (url == null || url == "")
                return;
            RES.getResByUrl(url, function (texture) {
                if (texture) {
                    this._bitmap.texture = texture;
                    this._texture = texture;
                    this._width = texture.textureWidth;
                    this._height = texture.textureHeight;
                    this.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, texture));
                }
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        return TMXImage;
    }(egret.EventDispatcher));
    tiled.TMXImage = TMXImage;
    egret.registerClass(TMXImage,'tiled.TMXImage');
})(tiled || (tiled = {}));
//# sourceMappingURL=TMXImage.js.map