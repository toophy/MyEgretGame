/// <reference path="../container/util.ts" />

/**
 * 主界面导航
 */
class MainNavicte extends UIComponent {

    private btnPlayer: eui.ToggleButton;
    private btnHeros: eui.ToggleButton;
    private btnItems: eui.ToggleButton;
    private btnAbout: eui.ToggleButton;


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
        UIComponent.AutoShowDialog("PlayerDlg")
        this.btnHeros.selected = false;
        this.btnItems.selected = false;
        this.btnAbout.selected = false;
    }

    private onbtnHeros(e: eui.UIEvent): void {
        UIComponent.AutoShowDialog("HerosDlg")
        this.btnPlayer.selected = false;
        this.btnItems.selected = false;
        this.btnAbout.selected = false;
    }

    private onbtnItems(e: eui.UIEvent): void {
        this.btnHeros.selected = false;
        this.btnPlayer.selected = false;
        this.btnAbout.selected = false;
        UIComponent.AutoShowDialog("GoodsDlg")
    }

    private onbtnAbout(e: eui.UIEvent): void {
        this.btnHeros.selected = false;
        this.btnItems.selected = false;
        this.btnPlayer.selected = false;
        UIComponent.AutoShowDialog("AboutDlg")
    }
}