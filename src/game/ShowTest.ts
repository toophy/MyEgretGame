
/**
 * 角色模板
 */
class ActorMdl {
    public id: number;
    private dragonbonesData;
    private textureData;
    private texture;
    private dragonbonesFactory: dragonBones.EgretFactory;

    constructor(id: number, dragonbonesData: string, textureData: string, texture: string) {
        this.id = id;
        this.dragonbonesData = RES.getRes(dragonbonesData);
        this.textureData = RES.getRes(textureData);
        this.texture = RES.getRes(texture);

        this.dragonbonesFactory = new dragonBones.EgretFactory();
        this.dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(this.dragonbonesData));
        this.dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(this.texture, this.textureData));
    }

    /**
     * 获取Armature
     */
    getArmature(name: string): dragonBones.Armature {
        return this.dragonbonesFactory.buildArmature(name);
    }
}



class ActorMdlMgr {
    private actorMdls: xstl.Dictionary<number, ActorMdl>;

    constructor() {
        this.actorMdls = new xstl.Dictionary<number, ActorMdl>();
    }

    public LoadAll() {
        this.actorMdls.setValue(1, new ActorMdl(1, "Robot_json", "texture_json", "texture_png"));
    }

    public GetMdl(id: number): ActorMdl {
        return this.actorMdls.getValue(id);
    }
}

var g_ActorMdlMgr = new ActorMdlMgr();

class Actor {
    private id: number;
    private name: string;
    private mdlId: number;
    private pos: egret.Point;
    private armature: dragonBones.Armature;
    private sprite: egret.Sprite;
    private constainer: egret.DisplayObjectContainer;
    private _tilemap: tiled.TMXTilemap;

    constructor() {
    }

    public InitActor(id: number, mdlId: number, c: egret.DisplayObjectContainer, t: tiled.TMXTilemap) {
        this.id = id;
        this.mdlId = mdlId;
        this.pos = new egret.Point();
        this.sprite = new egret.Sprite();

        this.armature = g_ActorMdlMgr.GetMdl(mdlId).getArmature("robot");
        this.sprite.addChild(this.armature.display);
        //this.sprite.anchorOffsetY += this.armature.display.height;

        // 外发光滤镜
        // var color: number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
        // var alpha: number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        // var blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        // var blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        // var strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        // var quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        // var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
        // var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
        // var glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY,
        //     strength, quality, inner, knockout);
        // bmp.filters = [glowFilter];

        // this.sprite.graphics.beginFill(0xff0000);
        // this.sprite.graphics.drawRect(0, 0, 100, 100);
        // this.sprite.graphics.endFill();

        this.constainer = c;
        this._tilemap = t;
        // this.sprite.x = this.pos.x;
        // this.sprite.y = this.pos.y;
        this.constainer.addChild(this.sprite);
        this.constainer.setChildIndex(this.sprite, 0);
    }

    public get Id(): number { return this.id; }
    public get MdlId(): number { return this.mdlId; }
    public get Pos(): egret.Point { return this.pos; }
    public get Sprite(): egret.Sprite { return this.sprite; }
    public SetPos(dx: number, dy: number, move: boolean) {
        if (move) {
            let tw = egret.Tween.get(this.sprite);
            let self: Actor = this;
            dragonBones.WorldClock.clock.add(this.armature);
            this.armature.animation.gotoAndPlay("Run", 0, 0, 2);
            egret.Ticker.getInstance().register(
                function (frameTime: number) { dragonBones.WorldClock.clock.advanceTime(0.01) },
                this
            );

            tw.to({ x: dx, y: dy }, 500).call(function () {
                self.pos.x = dx;
                self.pos.y = dy;
            });
        }


        let group: tiled.TMXObjectGroup = <tiled.TMXObjectGroup>this.constainer;
        if (group != undefined) {
            group.addZChild(this.sprite);
            group.graphics.beginFill(0xff0000);
            group.graphics.drawRect(this.sprite.x, this.sprite.y, 5, 5);
            group.graphics.endFill();
        }
    }
    public Move(keyCode: number) {
        switch (keyCode) {
            case 37:
                this.SetPos(this.pos.x - 32, this.pos.y, true);
                break;

            case 38:
                this.SetPos(this.pos.x, this.pos.y - 32, true);
                break;

            case 39:
                this.SetPos(this.pos.x + 32, this.pos.y, true);
                break;

            case 40:
                this.SetPos(this.pos.x, this.pos.y + 32, true);
                break;
        }
        // keycode   37 = Left
        // keycode   38 = Up
        // keycode   39 = Right
        // keycode   40 = Down
    }

}












