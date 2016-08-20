/**
 * Main入口类
 */
class Main extends eui.UILayer {

    private _assetMgr: AssetManagerEx;

    protected createChildren(): void {
        super.createChildren();
        this._assetMgr = new AssetManagerEx(this, () => {
            g_UIMgr = new UIManagerEx(this);
        });
    }
}
