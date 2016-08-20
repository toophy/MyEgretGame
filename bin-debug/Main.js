/**
 * Main入口类
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Main,p=c.prototype;
    p.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this._assetMgr = new AssetManagerEx(this, function () {
            g_UIMgr = new UIManagerEx(_this);
        });
    };
    return Main;
}(eui.UILayer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map