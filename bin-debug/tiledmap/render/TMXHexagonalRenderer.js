var tiled;
(function (tiled) {
    var TMXHexagonalRenderer = (function (_super) {
        __extends(TMXHexagonalRenderer, _super);
        /**
         * 创建1个六角形渲染器实例
         * @param rows 水平方向格子数
         * @param cols 垂直方向格子数
         * @param tilewidth 格子宽（单位：像素）
         * @param tileheight 格子高（单位：像素）
         * @param hexsidelength
         * @param staggeraxis
         * @param staggerindex
         * @version Egret 3.0.3
         */
        function TMXHexagonalRenderer(rows, cols, tilewidth, tileheight, hexsidelength, staggeraxis, staggerindex) {
            _super.call(this, rows, cols, tilewidth, tileheight);
            this._hexsidelength = hexsidelength;
            this._staggeraxis = staggeraxis;
            this._staggerindex = staggerindex;
            this._sidelengthx = 0;
            this._sidelengthy = 0;
            if (staggeraxis === "x")
                this._sidelengthx = hexsidelength;
            else
                this._sidelengthy = hexsidelength;
            this._sideoffsetx = (this.tilewidth - this._sidelengthx) / 2;
            this._sideoffsety = (this.tileheight - this._sidelengthy) / 2;
            this._columnwidth = this._sideoffsetx + this._sidelengthx;
            this._rowheight = this._sideoffsety + this._sidelengthy;
            this._centers = [new egret.Point(), new egret.Point(), new egret.Point(), new egret.Point()];
        }
        var d = __define,c=TMXHexagonalRenderer,p=c.prototype;
        /**
         * 是否可渲染
         * @param layer
         * @version Egret 3.0.3
         */
        p.canRender = function (layer) {
            return (layer.orientation === tiled.TMXConstants.ORIENTATION_HEXAGONAL) && _super.prototype.canRender.call(this, layer);
        };
        /**
         * 像素坐标转化为格子坐标
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        p.pixelToTileCoords = function (x, y) {
            if (this._staggeraxis === "x")
                x = x - ((this._staggerindex === "old") ? this._sidelengthx : this.tilewidth);
            else
                y = y - ((this._staggerindex === "old") ? this._sideoffsety : this.tileheight);
            var referencePoint = new egret.Point(Math.floor(x / (this.tilewidth + this._sidelengthx)), Math.floor(y / (this.tileheight + this._sidelengthy)));
            var rel = new egret.Point(x - referencePoint.x * (this.tilewidth + this._sidelengthx), y - referencePoint.y * (this.tilewidth + this._sidelengthy));
            if (this._staggeraxis === "x") {
                referencePoint.x = referencePoint.x * 2;
                if (this._staggerindex === "even") {
                    ++referencePoint.x;
                }
            }
            else {
                referencePoint.y = referencePoint.y * 2;
                if (this._staggerindex === "even") {
                    ++referencePoint.y;
                }
            }
            //确定最近的六角瓦片距离中心的距离
            var left, top, centerX, centerY;
            if (this._staggeraxis === "x") {
                left = this._sidelengthx / 2;
                centerX = left + this._columnwidth;
                centerY = this.tileheight / 2;
                this._centers[0].setTo(left, centerY);
                this._centers[1].setTo(centerX, centerY - this._rowheight);
                this._centers[2].setTo(centerX, centerY + this._rowheight);
                this._centers[3].setTo(centerX + this._columnwidth, centerY);
            }
            else {
                top = this._sidelengthy / 2;
                centerX = this.tilewidth / 2;
                centerY = top + this._rowheight;
                this._centers[0].setTo(centerX, top);
                this._centers[1].setTo(centerX - this._columnwidth, centerY);
                this._centers[2].setTo(centerX + this._columnwidth, centerY);
                this._centers[3].setTo(centerX, centerY + this._rowheight);
            }
            var nearest = 0;
            var minDist = Number.MAX_VALUE;
            var dc;
            for (var i = 0; i < 4; ++i) {
                dc = Math.pow(this._centers[i].x - rel.x, 2) + Math.pow(this._centers[i].y - rel.y, 2);
                if (dc < minDist) {
                    minDist = dc;
                    nearest = i;
                }
            }
            var offsetsStaggerX = [
                { x: 0, y: 0 },
                { x: +1, y: -1 },
                { x: +1, y: 0 },
                { x: +2, y: 0 },];
            var offsetsStaggerY = [
                { x: 0, y: 0 },
                { x: -1, y: +1 },
                { x: 0, y: +1 },
                { x: 0, y: +2 },];
            var offsets = (this._staggeraxis === "x") ? offsetsStaggerX : offsetsStaggerY;
            return new egret.Point(referencePoint.x + offsets[nearest].x, referencePoint.y + offsets[nearest].y);
        };
        /**
         * 像素坐标转换成水平格子坐标
         * @param x 水平像素坐标（单位：像素）
         * @param y 垂直像素坐标（单位：像素）
         * @version Egret 3.0.3
         */
        p.pixelToTileX = function (x, y) {
            var ret = this.pixelToTileCoords(x, y);
            return ret.x;
        };
        /**
         * 像素坐标转换成垂直格子坐标
         * @param y 垂直像素坐标（单位：像素）
         * @param x 水平像素坐标（单位：像素）
         * @version Egret 3.0.3
         */
        p.pixelToTileY = function (y, x) {
            var ret = this.pixelToTileCoords(x, y);
            return ret.y;
        };
        /**
         * 返回指定的瓦片对应的像素位置
         * @param q
         * @param r
         * @version Egret 3.0.3
         */
        p.tileToPixelCoords = function (q, r) {
            var x, y;
            if (this._staggeraxis === "x") {
                x = q * this._columnwidth;
                if (this._staggerindex === "odd") {
                    y = r * (this.tileheight + this._sidelengthy);
                    y = y + (this._rowheight * (q & 1));
                }
                else {
                    y = r * (this.tileheight + this._sidelengthy);
                    y = y + (this._rowheight * (1 - (q & 1)));
                }
            }
            else {
                y = r * this._rowheight;
                if (this._staggerindex === "odd") {
                    x = q * (this.tilewidth + this._sidelengthx);
                    x = x + (this._columnwidth * (r & 1));
                }
                else {
                    x = q * (this.tilewidth + this._sidelengthx);
                    x = x + (this._columnwidth * (1 - (r & 1)));
                }
            }
            return new egret.Point(x, y);
        };
        /**
         * 绘制格子
         * @param renderer 渲染容器
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param tile TMXTile实例
         * @version Egret 3.0.3
         */
        p.drawTile = function (renderer, tileX, tileY, tile) {
            var point = this.tileToPixelCoords(tileX, tileY);
            var tileset = tile.tileset;
            tileset.drawTile(renderer, tileset.tileoffset.x + point.x, tileset.tileoffset.y + point.y + (this.tileheight - tileset.tileheight), tile);
        };
        /**
         * 绘制图层
         * @param layer 图层
         * @param rect 绘制区域
         * @version Egret 3.0.3
         */
        p.drawTileLayer = function (layer, rect) {
            var staticContainer = layer.staticContainer;
            var start = this.pixelToTileCoords(Math.floor(rect.x), Math.floor(rect.y));
            var end = this.pixelToTileCoords(Math.floor(rect.x + rect.width + this.tilewidth), Math.floor(rect.y + rect.height + this.tileheight));
            start.x = start.x < 0 ? 0 : start.x;
            start.y = start.y < 0 ? 0 : start.y;
            end.x = end.x > this.rows ? this.rows : end.x;
            end.y = end.y > this.cols ? this.cols : end.y;
            for (var y = start.y; y < end.y; y++) {
                for (var x = start.x; x < end.x; x++) {
                    var tmxTile = layer.layerData[x][y];
                    if (tmxTile) {
                        if (tmxTile.animation)
                            this.animationTiles.push({ "tmxTile": tmxTile, "pos": [x, y] });
                        else
                            this.drawTile(staticContainer, x, y, tmxTile);
                    }
                }
            }
        };
        return TMXHexagonalRenderer;
    }(tiled.TMXRenderer));
    tiled.TMXHexagonalRenderer = TMXHexagonalRenderer;
    egret.registerClass(TMXHexagonalRenderer,'tiled.TMXHexagonalRenderer');
})(tiled || (tiled = {}));
//# sourceMappingURL=TMXHexagonalRenderer.js.map