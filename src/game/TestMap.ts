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
            console.log(self.tmxTileMap);


            self._act = new Actor(7, 7);
            self._act.SetPos(1, 1);

            let lays: tiled.TMXLayer[] = self.tmxTileMap.getLayers();

            self._act.InitActor(lays[1]);

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

        }, url);
        urlLoader.load(new egret.URLRequest(url));
    }
}