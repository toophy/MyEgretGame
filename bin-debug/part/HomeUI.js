/**
 * Home页面
 */
var HomePanel = (function (_super) {
    __extends(HomePanel, _super);
    function HomePanel() {
        _super.call(this);
        this.skinName = "resource/custom_skins/HomeUISkin.exml";
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
    }
    var d = __define,c=HomePanel,p=c.prototype;
    p.onComplete = function () {
    };
    return HomePanel;
}(eui.Component));
egret.registerClass(HomePanel,'HomePanel');
//# sourceMappingURL=HomeUI.js.map