/**
 * 角色模板
 */
var ActorMdl = (function () {
    function ActorMdl(id, dragonbonesData, textureData, texture) {
        this.id = id;
        this.dragonbonesData = RES.getRes(dragonbonesData);
        this.textureData = RES.getRes(textureData);
        this.texture = RES.getRes(texture);
        this.dragonbonesFactory = new dragonBones.EgretFactory();
        this.dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(this.dragonbonesData));
        this.dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(this.texture, this.textureData));
    }
    var d = __define,c=ActorMdl,p=c.prototype;
    /**
     * 获取Armature
     */
    p.getArmature = function (name) {
        return this.dragonbonesFactory.buildArmature(name);
    };
    return ActorMdl;
}());
egret.registerClass(ActorMdl,'ActorMdl');
var ActorMdlMgr = (function () {
    function ActorMdlMgr() {
        this.actorMdls = new xstl.Dictionary();
    }
    var d = __define,c=ActorMdlMgr,p=c.prototype;
    p.LoadAll = function () {
        this.actorMdls.setValue(1, new ActorMdl(1, "Robot_json", "texture_json", "texture_png"));
    };
    p.GetMdl = function (id) {
        return this.actorMdls.getValue(id);
    };
    return ActorMdlMgr;
}());
egret.registerClass(ActorMdlMgr,'ActorMdlMgr');
var g_ActorMdlMgr = new ActorMdlMgr();
var Actor = (function () {
    function Actor() {
    }
    var d = __define,c=Actor,p=c.prototype;
    p.InitActor = function (id, mdlId, c, t) {
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
    p.SetPos = function (dx, dy, move) {
        if (move) {
            var tw = egret.Tween.get(this.sprite);
            var self_1 = this;
            dragonBones.WorldClock.clock.add(this.armature);
            this.armature.animation.gotoAndPlay("Run", 0, 0, 2);
            egret.Ticker.getInstance().register(function (frameTime) { dragonBones.WorldClock.clock.advanceTime(0.01); }, this);
            tw.to({ x: dx, y: dy }, 500).call(function () {
                self_1.pos.x = dx;
                self_1.pos.y = dy;
            });
        }
        var group = this.constainer;
        if (group != undefined) {
            group.addZChild(this.sprite);
            group.graphics.beginFill(0xff0000);
            group.graphics.drawRect(this.sprite.x, this.sprite.y, 5, 5);
            group.graphics.endFill();
        }
    };
    p.Move = function (keyCode) {
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