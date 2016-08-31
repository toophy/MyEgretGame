/**
 * 测试Tiled地图
 */
class DesertExample extends egret.DisplayObjectContainer {

    private  tmxTileMap:tiled.TMXTilemap;

    public constructor() {
        super();

        let self = this;
        let url: string = "resource/assets/map001/desert.tmx";
        let urlLoader:egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //load complete
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
            let data:any = egret.XML.parse(event.target.data);
            self.tmxTileMap = new tiled.TMXTilemap(2000, 2000, data, url);
            self.tmxTileMap.render();
            self.addChild(self.tmxTileMap);
        }, url);
        urlLoader.load(new egret.URLRequest(url));
    }
}