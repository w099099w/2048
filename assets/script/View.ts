
export default abstract class View{
    protected abstract viewNode:cc.Node;
    public static switchViewCb:Function;
    protected abstract init();
    protected abstract addEvent();
    protected abstract hideEvent();
}
