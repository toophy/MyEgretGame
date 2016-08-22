/**
 * 关于游戏
 */
class ChatDlg extends UIComponent {
    private listChat: eui.List;
    private editChat: eui.EditableText;

    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/custom_skins/ChatSkin.exml";
    }

    private onComplete(): void {
        this.listChat.selectedIndex = 2;//设置默认选中项
        this.listChat.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListChatChange, this);
        this.editChat.addEventListener(egret.Event.CHANGE, this.onEditChatChange, this);
    }

    private onListChatChange(e: eui.UIEvent): void {
        console.log(e.data);
    }

    private onEditChatChange(e: eui.UIEvent): void {
        console.log(e.data);
        console.log(e.target.text);
    }
}