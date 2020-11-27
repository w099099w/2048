export default class NodePool{
    private nodePool:NodePoolData[];
    private static m_instance:NodePool;
    private constructor(){
        this.nodePool = [];
    }
    public static getInstance():NodePool{
        if(!NodePool.m_instance){
            NodePool.m_instance = new NodePool();
            return NodePool.m_instance;
        }
        return NodePool.m_instance;
    }
   
    public cleanPool(name:string = null){
        if(this.nodePool){
            //注意调用时机确定没有使用时才
            if(name ){
                if(this.nodePool[name]){
                    this.nodePool[name].prefab = null;
                    this.nodePool[name].pool.clear();
                    delete this.nodePool[name];
                    return;
                }   
            }else{
                for(let key in this.nodePool){
                    this.nodePool[key].pool.clear();
                }
                this.nodePool = [];
            }
        }
    }
    public createrNodePool(name:string,prefab:cc.Prefab,num:number){
        if(!name || !prefab || !num){
            return;
        }else if(this.nodePool && this.nodePool[name]){
            return;//之前已存在
        }
        if(!this.nodePool){
            this.nodePool = [];//定义缓存对象
        }
        let dataNode = {
            prefab:prefab,
            pool:new cc.NodePool(),
        }
        this.nodePool[name] = dataNode;
        for (let i = 0; i < num; ++i) {
            let enemy = cc.instantiate(prefab); // 创建节点
            this.nodePool[name].pool.put(enemy); // 通过 put 接口放入对象池
        }
    }
    public getNodeFromPool(name){
        if(!this.nodePool[name]){
            return null;
        }
        let enemy = null;
        if (this.nodePool[name].pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            enemy = this.nodePool[name].pool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemy = cc.instantiate(this.nodePool[name].prefab);
        }
        return enemy;
    }
    public destroyNode(name,node){
        if(!this.nodePool[name]){
            node.destory();
        }else{
            this.nodePool[name].pool.put(node); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
        } 
    }
    public onDestroy(){
        this.cleanPool();//删除全部对象池
    }
}
