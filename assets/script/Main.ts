import ViewCtrl from "./ViewCtrl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    @property(cc.Node)
    viewFirst:cc.Node = null;
    @property(cc.Node)
    viewGame:cc.Node = null;
    
    private cl_ViewController:ViewCtrl = null;
    onLoad () {
        this.cl_ViewController = new ViewCtrl(this.viewFirst,this.viewGame);
        this.cl_ViewController.init();
    }

    start () {

    }

    // update (dt) {}
}
