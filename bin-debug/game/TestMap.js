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
            self._act = new Actor();
            var lays = self.tmxTileMap.getLayers();
            self._act.InitActor(1, 1, lays[1], self.tmxTileMap);
            self._act.SetPos(1, 1, false);
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
            // self.createGameScene();
        }, url);
        urlLoader.load(new egret.URLRequest(url));
    }
    var d = __define,c=DesertExample,p=c.prototype;
    p.createGameScene = function () {
        var dragonbonesData = RES.getRes("Robot_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        var armature = dragonbonesFactory.buildArmature("robot");
        this.addChild(armature.display);
        armature.display.x = 200;
        armature.display.y = 300;
        armature.display.scaleX = 0.5;
        armature.display.scaleY = 0.5;
        dragonBones.WorldClock.clock.add(armature);
        armature.animation.gotoAndPlay("Standby", 0, 0, 0);
        egret.Ticker.getInstance().register(function (frameTime) { dragonBones.WorldClock.clock.advanceTime(0.01); }, this);
    };
    p.createGameScene2 = function () {
        var dragonbonesData = RES.getRes("Robot_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        var armature = dragonbonesFactory.buildArmatureDisplay("robot");
        this.addChild(armature);
        armature.x = 200;
        armature.y = 300;
        armature.scaleX = 0.15;
        armature.scaleY = 0.15;
        armature.animation.play("Run", 0);
    };
    return DesertExample;
}(egret.DisplayObjectContainer));
egret.registerClass(DesertExample,'DesertExample');
//# sourceMappingURL=TestMap.js.map