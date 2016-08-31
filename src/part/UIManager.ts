
/**
 * UI管理者
 */
class UIManagerEx extends egret.EventDispatcher {
    private _main: Main;
    private _mapLayer: egret.DisplayObjectContainer;
    private _mapUILayer: eui.UILayer;
    private _euiLayer: eui.UILayer;
    private _webLayer: eui.UILayer;
    private _dlgs: xstl.Dictionary<string, any>;

    constructor(m: Main) {
        super();
        this._main = m;
        this._mapLayer = new egret.DisplayObjectContainer();
        this._mapUILayer = new eui.UILayer();
        this._euiLayer = new eui.UILayer();
        this._webLayer = new eui.UILayer();
        this._dlgs = new xstl.Dictionary<string, any>();

        this._mapUILayer.touchThrough = true;
        this._euiLayer.touchThrough = true;
        this._webLayer.touchThrough = true;

        this.addEventListener(GameEvents.Evt_ShowDialog, this.onShowDialog, this);

        this.startCreateScene();
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {

        this._main.addChild(this._mapLayer);
        this._main.addChild(this._mapUILayer);
        this._main.addChild(this._euiLayer);
        this._main.addChild(this._webLayer);
        
        var desert: DesertExample = new DesertExample();
        this._mapLayer.addChild(desert);

        var test1: TestA = new TestA(this._mapUILayer);

        let mainNavbar = new MainNavicte();
        mainNavbar.dialogName = "mainNavbar";
        this._euiLayer.addChild(mainNavbar);
    }

    /**
     * 响应对话框操作
     */
    private onShowDialog(e: egret.Event) {

        let theDlg: UIComponent;
        theDlg = this._dlgs.getValue(e.data.name);
        if (e.data.type == 1) {
            if (theDlg == undefined || theDlg == null) {

                let root_class = egret.getDefinitionByName(e.data.name);
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
            } else {
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
            } else {
            }
        }
    }

    /**
     * 正在显示么
     */
    public isShowDialog(n: string): boolean {
        let theDlg: any;
        theDlg = this._dlgs.getValue(n);
        if (theDlg == undefined || theDlg == null) {
            return false;
        }
        if (this._main.contains(theDlg) == false) {
            return false;
        }
        return true;
    }
}

/**
 * 全局变量
 */
let g_UIMgr: UIManagerEx = null;

/**
 * 封装窗口支持UI管理器
 */
class UIComponent extends eui.Component {
    private _dialogName: string;

    constructor() {
        super();
    }

    public get dialogName(): string {
        return this._dialogName;
    }

    public set dialogName(n: string) {
        this._dialogName = n;
    }

    public Show() {
        UIComponent.ShowDialog(this._dialogName);
    }

    public Hide() {
        UIComponent.HideDialog(this._dialogName);
    }

    public static ShowDialog(n: string) {
        if (n != null && n.length > 0) {
            g_UIMgr.dispatchEvent(new egret.Event(GameEvents.Evt_ShowDialog, false, false, { name: n, type: 1 }));
        }
    }

    public static HideDialog(n: string) {
        if (n != null && n.length > 0) {
            g_UIMgr.dispatchEvent(new egret.Event(GameEvents.Evt_ShowDialog, false, false, { name: n, type: 0 }));
        }
    }

    public AutoShow() {
        UIComponent.AutoShowDialog(this.dialogName);
    }

    public static AutoShowDialog(n: string) {
        if (n != null && n.length > 0) {
            let show_type: number = 1;
            if (g_UIMgr.isShowDialog(n)) {
                show_type = 0;
            }
            g_UIMgr.dispatchEvent(new egret.Event(GameEvents.Evt_ShowDialog, false, false, { name: n, type: show_type }));
        }
    }
}