/**
 * Main入口类
 */
class Main extends eui.UILayer {
    // keycode   37 = Left
    // keycode   38 = Up
    // keycode   39 = Right
    // keycode   40 = Down

    private _assetMgr: AssetManagerEx;

    protected createChildren(): void {
        super.createChildren();
        this._assetMgr = new AssetManagerEx(this, () => {
            g_UIMgr = new UIManagerEx(this);
        });
    }
}
