export default class Tool {
    protected static m_instance: Tool;
    private nonDuplicateID: number;
    private ImageExt: string[];
    private constructor() {
        this.ImageExt = [
            '.png',
            '.jpg',
            '.Png',
            '.Jpj',
            '.PNG',
            '.JPG',
            '.PNg',
            '.JPg',
            'jpeg',
        ];
        this.nonDuplicateID = Date.now();
    }
    public static getInstance(): Tool {
        if (!Tool.m_instance) {
            Tool.m_instance = new Tool();
            return Tool.m_instance;
        }
        return Tool.m_instance;
    }
    public isIdCardNumber(str: string): boolean {
        let reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        return reg.test(str);
    }
    public isNickName(str: string): boolean {
        let reg = /^[A-Za-z0-9-\u4e00-\u9fa5\_]*$/g;
        return reg.test(str);
    }
    public isPhoneNumber(tel): boolean {
        let reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        return reg.test(tel);
    }
    /**
     * @description 生成不重复的ID
     */
    public genNonDuplicateID(): number {
        this.nonDuplicateID -= 1;
        return this.nonDuplicateID;
    }

    /**
     * @description 加载远程图片(需带后缀名)
     * @param Node 显示的节点(需带后缀名)
     * @param Url 远程地址
     * @param Nodesize 要显示的节点的大小
     */
    public LoadImageRemote(Node: cc.Node, Url: string, Nodesize: cc.Vec2 = null) {
        if (!Url || !this.ImageExt.includes(Url.substr(Url.length - 4))) {
            return
        }
        cc.assetManager.loadRemote(Url, function (err, texture: cc.Texture2D) {
            if (!err && cc.isValid(Node, true)) {
                Node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                if (Nodesize) {
                    Node.width = Nodesize.x;
                    Node.height = Nodesize.y;
                }
            }
        });
    }
    public forMat(Value:number,Magnification:number):string{
        if(Magnification > 1000 && Magnification % 10 !== 0 && Magnification !== 1000 &&
            Magnification !== 10000 && Magnification !== 100000000){
            cc.error('倍率值不正确请使用1000,10000,100000000');
        }
        if(Value < Magnification){
            return String(Value);
        }else if(Magnification == 1000){
            return Math.floor(Value/Magnification * 100.00) / 100+'K';
        }else if(Magnification == 10000){
            return Math.floor(Value/Magnification * 100.00) / 100+'万';
        }else if(Magnification == 100000000){
            return Math.floor(Value/Magnification * 100.00) / 100+'亿';
        }   
    }
    /**
     * @description 获取当前时间字符串
     */
    public getCurentTime(Time: number = null) {
        if (!CC_DEBUG) {
            return "0000-00-00 00:00:00";
        }
        function add0(m) { return m < 10 ? '0' + m : m };
        let time: Date = null;
        if (Time) {
            time = new Date(Time);
        } else {
            time = new Date();
        }
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    }
    // 获取指定范围内的随机数
    public randomAccess(min, max) {
        return Math.floor(Math.random() * (min - max) + max)
    }
    public randomNumber(NumberLength:number):string{
        let str:string = '';
        for(let i = 0; i < NumberLength;++i){
            str += String(Math.ceil(Math.random()*9));
        }
        return str;
    }
    // 解码
    private decodeUnicode(str) {
        //Unicode显示方式是\u4e00
        str = "\\u" + str
        str = str.replace(/\\/g, "%");
        //转换中文
        str = unescape(str);
        //将其他受影响的转换回原来
        str = str.replace(/%/g, "\\");
        return str;
    }

    /*
    *@param Number NameLength 要获取的名字长度
    */
    public getRandomName(NameLength) {
        let name = ""
        for (let i = 0; i < NameLength; i++) {
            let unicodeNum = ""
            unicodeNum = this.randomAccess(0x4e00, 0x9fa5).toString(16)
            name += this.decodeUnicode(unicodeNum)
        }
        return name
    }
    public static isJsonStr(str,parse:boolean = true){
        if (typeof str == 'string') {
            try {
                let obj=JSON.parse(str);
                if(typeof obj == 'object' && obj ){
                    if(parse){
                        return obj;
                    }
                    return true;
                }else{
                    return false;
                }
            } catch(e) {
                return false;
            }
        }
        return false;
    }
    public static Log(...argc){
        if(!CC_JSB || CC_DEBUG){
            console.log(Tool.getInstance().getCurentTime());
            for(let i = 0;i<argc.length;++i){
                console.log(argc[i])
            }
            console.log('*****************************************');
        }
    }
}
