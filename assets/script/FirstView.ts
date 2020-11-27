import View from "./View";

export default class FirstView extends View {
    protected viewNode: cc.Node;
    private button_jdMode: cc.Node;
    private button_fkMode: cc.Node;
    public constructor(ViewNode: cc.Node) {
        super();
        this.viewNode = ViewNode;
        this.button_jdMode = cc.find('button_jd', ViewNode);
        this.button_fkMode = cc.find('button_fk', ViewNode);
        this.init();
    }
    public init() {
        if (!this.viewNode.active) {
            this.viewShow();
        } else {
            this.addEvent();
        }
    }
    protected addEvent() {
        this.button_jdMode.on('touchend', this.viewHide.bind(this));
        this.button_fkMode.on('touchend', this.viewHide.bind(this));
    }
    private viewHide() {
        this.hideEvent();
        cc.tween(this.viewNode).to(0.2, { opacity: 0 }, { easing: 'quadOut' }).call(() => {
            this.viewNode.active = false;
            if (View.switchViewCb) {
                View.switchViewCb('Game');
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
        this.button_fkMode.off('touchend');
        this.button_jdMode.off('touchend');
    }
}
