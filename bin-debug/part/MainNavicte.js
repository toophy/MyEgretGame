/// <reference path="../container/util.ts" />
/**
 * 主界面导航
 */
var MainNavicte = (function (_super) {
    __extends(MainNavicte, _super);
    function MainNavicte() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/custom_skins/NavbarSkin.exml";
    }
    var d = __define,c=MainNavicte,p=c.prototype;
    p.onComplete = function () {
        this.btnPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnPlayer, this);
        this.btnHeros.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnHeros, this);
        this.btnItems.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnItems, this);
        this.btnAbout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnAbout, this);
    };
    p.onbtnPlayer = function (e) {
        this.AutoShowDialog("PlayerDlg");
    };
    p.onbtnHeros = function (e) {
        this.AutoShowDialog("HerosDlg");
    };
    p.onbtnItems = function (e) {
        this.AutoShowDialog("GoodsDlg");
    };
    p.onbtnAbout = function (e) {
        this.AutoShowDialog("AboutDlg");
    };
    return MainNavicte;
}(UIComponent));
egret.registerClass(MainNavicte,'MainNavicte');
//# sourceMappingURL=MainNavicte.js.map