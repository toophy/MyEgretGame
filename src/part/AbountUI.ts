/**
 * 关于游戏
 */
class AboutDlg extends UIComponent{
    constructor(){
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
        this.skinName = "resource/custom_skins/aboutSkin.exml";
    }

    private onComplete():void{
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.Hide();
        }, this);
    }

    private btnClose:eui.Button;
}