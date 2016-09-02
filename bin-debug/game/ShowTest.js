/**
 * 角色模板
 */
var ActorMdl = (function () {
    function ActorMdl(id, img) {
        this.id = id;
        this.bodyImg = img;
    }
    var d = __define,c=ActorMdl,p=c.prototype;
    return ActorMdl;
}());
egret.registerClass(ActorMdl,'ActorMdl');
var ActorMdlMgr = (function () {
    function ActorMdlMgr() {
        this.actorMdls = new xstl.Dictionary();
        this.actorMdls.setValue(1, new ActorMdl(1, "skillIcon01_png"));
        this.actorMdls.setValue(2, new ActorMdl(2, "skillIcon02_png"));
        this.actorMdls.setValue(3, new ActorMdl(3, "skillIcon03_png"));
        this.actorMdls.setValue(4, new ActorMdl(4, "skillIcon04_png"));
        this.actorMdls.setValue(5, new ActorMdl(5, "skillIcon05_png"));
        this.actorMdls.setValue(6, new ActorMdl(6, "skillIcon06_png"));
        this.actorMdls.setValue(7, new ActorMdl(7, "skillIcon07_png"));
    }
    var d = __define,c=ActorMdlMgr,p=c.prototype;
    p.GetMdl = function (id) {
        return this.actorMdls.getValue(id);
    };
    return ActorMdlMgr;
}());
egret.registerClass(ActorMdlMgr,'ActorMdlMgr');
var g_ActorMdlMgr = new ActorMdlMgr();
var Actor = (function () {
    function Actor(id, mdlId) {
        this.id = id;
        this.mdlId = mdlId;
        this.pos = new egret.Point();
        this.sprite = new egret.Sprite();
        var bmp = AssetManagerEx.createBitmapByName(g_ActorMdlMgr.GetMdl(mdlId).bodyImg);
        this.sprite.addChild(bmp);
        // this.sprite.graphics.beginFill(0xff0000);
        // this.sprite.graphics.drawRect(0, 0, 100, 100);
        // this.sprite.graphics.endFill();
    }
    var d = __define,c=Actor,p=c.prototype;
    p.InitActor = function (c, t) {
        this.constainer = c;
        this._tilemap = t;
        // this.sprite.x = this.pos.x;
        // this.sprite.y = this.pos.y;
        this.constainer.addChild(this.sprite);
        this.constainer.setChildIndex(this.sprite, 0);
    };
    d(p, "Id"
        ,function () { return this.id; }
    );
    d(p, "MdlId"
        ,function () { return this.mdlId; }
    );
    d(p, "Pos"
        ,function () { return this.pos; }
    );
    d(p, "Sprite"
        ,function () { return this.sprite; }
    );
    p.SetPos = function (x, y) {
        this.pos.x = x;
        this.pos.y = y;
        this.sprite.x = x - this.sprite.width / 2;
        this.sprite.y = y - this.sprite.height / 2;
        //this.constainer.setChildIndex(this.sprite,this.pos.y*this._tilemap.tilewidth*this._tilemap.cols+this.pos.x);
        var my_z = this.pos.y * this._tilemap.tilewidth * this._tilemap.cols + this.pos.x;
        if (this.constainer.numChildren > 0) {
            for (var a = 0; a < this.constainer.numChildren; a++) {
                var val = this.constainer.getChildAt(a);
                if (val != this.sprite) {
                    var z = val.y * this._tilemap.tilewidth * this._tilemap.cols + val.x;
                    if (my_z < z) {
                        if (a > 0) {
                            this.constainer.setChildIndex(this.sprite, a - 1);
                        }
                        else {
                            this.constainer.setChildIndex(this.sprite, 0);
                        }
                        return;
                    }
                }
            }
            this.constainer.setChildIndex(this.sprite, this.constainer.numChildren);
        }
        else {
            this.constainer.setChildIndex(this.sprite, 0);
        }
    };
    p.Move = function (keyCode) {
        switch (keyCode) {
            case 37:
                this.SetPos(this.pos.x - 20, this.pos.y);
                break;
            case 38:
                this.SetPos(this.pos.x, this.pos.y - 20);
                break;
            case 39:
                this.SetPos(this.pos.x + 20, this.pos.y);
                break;
            case 40:
                this.SetPos(this.pos.x, this.pos.y + 20);
                break;
        }
        // keycode   37 = Left
        // keycode   38 = Up
        // keycode   39 = Right
        // keycode   40 = Down
    };
    return Actor;
}());
egret.registerClass(Actor,'Actor');
/**
 * 最基本的显示
 */
var TestA = (function () {
    // private bird: egret.Bitmap;
    function TestA(m) {
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
        var capabilites = [
            { text: "移动设备: " + egret.Capabilities.isMobile + "n", style: { size: 17, "fontFamily": "楷体" } },
            { text: "语言代码: " + egret.Capabilities.language + "n", style: { size: 17, "fontFamily": "楷体" } },
            { text: "操作系统: " + egret.Capabilities.os + "n", style: { size: 17, "fontFamily": "楷体" } },
            { text: "运行类型: " + egret.Capabilities.runtimeType + "n", style: { size: 17, "fontFamily": "楷体" } }
        ];
        var showCapabilities = new egret.TextField();
        showCapabilities.textFlow = capabilites;
        this._main.addChild(showCapabilities);
    }
    var d = __define,c=TestA,p=c.prototype;
    p.launchAnimations = function () {
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
    };
    TestA.STEP_ROT = 3;
    TestA.STEP_SCALE = 0.03;
    TestA.ANIM_ROT = 0;
    TestA.ANIM_SCALE = 1;
    return TestA;
}());
egret.registerClass(TestA,'TestA');
var TestBackup = (function () {
    function TestBackup(m, txt) {
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
    var d = __define,c=TestBackup,p=c.prototype;
    return TestBackup;
}());
egret.registerClass(TestBackup,'TestBackup');
//# sourceMappingURL=ShowTest.js.map