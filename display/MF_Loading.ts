/**
 * Created by n-195 on 16/6/14.
 */

//获取dom类型
/*function getDomType(e):string{
    return e.nodeName.toLowerCase();
}

function getImgList(_list:Array<any>):Array<any>{
    var _imgList=[];
    for(var vals in _list){
        var _obj=_list[vals];
        if("src" in _obj&&"e" in _obj)
            _imgList.push(_obj.e);
    }
    return _imgList;
};*/

class MF_Loading extends MF_EVENT.EventDispatcher{

    private _s = this;

    private setDomList(domlist:Array<any>,type:string):Array<any>{
        var stack=[];
        for(var m=0; m<domlist.length; m++){
            var _src=domlist[m].getAttribute(this.srcNames);
            if(_src){
                stack.push(this.addLDstack({type:type,src:_src,e:domlist[m]}));
            }
        };
        return stack;
    };

    private setAddList(arry:Array<any>):Array<any>{
        var stack=[];
        for(var n=0; n<arry.length; n++){
            stack.push(this.addLDstack(arry[n]));
        };
        return stack;
    };

    //获取dom所有加载对象
    private getDomList(o:any):Array<any>{
        var imglist=o.getElementsByTagName("img");
        var vdlist=o.getElementsByTagName("video");
        var adlist=o.getElementsByTagName("audio");
        var data1=this.setDomList(imglist,"img");
        var data2=this.setDomList(vdlist,"video");
        var data3=this.setDomList(adlist,"audio");
        return data1.concat(data2,data3);
    };

    //获取jq对象所有加载对象
    private getJqList(o:any):Array<any>{
        var data:Array<any>=[];
        var imglist:any=o.find("img");
        var vdlist:any=o.find("video");
        var adlist:any=o.find("audio");
        var data1:Array<any>=this.setDomList(imglist,"img");
        var data2:Array<any>=this.setDomList(vdlist,"video");
        var data3:Array<any>=this.setDomList(adlist,"audio");
        return data1.concat(data2,data3);
    };

    private addLoadObject(o:any):Array<any>{
        if(MF_display_Judger.isDom(o)){
            if(MF_display_Judger.isLdDom(o)){
                var type=MF_display_Judger.getDomType(o);
                if(type=="img"||type=="video"||type=="audio"){
                    return this.setDomList([o],type);
                }
            }else{
                return this.getDomList(o);
            }
        }else if(MF_display_Judger.isJQ(o)){
            var type=MF_display_Judger.getDomType(o[0]);
            if(type=="img"||type=="video"||type=="audio"){
                return this.setDomList(o,type);
            }else{
                return this.getJqList(o);
            }
        }else if(typeof o === 'object'){
            if(o.src&&o.type){
                return [this.addLDstack(o)];
            }else if(typeof o.sort == 'function'){
                return this.setAddList(o);
            }
        }
    };

    private init():void{//加载对象初始化
        var s:any = this;
        for(var m:number=0; m<s.list.length; m++){
            (function(){
                var n:number=m;
                var _LDobj:any=s.list[m];
                _LDobj.status=0;
                _LDobj.count=0;
                if(_LDobj.type=="img"){//图片加载
                    if(!_LDobj.e){
                        _LDobj.e=new Image();
                    };

                    _LDobj.e.onload=function(){
                        _LDobj.status=1;
                        s.removeLD(_LDobj);
                    };

                }else if(_LDobj.type=="audio"||_LDobj.type=="video"){//音、视频加载
                    if(!_LDobj.e){
                        if(_LDobj.type=="audio"){
                            _LDobj.e=document.createElement("audio");
                        }else{
                            _LDobj.e=document.createElement("video");
                        }
                    }

                    if (!MF_display_Judger.isAndroid||_LDobj.type!="video"){
                        _LDobj.e.addEventListener("canplaythrough", (e)=>{
                                _LDobj.status=1;
                                this.removeLD(_LDobj);
                        });
                    }
                }

                _LDobj.load=function(){
                    _LDobj.count++;
                    _LDobj.e.src=_LDobj.src;
                    if(_LDobj.type=="video"||_LDobj.type=="audio"){
                        _LDobj.e.load();
                    };
                };
                _LDobj.e.onerror=function(){
                    if(_LDobj.count<this.errorCount){
                        _LDobj.status=2;
                        _LDobj.load();
                    }else{
                        _LDobj.status=3;
                        s.removeLD(_LDobj);
                    }
                };

            })();
        };
    };

