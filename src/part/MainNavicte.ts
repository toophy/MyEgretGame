/// <reference path="../container/util.ts" />

/**
 * 主界面导航
 */
class MainNavicte extends UIComponent {

    private btnPlayer: eui.Button;
    private btnHeros: eui.Button;
    private btnItems: eui.Button;
    private btnAbout: eui.Button;


    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/custom_skins/NavbarSkin.exml";
    }

    private onComplete(): void {
        this.btnPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnPlayer, this);
        this.btnHeros.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnHeros, this);
        this.btnItems.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnItems, this);
        this.btnAbout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnAbout, this);
    }

    private onbtnPlayer(e: eui.UIEvent): void {
        this.AutoShowDialog("PlayerDlg")
    }

    private onbtnHeros(e: eui.UIEvent): void {
        this.AutoShowDialog("HerosDlg")
    }

    private onbtnItems(e: eui.UIEvent): void {
        this.AutoShowDialog("GoodsDlg")
    }

    private onbtnAbout(e: eui.UIEvent): void {
        this.AutoShowDialog("AboutDlg")
    }
}