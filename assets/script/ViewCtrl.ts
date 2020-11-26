import FirstView from "./FirstView";
import GameView from "./GameView";
import View from "./View";

export default class ViewCtrl {
    private viewFirst: cc.Node;
    private viewGame: cc.Node;
    private cl_curView: View;
    public constructor(first: cc.Node, game: cc.Node) {
        this.viewFirst = first;
        this.viewGame = game;
    }
    public init() {
        this.viewFirst.active = true;
        this.viewGame.active = false;
        this.cl_curView = new FirstView(this.viewFirst);
        View.switchViewCb = this.switchView.bind(this);
    }
    private switchView(ViewCode) {
        this.cl_curView = null;
        if (ViewCode == 'Game') {
            this.cl_curView = new GameView(this.viewGame);
        } else if (ViewCode == 'First') {
            this.cl_curView = new FirstView(this.viewFirst);
        }
    }
}
