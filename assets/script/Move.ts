const { ccclass, property } = cc._decorator;

@ccclass
export default class Move extends cc.Component {
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
        }else{

        }

        let angle = this.getAngle(angx, angy);
        //允许30度偏移
        if (angle >= -105 && angle <= -75) {
            result = 0;
        } else if (angle > 75 && angle < 105) {
            result = 1;
        } else if ((angle >= 165 && angle <= 180) || (angle >= -180 && angle < -165)) {
            result = 2;
        } else if (angle >= -15 && angle <= 15) {
            result = 3;
        }
        return result;
    }
    public addMoveEvent() {
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
    public closeMoveEvent(){
        this.node.off('touchstart');
        this.node.off('touchend');
        this.node.off('touchcancel');
    }
    move() {
        let moveBy: cc.Vec3 = null;
        switch (this._dir) {
            case 3: moveBy = new cc.Vec3(100, 0, 0); break;//right
            case 2: moveBy = new cc.Vec3(-100, 0, 0); break;//left
            case 1: moveBy = new cc.Vec3(0, 100, 0); break;//up
            case 0: moveBy = new cc.Vec3(0, -100, 0); break;//down
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
