/**
 * Created by shin on 16/3/9.
 */
class MF_UTILS {
    constructor() {
    }
    public static setCookie(name:string,value:any,time:number=60000)
    {
        //默认缓存一个小时
        var time=time || 60000;
        var exp=new Date();
        exp.setTime(exp.getTime()+time);
        document.cookie=name + "="+ encodeURI(value) + ";expires=" + exp.toUTCString();
    }
    public static getCookie(name:string)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return decodeURI(arr[2]);
        else
        return null;
    }
    public static removeCookie(name:string)
    {
        MF_UTILS.setCookie(name,'',-1000);
    }
    public static getQuest(name:string)
    {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return r[2];
        }
        return null;
    }
    public static isTel(tel:string)
    {
        return (/^1[3|4|5|8] \d{9}$/).test(tel);
    }
    public static  discribeObject(object:Object,bet:string="")
    {
        var str:string="";
        if(!bet) bet="";
        for(var o in object)
        {
            str+=bet+o+":";
            if(object[o] instanceof Array)
            {
                str+="[";
                //str+=this.discribeObject(object[o],nbet);
                str+=object[o];
                str+="]"+"\n";
            }
            else if(object[o] instanceof Object)
            {
                var nbet=bet+"  ";
                str+="{\n";
                str+=this.discribeObject(object[o],nbet);
                str+=nbet+"}"+"\n";
            }
            else{
                str+=object[o]+"\n";
            }
        }
        return str;
    }
    public static  html_decode(str:string){
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&gt;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    }
    public static catact(a:any,b:any){
        for(var key in b){
            if(typeof b[key]=="Object"){
                arguments.callee(a[key],b[key]);
            }else{
                a[key] = b[key];
            }
        }
        return a;
    }
}
