// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Passport extends cc.Component {

    private _startPos: cc.Vec2;
    private _dir: number;
    private _tween: BlockTween;
    start() {
        this.node.on('touchstart', (event: cc.Touch) => {
            this._startPos = event.getLocation();
            //console.log('start',event.getLocation())
        })
        this.node.on('touchend', (event: cc.Touch) => {
            //console.log(this._startPos.x,event.getLocationX(),this._startPos.x-event.getLocationX())
            if (this._startPos.x - event.getLocationX() > 100 && this._startPos.y - event.getLocationY() < 50 && this._startPos.y - event.getLocationY() > -50) {
                console.log('左')
                this._dir = 0;
            } else if (this._startPos.x - event.getLocationX() < -100 && this._startPos.y - event.getLocationY() < 50 && this._startPos.y - event.getLocationY() > -50) {
                console.log('右')
                this._dir = 1;
            } else if (this._startPos.y - event.getLocationY() > 100 && this._startPos.x - event.getLocationX() < 50 && this._startPos.x - event.getLocationX() > -50) {
                console.log('下')
                this._dir = 2;
            } else if (this._startPos.y - event.getLocationY() < -100 && this._startPos.x - event.getLocationX() < 50 && this._startPos.x - event.getLocationX() > -50) {
                console.log('上')
                this._dir = 3;
            }else{
                return;
            }
            //console.log('end',event.getLocation())
            this.move();
        })
        this.node.on('touchcancel', (event: cc.Touch) => {
            //console.log(this._startPos.x,event.getLocationX(),this._startPos.x-event.getLocationX())
            if (this._startPos.x - event.getLocationX() > 100 && this._startPos.y - event.getLocationY() < 50 && this._startPos.y - event.getLocationY() > -50) {
                console.log('左')
                this._dir = 0;
            } else if (this._startPos.x - event.getLocationX() < -100 && this._startPos.y - event.getLocationY() < 50 && this._startPos.y - event.getLocationY() > -50) {
                console.log('右')
                this._dir = 1;
            } else if (this._startPos.y - event.getLocationY() > 100 && this._startPos.x - event.getLocationX() < 50 && this._startPos.x - event.getLocationX() > -50) {
                console.log('下')
                this._dir = 2;
            } else if (this._startPos.y - event.getLocationY() < -100 && this._startPos.x - event.getLocationX() < 50 && this._startPos.x - event.getLocationX() > -50) {
                console.log('上')
                this._dir = 3;
            }else{
                return;
            }
            //console.log('end',event.getLocation())
            this.move();
        })
    }
    move() {
        let moveBy: cc.Vec3 = null;
        switch (this._dir) {
            case 0: moveBy = new cc.Vec3(-100, 0, 0); break;
            case 1: moveBy = new cc.Vec3(100, 0, 0); break;
            case 2: moveBy = new cc.Vec3(0, -100, 0); break;
            case 3: moveBy = new cc.Vec3(0, 100, 0); break;
            default: return;
        }
        if (this._tween) {
            this._tween.tween.stop();
            cc.find('one', this.node).position = new cc.Vec3(this._tween.startPos.x + this._tween.dirPos.x, this._tween.startPos.y + this._tween.dirPos.y, 0);
            this._tween = null;
        } else {
            this._tween = {
                startPos: cc.find('one', this.node).position,
                dirPos: moveBy,
                tween: cc.tween(cc.find('one', this.node)).by(0.1, { position: moveBy }, { easing: 'quadOut' }).call(() => {
                    this._tween = null;
                }).start()
            }
        }

    }
    // update (dt) {}
}
