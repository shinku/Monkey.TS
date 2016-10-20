/**
 * Created by n-195 on 16/6/14.
 */
class MF_display_Judger{
    constructor(){};
    //是否安卓
    public static  isAndroid (){return /(Android)/i.test(navigator.userAgent);};
    //是否是dom对象
    public static isDom(e:any){
        if(typeof(e)=="object"&&e instanceof HTMLElement){
            return true;
        }
        return false;
    };
    //是否是JQdom对象
    public static isJQ(e:any){
        if(typeof(e)=="object"  &&  e instanceof jQuery){
            return true;
        }
        return false;
    };
    //是否是加载dom对象
    public static isLdDom(e){
        if(typeof(e)=="object"&&e instanceof HTMLElement){
            var type=e.nodeName.toLowerCase();
            if(type=="img"||type=="video"||type=="audio"){
                return true;
            }
        }
        return false;
    };
    //是否是加载完成对象
    public static isLdCompleteList(e){
        if(typeof(e)=="object"&&"sort" in e){
            var _obj=e[0];
            if("src" in _obj&&"e" in _obj){
                return true;
            }
        }
        return false;
    };
    public static getDomType(e):string
    {
        return e.nodeName.toLowerCase();
    };

    public static  getImgList(_list:Array<any>):Array<any>
    {
        var _imgList:Array<any>=new Array<any>();
        for(var vals in _list){
            var _obj=_list[vals];
            if("src" in _obj&&"e" in _obj) _imgList.push(_obj.e);
    }
    return _imgList;
};
}
