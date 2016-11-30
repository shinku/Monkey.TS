/**
 * Created by shin on 2016/11/21.
 */
class MF_TagManager {
    private static tags:Object={};
    constructor() {}
    static  start()
    {
        window.onhashchange=(e)=>{
            MF_TagManager.handleHash();
        }
        var _h=window.location.hash.replace(/#/,"");
        var  postTag=MF_TagManager.tags;
        if(_h in postTag){
            var fun=postTag[_h]['funname'];
            fun(postTag[_h]['a']);
        }
    }
    static handleHash()
    {
        var _h=window.location.hash.replace(/#/,"");
        if(_h in MF_TagManager.tags){
            MF_TagManager.tags[_h]['funname']( MF_TagManager.tags[_h]['a']);
        }
    }
    static addTag(n:string,fn:Function,...args)
    {
        MF_TagManager.tags[n]={'funname':fn,a:args};
    }
    static removeTag(n:string)
    {
        var postTag:any=MF_TagManager.tags;
        if(n in postTag){
            delete postTag[n];
        }
    }
    static  configTag(n:string,fn:Function,...args)
    {
        MF_TagManager.addTag(n,fn,args);
    }
}