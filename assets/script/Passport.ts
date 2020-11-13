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
    getAngle(angx: number, angy: number): number {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    }
    getDirection(startx: number, starty: number, endx: number, endy: number) {
        let angx = endx - startx;
        let angy = endy - starty;
        let result = -1;

        //如果滑动距离太短
        if (Math.abs(angx) < 100 && Math.abs(angy) < 100) {
            return result;
        }

        let angle = this.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 0;
        } else if (angle > 45 && angle < 135) {
            result = 1;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 2;
        } else if (angle >= -45 && angle <= 45) {
            result = 3;
        }
        return result;
    }
    start() {
        this.node.on('touchstart', (event: cc.Touch) => {
            this._startPos = event.getLocation();
        })
        this.node.on('touchend', (event: cc.Touch) => {
            this._dir = this.getDirection(this._startPos.x,this._startPos.y,event.getLocationX(),event.getLocationY());
            if (this._dir === -1) {
              return
            }
            this.move();
        })
        this.node.on('touchcancel', (event: cc.Touch) => {
            this._dir = this.getDirection(this._startPos.x,this._startPos.y,event.getLocationX(),event.getLocationY());
            if (this._dir === -1) {
              return
            }
            this.move();
        })
    }
    move() {

        let moveBy: cc.Vec3 = null;
        switch (this._dir) {
            case 3: moveBy = new cc.Vec3(100, 0, 0); break;
            case 2: moveBy = new cc.Vec3(-100, 0, 0); break;
            case 1: moveBy = new cc.Vec3(0, 100, 0); break;
            case 0: moveBy = new cc.Vec3(0, -100, 0); break;
            default: return;
        }
        if (cc.find('one', this.node).x + moveBy.x > 350 || cc.find('one', this.node).x + moveBy.x < -350) {
            return;
        } else if (cc.find('one', this.node).x + moveBy.x > (1334 / 2) || cc.find('one', this.node).x + moveBy.x < -(1334 / 2)) {
            return;
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
