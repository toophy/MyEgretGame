/**
 * 关于游戏
 */
var ChatDlg = (function (_super) {
    __extends(ChatDlg, _super);
    function ChatDlg() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/custom_skins/ChatSkin.exml";
    }
    var d = __define,c=ChatDlg,p=c.prototype;
    p.onComplete = function () {
        this.listChat.selectedIndex = 2; //设置默认选中项
        this.listChat.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListChatChange, this);
        this.editChat.addEventListener(egret.Event.CHANGE, this.onEditChatChange, this);
    };
    p.onListChatChange = function (e) {
        console.log(e.data);
    };
    p.onEditChatChange = function (e) {
        console.log(e.data);
        console.log(e.target.text);
    };
    return ChatDlg;
}(UIComponent));
egret.registerClass(ChatDlg,'ChatDlg');
//# sourceMappingURL=ChatUI.js.map