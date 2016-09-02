/**
 * 测试Tiled地图
 */
var DesertExample = (function (_super) {
    __extends(DesertExample, _super);
    function DesertExample() {
        _super.call(this);
        var self = this;
        var url = "resource/assets/map001/desert.tmx";
        var urlLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //load complete
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event) {
            var data = egret.XML.parse(event.target.data);
            self.tmxTileMap = new tiled.TMXTilemap(2000, 2000, data, url);
            self.tmxTileMap.render();
            self.touchEnabled = true;
            self.addChild(self.tmxTileMap);
            self._act = new Actor(7, 7);
            var lays = self.tmxTileMap.getLayers();
            self._act.InitActor(lays[1], self.tmxTileMap);
            self._act.SetPos(1, 1);
            g_UIMgr.setFocusActor(self._act);
            self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
                self.dragBegin_x = evt.localX;
                self.dragBegin_y = evt.localY;
            }, self);
            self.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (evt) {
            }, self);
            self.addEventListener(egret.TouchEvent.TOUCH_END, function (evt) {
                var next_x = self.x + evt.localX - self.dragBegin_x;
                var next_y = self.y + evt.localY - self.dragBegin_y;
                if (next_x > 0)
                    next_x = 0;
                if (next_y > 0)
                    next_y = 0;
                if (next_x < (self.stage.stageWidth - self.tmxTileMap.width))
                    next_x = self.stage.stageWidth - self.tmxTileMap.width;
                if (next_y < (self.stage.stageHeight - self.tmxTileMap.height))
                    next_y = self.stage.stageHeight - self.tmxTileMap.height;
                if (next_x != self.x || next_y != self.y) {
                    self.x = next_x;
                    self.y = next_y;
                }
                self.dragBegin_x = evt.localX;
                self.dragBegin_y = evt.localY;
            }, self);
        }, url);
        urlLoader.load(new egret.URLRequest(url));
    }
    var d = __define,c=DesertExample,p=c.prototype;
    p.addZChild = function (g, s) {
        var my_z = s.y * this.tmxTileMap.tilewidth * this.tmxTileMap.cols + s.x;
        if (g.numChildren > 0) {
            for (var a = 0; a < g.numChildren; a++) {
                var val = g.getChildAt(a);
                if (val != s) {
                    var z = val.y * this.tmxTileMap.tilewidth * this.tmxTileMap.cols + val.x;
                    if (my_z < z) {
                        g.setChildIndex(s, a);
                        break;
                    }
                }
            }
        }
        else {
            g.setChildIndex(s, 0);
        }
    };
    return DesertExample;
}(egret.DisplayObjectContainer));
egret.registerClass(DesertExample,'DesertExample');
//# sourceMappingURL=TestMap.js.map