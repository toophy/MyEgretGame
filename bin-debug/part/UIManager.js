/**
 * UI管理者
 */
var UIManagerEx = (function (_super) {
    __extends(UIManagerEx, _super);
    function UIManagerEx(m) {
        _super.call(this);
        this._main = m;
        this._mapLayer = new egret.DisplayObjectContainer();
        this._mapUILayer = new eui.UILayer();
        this._euiLayer = new eui.UILayer();
        this._webLayer = new eui.UILayer();
        this._dlgs = new xstl.Dictionary();
        this._mapUILayer.touchThrough = true;
        this._euiLayer.touchThrough = true;
        this._webLayer.touchThrough = true;
        this.addEventListener(GameEvents.Evt_ShowDialog, this.onShowDialog, this);
        this.startCreateScene();
        var that = this;
        document.addEventListener("keydown", function (event) {
            that.onKeyEvent(event);
        });
    }
    var d = __define,c=UIManagerEx,p=c.prototype;
    /**
     * PC键盘按键事件
     */
    p.onKeyEvent = function (event) {
        switch (event.keyCode) {
            case 37:
            case 38:
            case 39:
            case 40:
                if (this._focusActor != undefined) {
                    this._focusActor.Move(event.keyCode);
                }
                break;
        }
    };
    /**
     * 设置焦点演员
     */
    p.setFocusActor = function (a) {
        this._focusActor = a;
    };
    /**
     * 获取焦点演员
     */
    p.getFocusActor = function () {
        return this._focusActor;
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    p.startCreateScene = function () {
        g_ActorMdlMgr.LoadAll();
        this._main.addChild(this._mapLayer);
        this._main.addChild(this._mapUILayer);
        this._main.addChild(this._euiLayer);
        this._main.addChild(this._webLayer);
        var desert = new DesertExample();
        this._mapLayer.addChild(desert);
        var test1 = new TestA(this._mapUILayer);
        var mainNavbar = new MainNavicte();
        mainNavbar.dialogName = "mainNavbar";
        this._euiLayer.addChild(mainNavbar);
    };
    /**
     * 响应对话框操作
     */
    p.onShowDialog = function (e) {
        var theDlg;
        theDlg = this._dlgs.getValue(e.data.name);
        if (e.data.type == 1) {
            if (theDlg == undefined || theDlg == null) {
                var root_class = egret.getDefinitionByName(e.data.name);
                if (root_class != null && root_class != undefined) {
                    theDlg = new root_class();
                    if (theDlg != undefined && theDlg != null) {
                        theDlg.dialogName = e.data.name;
                        this._dlgs.setValue(e.data.name, theDlg);
                    }
                }
            }
        }
        if (theDlg != undefined && theDlg != null) {
            if (e.data.type == 0) {
                if (theDlg.parent != null && theDlg.parent != undefined) {
                    theDlg.parent.removeChild(theDlg);
                }
            }
            else {
                this._main.addChild(theDlg);
                // 搞定各种互斥关系
                switch (e.data.name) {
                    case "AboutDlg":
                        UIComponent.HideDialog("PlayerDlg");
                        UIComponent.HideDialog("HerosDlg");
                        UIComponent.HideDialog("GoodsDlg");
                        break;
                    case "PlayerDlg":
                        UIComponent.HideDialog("AboutDlg");
                        UIComponent.HideDialog("HerosDlg");
                        UIComponent.HideDialog("GoodsDlg");
                        break;
                    case "HerosDlg":
                        UIComponent.HideDialog("PlayerDlg");
                        UIComponent.HideDialog("AboutDlg");
                        UIComponent.HideDialog("GoodsDlg");
                        break;
                    case "GoodsDlg":
                        UIComponent.HideDialog("PlayerDlg");
                        UIComponent.HideDialog("HerosDlg");
                        UIComponent.HideDialog("AboutDlg");
                        break;
                }
            }
            // 搞定联动
            if (e.data.type == 0) {
            }
            else {
            }
        }
    };
    /**
     * 正在显示么
     */
    p.isShowDialog = function (n) {
        var theDlg;
        theDlg = this._dlgs.getValue(n);
        if (theDlg == undefined || theDlg == null) {
            return false;
        }
        if (this._main.contains(theDlg) == false) {
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
        UIComponent.ShowDialog(this._dialogName);
    };
    p.Hide = function () {
        UIComponent.HideDialog(this._dialogName);
    };
    UIComponent.ShowDialog = function (n) {
        if (n != null && n.length > 0) {
            g_UIMgr.dispatchEvent(new egret.Event(GameEvents.Evt_ShowDialog, false, false, { name: n, type: 1 }));
        }
    };
    UIComponent.HideDialog = function (n) {
        if (n != null && n.length > 0) {
            g_UIMgr.dispatchEvent(new egret.Event(GameEvents.Evt_ShowDialog, false, false, { name: n, type: 0 }));
        }
    };
    p.AutoShow = function () {
        UIComponent.AutoShowDialog(this.dialogName);
    };
    UIComponent.AutoShowDialog = function (n) {
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