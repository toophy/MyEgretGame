/**
 * UI管理者
 */
var UIManagerEx = (function (_super) {
    __extends(UIManagerEx, _super);
    function UIManagerEx(m) {
        _super.call(this);
        this._main = m;
        this._dlgs = new xstl.Dictionary();
        this.addEventListener(GameEvents.Evt_ShowDialog, this.onShowDialog, this);
        this.startCreateScene();
    }
    var d = __define,c=UIManagerEx,p=c.prototype;
    /**
     * 创建场景界面
     * Create scene interface
     */
    p.startCreateScene = function () {
        var mainNavbar = new MainNavicte();
        mainNavbar.dialogName = "mainNavbar";
        this._main.addChild(mainNavbar);
    };
    /**
     * 响应对话框操作
     */
    p.onShowDialog = function (e) {
        var theDlg;
        theDlg = this._dlgs.getValue(e.data.name);
        if (theDlg == undefined) {
            console.log("hehe");
            switch (e.data.name) {
                case "AboutDlg":
                    theDlg = new AboutDlg();
                    break;
                case "PlayerDlg":
                    break;
                case "HerosDlg":
                    break;
                case "GoodsDlg":
                    break;
            }
            theDlg.dialogName = e.data.name;
            this._dlgs.setValue(e.data.name, theDlg);
        }
        if (theDlg != undefined) {
            if (e.data.type == 0) {
                this._main.removeChild(theDlg);
            }
            else {
                this._main.addChild(theDlg);
            }
        }
    };
    /**
     * 正在显示么
     */
    p.isShowDialog = function (n) {
        var theDlg;
        theDlg = this._dlgs.getValue(n);
        if (theDlg == undefined) {
            return false;
        }
        if (this._main.contains(theDlg) == undefined) {
            return false;
        }
        return true;
    };
    return UIManagerEx;
}(egret.EventDispatcher));
egret.registerClass(UIManagerEx,'UIManagerEx');
/**
 * 全局变量
 */
var g_UIMgr = null;
/**
 * 封装窗口支持UI管理器
 */
var UIComponent = (function (_super) {
    __extends(UIComponent, _super);
    function UIComponent() {
        _super.call(this);
    }
    var d = __define,c=UIComponent,p=c.prototype;
    d(p, "dialogName"
        ,function () {
            return this._dialogName;
        }
        ,function (n) {
            this._dialogName = n;
        }
    );
    p.Show = function () {
        this.ShowDialog(this._dialogName);
    };
    p.Hide = function () {
        this.HideDialog(this._dialogName);
    };
    p.ShowDialog = function (n) {
        if (n != null && n.length > 0) {
            g_UIMgr.dispatchEvent(new egret.Event(GameEvents.Evt_ShowDialog, false, false, { name: n, type: 1 }));
        }
    };
    p.HideDialog = function (n) {
        if (n != null && n.length > 0) {
            g_UIMgr.dispatchEvent(new egret.Event(GameEvents.Evt_ShowDialog, false, false, { name: n, type: 0 }));
        }
    };
    p.AutoShow = function () {
        this.AutoShowDialog(this.dialogName);
    };
    p.AutoShowDialog = function (n) {
        if (n != null && n.length > 0) {
            var show_type = 1;
            if (g_UIMgr.isShowDialog(n)) {
                show_type = 0;
            }
            g_UIMgr.dispatchEvent(new egret.Event(GameEvents.Evt_ShowDialog, false, false, { name: n, type: show_type }));
        }
    };
    return UIComponent;
}(eui.Component));
egret.registerClass(UIComponent,'UIComponent');
//# sourceMappingURL=UIManager.js.map