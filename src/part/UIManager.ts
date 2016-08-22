
/**
 * UI管理者
 */
class UIManagerEx extends egret.EventDispatcher {
    private _main: Main;
    private _dlgs: xstl.Dictionary<string, any>;

    constructor(m: Main) {
        super();
        this._main = m;
        this._dlgs = new xstl.Dictionary<string, any>();

        this.addEventListener(GameEvents.Evt_ShowDialog, this.onShowDialog, this);

        this.startCreateScene();
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        let mainNavbar = new MainNavicte();
        mainNavbar.dialogName = "mainNavbar";
        this._main.addChild(mainNavbar);
    }

    /**
     * 响应对话框操作
     */
    private onShowDialog(e: egret.Event) {

        let theDlg: any;
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
            } else {
                this._main.addChild(theDlg);
            }
        }
    }

    /**
     * 正在显示么
     */
    public isShowDialog(n: string): boolean {
        let theDlg: any;
        theDlg = this._dlgs.getValue(n);
        if (theDlg == undefined) {
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
        this.ShowDialog(this._dialogName);
    }

    public Hide() {
        this.HideDialog(this._dialogName);
    }

    public ShowDialog(n: string) {
        if (n != null && n.length > 0) {
            g_UIMgr.dispatchEvent(new egret.Event(GameEvents.Evt_ShowDialog, false, false, { name: n, type: 1 }));
        }
    }

    public HideDialog(n: string) {
        if (n != null && n.length > 0) {
            g_UIMgr.dispatchEvent(new egret.Event(GameEvents.Evt_ShowDialog, false, false, { name: n, type: 0 }));
        }
    }

    public AutoShow() {
        this.AutoShowDialog(this.dialogName);
    }

    public AutoShowDialog(n: string) {
        if (n != null && n.length > 0) {
            let show_type: number = 1;
            if (g_UIMgr.isShowDialog(n)) {
                show_type = 0;
            }
            g_UIMgr.dispatchEvent(new egret.Event(GameEvents.Evt_ShowDialog, false, false, { name: n, type: show_type }));
        }
    }
}