import Move from "./Move";
import View from "./View";

export default class GameView extends View {
    protected viewNode: cc.Node;
    private button_back: cc.Node;
    private cl_Move:Move;
    public constructor(ViewNode: cc.Node) {
        super();
        this.viewNode = ViewNode;
        this.button_back = cc.find('ui/quit', ViewNode);
        this.cl_Move = cc.find('view',ViewNode).getComponent(Move);
        this.init();
    }
    protected init() {
        if (!this.viewNode.active) {
            this.viewShow();
        } else {
            this.addEvent();
        }
        this.cl_Move.addMoveEvent();
    }
    protected addEvent() {
        this.button_back.on('touchend', () => {
            this.viewHide();
        })
    }
    private viewHide() {
        this.cl_Move.closeMoveEvent();
        this.hideEvent();
        cc.tween(this.viewNode).to(0.2, { opacity: 0 }, { easing: 'quadOut' }).call(() => {
            this.viewNode.active = false;
            if (View.switchViewCb) {
                View.switchViewCb('First');
            }
        }).start();
    }
    private viewShow() {
        this.viewNode.opacity = 0;
        this.viewNode.active = true;
        cc.tween(this.viewNode).to(0.2, { opacity: 255 }, { easing: 'quadIn' }).call(() => {
            this.addEvent();
        }).start();
    }
    protected hideEvent() {

    }
}
