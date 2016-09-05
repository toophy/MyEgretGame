
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/dragonBones/dragonBones.js",
	"bin-debug/common/GameEvents.js",
	"bin-debug/container/arrays.js",
	"bin-debug/container/Dictionary.js",
	"bin-debug/container/util.js",
	"bin-debug/euisys/AssetAdapter.js",
	"bin-debug/euisys/AssetManager.js",
	"bin-debug/euisys/ThemeAdapter.js",
	"bin-debug/game/ShowTest.js",
	"bin-debug/game/TestMap.js",
	"bin-debug/Main.js",
	"bin-debug/part/UIManager.js",
	"bin-debug/part/AbountUI.js",
	"bin-debug/part/ChatUI.js",
	"bin-debug/part/HomeUI.js",
	"bin-debug/part/LoadingUI.js",
	"bin-debug/part/LoginUI.js",
	"bin-debug/part/MainNavicte.js",
	"bin-debug/tiledmap/animation/TMXAnimation.js",
	"bin-debug/tiledmap/animation/TMXAnimationFrame.js",
	"bin-debug/tiledmap/const/TMXConstants.js",
	"bin-debug/tiledmap/events/TMXImageLoadEvent.js",
	"bin-debug/tiledmap/layer/ILayer.js",
	"bin-debug/tiledmap/layer/TMXColorLayer.js",
	"bin-debug/tiledmap/layer/TMXLayerBase.js",
	"bin-debug/tiledmap/layer/TMXImageLayer.js",
	"bin-debug/tiledmap/layer/TMXLayer.js",
	"bin-debug/tiledmap/object/TMXImage.js",
	"bin-debug/tiledmap/object/TMXObject.js",
	"bin-debug/tiledmap/object/TMXObjectGroup.js",
	"bin-debug/tiledmap/property/TMXProperty.js",
	"bin-debug/tiledmap/render/TMXRenderer.js",
	"bin-debug/tiledmap/render/TMXHexagonalRenderer.js",
	"bin-debug/tiledmap/render/TMXIsometricRenderer.js",
	"bin-debug/tiledmap/render/TMXOrthogonalRenderer.js",
	"bin-debug/tiledmap/shape/Ellipse.js",
	"bin-debug/tiledmap/shape/Polygon.js",
	"bin-debug/tiledmap/shape/PolyLine.js",
	"bin-debug/tiledmap/tile/TMXTile.js",
	"bin-debug/tiledmap/tileset/TMXTileset.js",
	"bin-debug/tiledmap/tileset/TMXTilesetGroup.js",
	"bin-debug/tiledmap/TMXTilemap.js",
	"bin-debug/tiledmap/utils/Base64.js",
	"bin-debug/tiledmap/utils/TMXUtils.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};