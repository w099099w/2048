declare interface Block{
	num:number,
	cololId:number
}
declare interface BlockTween{
	tween:cc.Tween,
	startPos:cc.Vec3,
	dirPos:cc.Vec3,
}
declare class SwitchSp {
    /**
     * @description 设置显示的键值
     * @param key 
     */
    setSpriteFrame(key:number);
    /**
     * @description 更新目标键值得精灵
     * @param key 要更新的键值
     * @param spriteFrame 更新的精灵
     */
    updateFrame(key:number,spriteFrame:cc.SpriteFrame)
      /**
     * @description 更新目标键值得精灵
     * @param spriteFrame 新增的精灵
     * @retuen 返回增加精灵显示的键值失败时返回-1
     */
    pushFrame(spriteFrame:cc.SpriteFrame):number;
    /**
     * @description 获取当前显示的键值
     */
    getShowID():number;

}