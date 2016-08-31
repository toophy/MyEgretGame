
/**
 * 角色模板
 */
class ActorMdl {
    public id: number;
    public bodyImg: string;
    constructor(id: number, img: string) {
        this.id = id;
        this.bodyImg = img;
    }
}

class ActorMdlMgr {
    private actorMdls: xstl.Dictionary<number, ActorMdl>;

    constructor() {
        this.actorMdls = new xstl.Dictionary<number, ActorMdl>();
        this.actorMdls[1] = new ActorMdl(1, "skillIcon01_png");
        this.actorMdls[2] = new ActorMdl(1, "skillIcon02_png");
        this.actorMdls[3] = new ActorMdl(1, "skillIcon03_png");
        this.actorMdls[4] = new ActorMdl(1, "skillIcon04_png");
        this.actorMdls[5] = new ActorMdl(1, "skillIcon05_png");
        this.actorMdls[6] = new ActorMdl(1, "skillIcon06_png");
        this.actorMdls[7] = new ActorMdl(1, "skillIcon07_png");
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
    private sprite: egret.Sprite;
    private constainer: egret.DisplayObjectContainer;

    constructor(id: number, mdlId: number) {
        this.id = id;
        this.mdlId = mdlId;
        this.pos = new egret.Point();
        this.sprite = new egret.Sprite();

        this.sprite.graphics.beginFill(0xff0000);
        this.sprite.graphics.drawRect(0, 0, 100, 100);
        this.sprite.graphics.endFill();
    }

    public InitActor(c: egret.DisplayObjectContainer) {
        this.constainer = c;
        this.sprite.x = this.pos.x;
        this.sprite.y = this.pos.y;
        this.constainer.addChild(this.sprite);
    }

    public get Id(): number { return this.id; }
    public get MdlId(): number { return this.mdlId; }
    public get Pos(): egret.Point { return this.pos; }
    public get Sprite(): egret.Sprite { return this.sprite; }
    public SetPos(x: number, y: number) {
        this.pos.x = x;
        this.pos.y = y;
        this.sprite.x = x - this.sprite.width / 2;
        this.sprite.y = y - this.sprite.height / 2;
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
    private bird: egret.Bitmap;
    private _act: Actor;


    constructor(m: eui.UILayer) {
        this._main = m;

        this.bird = AssetManagerEx.createBitmapByName("skillIcon07_png");
        this.bird.x = 0;
        this.bird.y = 0;
        this._main.addChild(this.bird);

        /// 为定位设置基准点(即锚点)
        this.bird.anchorOffsetX = this.bird.width / 2;
        this.bird.anchorOffsetY = this.bird.height / 2;
        this.bird.x = this._main.stage.stageWidth * 0.5;
        this.bird.y = this._main.stage.stageHeight * 0.5;

        var back = new TestBackup(m, "轻触屏幕调整显示对象位置");

        this._main.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
            this.bird.x = evt.localX;
            this.bird.y = evt.localY;
            this._iAnimMode = (this._iAnimMode + 1) % 3;
            this._act.SetPos(evt.localX, evt.localY);
        }, this);

        this.launchAnimations();

        this._act = new Actor(7, 7);
        this._act.InitActor(this._main);

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

        this._iAnimMode = TestA.ANIM_ROT;
        this._nScaleBase = 0;

        this._main.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => {
            switch (this._iAnimMode) {
                case TestA.ANIM_ROT:
                    this.bird.rotation += TestA.STEP_ROT;
                    break;
                case TestA.ANIM_SCALE:
                    this.bird.scaleX = this.bird.scaleY = 0.5 + 0.5 *
                        Math.abs(Math.sin(this._nScaleBase += TestA.STEP_SCALE));
                    break;
            }

            return false;
        }, this)
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