/**
 * 最基本的显示
 */
class TestA {
    private _main: eui.UILayer;
    private static STEP_ROT: number = 3;
    private static STEP_SCALE: number = 0.03;
    private static ANIM_ROT: number = 0;
    private static ANIM_SCALE: number = 1;

    private _iAnimMode: number;
    private _nScaleBase: number;
    // private bird: egret.Bitmap;



    constructor(m: eui.UILayer) {
        this._main = m;

        // this.bird = AssetManagerEx.createBitmapByName("skillIcon07_png");
        // this.bird.x = 0;
        // this.bird.y = 0;
        // this._main.addChild(this.bird);

        /// 为定位设置基准点(即锚点)
        // this.bird.anchorOffsetX = this.bird.width / 2;
        // this.bird.anchorOffsetY = this.bird.height / 2;
        // this.bird.x = this._main.stage.stageWidth * 0.5;
        // this.bird.y = this._main.stage.stageHeight * 0.5;

        var back = new TestBackup(m, "轻触屏幕调整显示对象位置");

        // this._main.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
        //     //this.bird.x = evt.localX;
        //     //this.bird.y = evt.localY;
        //     //this._iAnimMode = (this._iAnimMode + 1) % 3;
        //     this._act.SetPos(evt.localX, evt.localY);
        // }, this);

        // this.launchAnimations();

        var capabilites: Array<egret.ITextElement> = [
            { text: "移动设备: " + egret.Capabilities.isMobile + "n", style: { size: 17, "fontFamily": "楷体" } },
            { text: "语言代码: " + egret.Capabilities.language + "n", style: { size: 17, "fontFamily": "楷体" } },
            { text: "操作系统: " + egret.Capabilities.os + "n", style: { size: 17, "fontFamily": "楷体" } },
            { text: "运行类型: " + egret.Capabilities.runtimeType + "n", style: { size: 17, "fontFamily": "楷体" } }
        ];
        var showCapabilities: egret.TextField = new egret.TextField();
        showCapabilities.textFlow = capabilites;
        this._main.addChild(showCapabilities);
    }

    private launchAnimations() {

        // this._iAnimMode = TestA.ANIM_ROT;
        // this._nScaleBase = 0;

        // this._main.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => {
        //     switch (this._iAnimMode) {
        //         case TestA.ANIM_ROT:
        //             this.bird.rotation += TestA.STEP_ROT;
        //             break;
        //         case TestA.ANIM_SCALE:
        //             this.bird.scaleX = this.bird.scaleY = 0.5 + 0.5 *
        //                 Math.abs(Math.sin(this._nScaleBase += TestA.STEP_SCALE));
        //             break;
        //     }

        //     return false;
        // }, this)
    }

}

class TestBackup {
    private _main: eui.UILayer;
    private _txInfo: egret.TextField;
    private _bgInfo: egret.Shape;

    constructor(m: eui.UILayer, txt: string) {
        this._main = m;

        /// 提示信息
        this._txInfo = new egret.TextField;
        this._main.addChild(this._txInfo);

        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;

        this._txInfo.text = txt;

        this._bgInfo = new egret.Shape;
        this._main.addChildAt(this._bgInfo, this._main.numChildren - 1);

        this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill(0xffffff, .5);
        this._bgInfo.graphics.drawRect(0, 0, this._txInfo.width, this._txInfo.height);
        this._bgInfo.graphics.endFill();
    }
}