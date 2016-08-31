/**
 * 关于游戏
 */
var AboutDlg = (function (_super) {
    __extends(AboutDlg, _super);
    function AboutDlg() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/custom_skins/aboutSkin.exml";
    }
    var d = __define,c=AboutDlg,p=c.prototype;
    p.onComplete = function () {
        var _this = this;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.Hide();
        }, this);
    };
    return AboutDlg;
}(UIComponent));
egret.registerClass(AboutDlg,'AboutDlg');
//# sourceMappingURL=AbountUI.js.map