    private upDate(val):void{
        if(this.loadUp)
            this.loadUp(val);
        this.loadingpercent=val;
        this.dispatchEvent(new MF_EVENT.Event("update",val));
    };
    public loadingpercent:number;
    public srcNames:string;
    public loadUp;
    public callback:Function;//加载完成回调
    public list:Array<any>=[];//需要加载列表
    public suclist:Array<any>=[];//加载成功列表
    public set=null;
    public timers:number=30;
    public length:number=null;
    public errorCount:number=3;
    public parameter:any;

    public constructor(p:any){
        super();
        this.parameter = p;

        this.srcNames=this.parameter.srcNames?this.parameter.srcNames:"alts";
        this.loadUp=typeof(this.parameter.LDup)==="function"?this.parameter.LDup:null;
        this.callback=typeof(this.parameter.LDsuccess)==="function"?this.parameter.LDsuccess:null;//加载完成回调
        if(this.parameter.LDpage){//加载页面所有加载对象
            this.getDomList(document);
        };

        if(this.parameter.LDdom){
            this.addLoadObject(p.LDdom);
        };

        this.upDate(0);
    }

    //加载开始
    public start():void{
        this.init();
        this.length=this.getLength();
        this.loads();

        var	speed:number=0,
            s:any = this,
            up=function(){
                var LDprogress:number=parseInt(<any>(s.suclist.length/s.length*100));
                if(LDprogress<=100){
                    if(s.parameter.LDtween){
                        speed++;
                    }else{
                        speed=LDprogress;
                    }
                    //加载更新
                    s.upDate(speed);

                    //加载成功
                    if(speed==100){
                        clearInterval(s.set);

                        if(s.callback)
                            s.callback();

                        s.dispatchEvent(new MF_EVENT.Event("complete",speed));
                    }
                };
            };
        this.set=setInterval(up,this.timers);
    };

    public add(o:any):any{
        if(o){
            return this.addLoadObject(o);
        }
    };

    public addLDstack(o:any):any{
        var isLD=this.isLoad(o.e);
        if(isLD){
            return isLD;
        }else{
            var length=this.list.push(o);
            return this.list[length-1];
        }
    };

    public addImgSheet(arg:any):Array<any>{//添加图片动画帧 参数imgPrefix,imgType,start,length,step
        //var arg=arguments[0],
        var  _list=[];
        //console.log(arg);
        var mask:string=arg.mask || "";

        for(var i=arg.start; i<=arg.length; i+=arg.step){
            var findex:string=mask+i;
            findex=findex.substr(findex.length-mask.length);
            _list.push({type:"img",src:arg.imgPrefix+findex+"."+arg.imgType});
        };
        return this.setAddList(_list);
    };

    public isLoad=function(e:Object){//判断是否load
        for(var m=0; m<this.list.length; m++){
            if(e&&this.list[m].e==e){
                return this.list[m];
            }
        }
        return false;
    };

    public loads():void{
        for(var m=0; m<this.list.length; m++){
            this.list[m].load();
            if (MF_display_Judger.isAndroid&&this.list[m].type=="video"){
                this.list[m].status=1;
                this.removeLD(this.list[m]);
                m--;
            };
        }
    };

    public getLength():number{//获取加载长度
        return this.list.length;
    };

    public removeLD(o:any):void{//移除加载队列
        var n=0;
        while(n<this.list.length){
            if(this.list[n]==o){
                this.suclist.push(o);
                this.list.splice(n,1);
                break;
            }
            n++;
        };
    };

}