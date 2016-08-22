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
        UIComponent.AutoShowDialog("PlayerDlg");
        this.btnHeros.enabled = !this.btnHeros.selected;
        this.btnHeros.selected = false;
        this.btnItems.enabled = !this.btnItems.selected;
        this.btnItems.selected = false;
        this.btnAbout.enabled = !this.btnAbout.selected;
        this.btnAbout.selected = false;
    };
    p.onbtnHeros = function (e) {
        UIComponent.AutoShowDialog("HerosDlg");
        this.btnPlayer.enabled = !this.btnPlayer.selected;
        this.btnPlayer.selected = false;
        this.btnItems.enabled = !this.btnItems.selected;
        this.btnItems.selected = false;
        this.btnAbout.enabled = !this.btnAbout.selected;
        this.btnAbout.selected = false;
    };
    p.onbtnItems = function (e) {
        UIComponent.AutoShowDialog("GoodsDlg");
        this.btnHeros.enabled = !this.btnHeros.selected;
        this.btnHeros.selected = false;
        this.btnPlayer.enabled = !this.btnPlayer.selected;
        this.btnPlayer.selected = false;
        this.btnAbout.enabled = !this.btnAbout.selected;
        this.btnAbout.selected = false;
    };
    p.onbtnAbout = function (e) {
        this.btnHeros.enabled = !this.btnHeros.selected;
        this.btnHeros.selected = false;
        this.btnItems.enabled = !this.btnItems.selected;
        this.btnItems.selected = false;
        this.btnPlayer.enabled = !this.btnPlayer.selected;
        this.btnPlayer.selected = false;
        UIComponent.AutoShowDialog("AboutDlg");
    };
    return MainNavicte;
}(UIComponent));
egret.registerClass(MainNavicte,'MainNavicte');
//# sourceMappingURL=MainNavicte.js.map