import NodePool from "./units/NodePool";
import Tool from "./units/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Move extends cc.Component {
    @property(cc.Prefab)
    block:cc.Prefab = null
    @property(cc.Node)
    layoutBlock:cc.Node = null
    private _startPos: cc.Vec2;
    private _dir: number;
    private _tween: BlockTween;
    private blockPos:cc.Vec2[];
    private LogicMap:any[];
    onLoad(){
        NodePool.getInstance().createrNodePool('block',this.block,16);
        this.blockPos = [];
        for(let i = 0; i < 4;++i){
            for(let j = 0; j < 4;++j){
                this.blockPos.push(new cc.Vec2(-247.5+j*165,247.5-i*165))
            }
        }
        this.blockPos.forEach((item,key)=>{
            console.log('x:'+Math.floor(key/4)+',y:'+Math.floor(key%4),'('+item.x,item.y+')');
        })
       
    }
    private cleanChildren(){
        this.layoutBlock.removeAllChildren();
        this.LogicMap = [];
        for(let i = 0; i < 16; ++i){
            this.LogicMap.push(null);
        }
    }
    public startGame(){
        this.cleanChildren();
        this.createBlock();
    }
    private createBlock(){
        let ranDomID:number[] = [];
        for(let i = 0; i < this.LogicMap.length;++i){
            if(!this.LogicMap[i]){
                ranDomID.push(i);
            }
        }
        if(ranDomID.length === 0){
            return;
        }
        let startRadomID = ranDomID[Tool.getInstance().randomAccess(0,ranDomID.length-1)];
        let startBlock:cc.Node = NodePool.getInstance().getNodeFromPool('block');
        let radomPercent = Tool.getInstance().randomAccess(0,100);
        if(radomPercent < 70){
            startBlock.getChildByName('num').getComponent(cc.Label).string = '2';
            startBlock.getComponent('switchsp').setSpriteFrame(0);
        }else{
            startBlock.getChildByName('num').getComponent(cc.Label).string = '4';
            startBlock.getComponent('switchsp').setSpriteFrame(1);
        }
        startBlock.position = new cc.Vec3(this.blockPos[startRadomID].x,this.blockPos[startRadomID].y,0);
        startBlock.parent = this.layoutBlock;
        this.LogicMap[startRadomID] = startBlock;
    }
    private getVec2FromIndex(index:number){
        return new cc.Vec2(Math.floor(index/4),Math.floor(index%4));
    }
    private getIndexFromVec2(vec2:cc.Vec2){
        return vec2.x+vec2.y*4;
    }
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
        this.createBlock();
        // let moveBy: cc.Vec3 = null;
        // switch (this._dir) {
        //     case 3: moveBy = new cc.Vec3(100, 0, 0); break;//right
        //     case 2: moveBy = new cc.Vec3(-100, 0, 0); break;//left
        //     case 1: moveBy = new cc.Vec3(0, 100, 0); break;//up
        //     case 0: moveBy = new cc.Vec3(0, -100, 0); break;//down
        //     default: return;
        // }
        // if (this._tween) {
        //     this._tween.tween.stop();
        //     cc.find('one', this.node).position = new cc.Vec3(this._tween.startPos.x + this._tween.dirPos.x, this._tween.startPos.y + this._tween.dirPos.y, 0);
        //     this._tween = null;
        // } else {
        //     this._tween = {
        //         startPos: cc.find('one', this.node).position,
        //         dirPos: moveBy,
        //         tween: cc.tween(cc.find('one', this.node)).by(0.1, { position: moveBy }, { easing: 'quadOut' }).call(() => {
        //             this._tween = null;
        //         }).start()
        //     }
        // }
    }
    // update (dt) {}
}
