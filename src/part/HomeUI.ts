
/**
 * Home页面
 */
class HomePanel extends eui.Component{
    
    constructor(){
        super();
        this.skinName= "resource/custom_skins/HomeUISkin.exml";
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
    }

    onComplete():void{
       
    }
}