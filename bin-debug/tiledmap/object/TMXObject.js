var tiled;
(function (tiled) {
    //可能存在普通对象，也可能存在动画
    var TMXObject = (function (_super) {
        __extends(TMXObject, _super);
        /**
         * 创建一个Tile对象实例
         * @param data 数据
         * @param orientation 渲染方向
         * @param tilesets TMXTilesetGroup实例
         * @param z 对象所在的层深
         * @param color 对象所使用的颜色
         * @version Egret 3.0.3
         */
        function TMXObject(data, orientation, tilesets, z, color) {
            _super.call(this);
            this._points = undefined;
            this._name = data.attributes.name;
            this.x = +data.attributes.x;
            this.y = +data.attributes.y;
            this._z = +z;
            this.width = +data.attributes.width || 0;
            this.height = +data.attributes.height || 0;
            this._gid = +data.attributes.gid || null;
            this._type = data.attributes.type;
            this.rotation = +data.attributes.rotation || 0;
            this._id = +data.attributes.id || undefined;
            this._orientation = orientation;
            this._shapes = undefined;
            this._color = color;
            this._isEllipse = false;
            this._isPolygon = false;
            this._isPolyLine = false;
            this.visible = (typeof data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;
            // 检测当前对象是否已经分配了gid(只有图块对象层才会分配gid)
            if (typeof this._gid === "number") {
                this._isImage = true;
                this.setTile(tilesets);
            }
            else {
                this._points = [];
                var self = this;
                var children = data.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        switch (child.localName) {
                            case tiled.TMXConstants.ELLIPSE:
                                this._isEllipse = true;
                                this._isImage = false;
                                this._ellipse = this.parseEllipse(child);
                                break;
                            case tiled.TMXConstants.POLYGON:
                                this._isPolygon = true;
                                this._isImage = false;
                                this._points = this.parsePolygonOrPolyline(child.attributes.points);
                                break;
                            case tiled.TMXConstants.POLYLINE:
                                this._isPolyLine = true;
                                this._isImage = false;
                                this._points = this.parsePolygonOrPolyline(child.attributes.points);
                                break;
                            case tiled.TMXConstants.PROPERTIES:
                                if (tilesets.tilemap)
                                    this._properties = tilesets.tilemap.parseProperties(child);
                                break;
                        }
                    }
                }
            }
            //parseShapes
            if (!this._shapes)
                this._shapes = this.parseTMXShapes();
            for (var i = 0; i < this._shapes.length; i++) {
                var _shape = this._shapes[i];
                this.addChild(_shape);
            }
        }
        var d = __define,c=TMXObject,p=c.prototype;
        d(p, "id"
            /**
             * 对象自增长id
             * @version Egret 3.0.3
             */
            ,function () {
                return this._id;
            }
        );
        d(p, "gid"
            /**
             * tileset中对应的id
             * @version Egret 3.0.3
             */
            ,function () {
                return this._gid;
            }
        );
        d(p, "name"
            /**
             * 对象名称
             * @version Egret 3.0.3
             */
            ,function () {
                return this._name;
            }
        );
        d(p, "type"
            /**
             * 对象类型
             * @version Egret 3.0.3
             */
            ,function () {
                return this._type;
            }
        );
        d(p, "z"
            /**
             * 对象所在层深
             * @version Egret 3.0.3
             */
            ,function () {
                return this._z;
            }
        );
        d(p, "isEllipse"
            /**
             * 当前对象是否是椭圆
             * @version Egret 3.0.3
             */
            ,function () {
                return this._isEllipse;
            }
        );
        d(p, "isPolygon"
            /**
             * 当前对象是否为多边形
             * @version Egret 3.0.3
             */
            ,function () {
                return this._isPolygon;
            }
        );
        d(p, "isPolyLine"
            /**
             * 当前对象是否为折线
             * @version Egret 3.0.3
             */
            ,function () {
                return this._isPolyLine;
            }
        );
        d(p, "isImage"
            /**
             * 当前对象是否为图像
             * @version Egret 3.0.3
             */
            ,function () {
                return this._isImage;
            }
        );
        /**
         * 解析多边形或者折线数据
         * @param $points
         * @version Egret 3.0.3
         */
        p.parsePolygonOrPolyline = function ($points) {
            var datas = [];
            var points = $points.split(" ");
            if (points) {
                for (var i = 0; i < points.length; i++) {
                    var pdata = points[i].split(",");
                    datas[i] = [+pdata[0], +pdata[1]];
                }
            }
            return datas;
        };
        /**
         * 解析椭圆数据
         * @param $data
         * @version Egret 3.0.3
         */
        p.parseEllipse = function ($data) {
            var _width = +$data.attributes.width || 32;
            var _height = +$data.attributes.height || 32;
            return [_width, _height];
        };
        /**
         * 解析多种对象（包括：椭圆，多边形，折线等）
         * @version Egret 3.0.3
         */
        p.parseTMXShapes = function () {
            var shapes = [];
            if (this._isEllipse) {
                var _ellipse = new tiled.Ellipse(0, 0, this.width, this.height);
                _ellipse.draw(this._color);
                shapes.push(_ellipse);
            }
            else if (this._isPolygon) {
                var _polygon = new tiled.Polygon(0, 0, this._points);
                _polygon.draw(this._color);
                shapes.push(_polygon);
            }
            else if (this._isPolyLine) {
                var _polyline = new tiled.PolyLine(0, 0, this._points);
                _polyline.draw(this._color);
                shapes.push(_polyline);
            }
            else {
                if (!this._gid) {
                    var _polygon = new tiled.Polygon(0, 0, [[0, 0], [this.width, 0], [this.width, this.height], [0, this.height]]);
                    _polygon.draw(this._color);
                    shapes.push(_polygon);
                }
            }
            if (this._orientation === "isometric") {
                for (var i = 0; i < shapes.length; i++) {
                    var shape = shapes[i];
                    shape.rotation = 45;
                    shape.scaleX = Math.SQRT1_2;
                    shape.scaleY = Math.SQRT1_2;
                }
            }
            return shapes;
        };
        /**
         * 设置Tile
         * @param tilesets TMXTileset实例
         * @version Egret 3.0.3
         */
        p.setTile = function (tilesets) {
            var tileset = tilesets.getTilesetByGid(this._gid);
            if (tileset) {
                this._tile = new tiled.TMXTile(0, 0, this.gid, tileset.tilemap, tileset);
                tileset.drawTile(this, tileset.tileoffset.x, tileset.tileoffset.y - tileset.tileheight, this._tile);
            }
        };
        return TMXObject;
    }(egret.Sprite));
    tiled.TMXObject = TMXObject;
    egret.registerClass(TMXObject,'tiled.TMXObject');
})(tiled || (tiled = {}));
//# sourceMappingURL=TMXObject.js.map