var tiled;
(function (tiled) {
    var TMXAnimation = (function () {
        /**
         * 创建1个新的tile动画实例
         * @param tilemap TMXTilemap实例引用
         * @param tileset TMXTileset实例引用
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param data 动画数据
         * @version egret 3.0.3
         */
        function TMXAnimation(tilemap, tileset, tileX, tileY, data) {
            this.tileX = tileX;
            this.tileY = tileY;
            this._currentFrame = 0;
            if (data) {
                this._tilemap = tilemap;
                this._tileset = tileset;
                this._data = data;
                this._animations = [];
                this._currentFrame = 0;
                var children = data.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        var frame = new tiled.TMXAnimationFrame(tilemap, tileset, tileX, tileY, child);
                        this._animations[i] = frame;
                    }
                }
            }
        }
        var d = __define,c=TMXAnimation,p=c.prototype;
        /**
         * 渲染
         * @version egret 3.0.3
         */
        p.render = function () {
            this._currentFrame++;
            this._currentFrame = this._currentFrame % this._animations.length;
        };
        d(p, "currentAnimationFrame"
            /**
             * 获取当前运行时动画帧<code>tiled.TMXAnimationFrame</code>实例
             * @version egret 3.0.3
             */
            ,function () {
                return this._animations[this._currentFrame];
            }
        );
        d(p, "animations"
            /**
             * 获取动画帧列表
             * @version egret 3.0.3
             */
            ,function () {
                return this._animations;
            }
        );
        return TMXAnimation;
    }());
    tiled.TMXAnimation = TMXAnimation;
    egret.registerClass(TMXAnimation,'tiled.TMXAnimation');
})(tiled || (tiled = {}));
//# sourceMappingURL=TMXAnimation.js.map