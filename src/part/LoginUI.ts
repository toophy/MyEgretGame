
class LoginUI extends eui.Component {

	private edt_account: eui.EditableText;
	private edt_pwd: eui.EditableText;
	private btn_Login: eui.Button;
	private btn_Regist: eui.Button;

	constructor(){
		super();
		this.skinName="LoginSkin";
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}
}