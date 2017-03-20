/**
 * 测试Tiled地图
 */
class DesertExample extends egret.DisplayObjectContainer {

    private tmxTileMap: tiled.TMXTilemap;
    private dragBegin_x: number;
    private dragBegin_y: number;
    private _act: Actor;

    public constructor() {
        super();

        let self = this;
        let url: string = "resource/assets/map001/desert.tmx";
        let urlLoader: egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;





        //load complete
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event): void {
            let data: any = egret.XML.parse(event.target.data);
            self.tmxTileMap = new tiled.TMXTilemap(2000, 2000, data, url);
            self.tmxTileMap.render();
            self.touchEnabled = true;
            self.addChild(self.tmxTileMap);

            self._act = new Actor();

            let lays: tiled.TMXLayer[] = self.tmxTileMap.getLayers();

            self._act.InitActor(1,1,lays[1], self.tmxTileMap);
            self._act.MoveTo(1, 1, false);

            g_UIMgr.setFocusActor(self._act);


            self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
                self.dragBegin_x = evt.localX;
                self.dragBegin_y = evt.localY;
            }, self);

            self.addEventListener(egret.TouchEvent.TOUCH_MOVE, (evt: egret.TouchEvent) => {

            }, self);

            self.addEventListener(egret.TouchEvent.TOUCH_END, (evt: egret.TouchEvent) => {

                let next_x = self.x + evt.localX - self.dragBegin_x;
                let next_y = self.y + evt.localY - self.dragBegin_y;

                if (next_x > 0) next_x = 0;
                if (next_y > 0) next_y = 0;
                if (next_x < (self.stage.stageWidth - self.tmxTileMap.width)) next_x = self.stage.stageWidth - self.tmxTileMap.width;
                if (next_y < (self.stage.stageHeight - self.tmxTileMap.height)) next_y = self.stage.stageHeight - self.tmxTileMap.height;

                if (next_x != self.x || next_y != self.y) {
                    self.x = next_x;
                    self.y = next_y;
                }

                self.dragBegin_x = evt.localX;
                self.dragBegin_y = evt.localY;

            }, self);

            self.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
                g_UIMgr.getFocusActor().MoveTo(evt.$stageX,evt.stageY,true);
            },self);

           // self.createGameScene();

        }, url);
        urlLoader.load(new egret.URLRequest(url));
    }


    createGameScene(): void {
        var dragonbonesData = RES.getRes("Robot_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");

        var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));

        var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("robot");
        this.addChild(armature.display);

        armature.display.x = 200;
        armature.display.y = 300;
        armature.display.scaleX = 0.5;
        armature.display.scaleY = 0.5;

        dragonBones.WorldClock.clock.add(armature);

        armature.animation.gotoAndPlay("Standby",0,0,0);

        egret.Ticker.getInstance().register(
            function (frameTime: number) { dragonBones.WorldClock.clock.advanceTime(0.01) },
            this
        );

    }

     createGameScene2(): void {
        var dragonbonesData = RES.getRes("Robot_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");

        var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));

        var armature: dragonBones.EgretArmatureDisplay = dragonbonesFactory.buildArmatureDisplay("robot");
        this.addChild(armature);

        armature.x = 200;
        armature.y = 300;
        armature.scaleX = 0.15;
        armature.scaleY = 0.15;


        armature.animation.play("Run",0);
       
    }

}