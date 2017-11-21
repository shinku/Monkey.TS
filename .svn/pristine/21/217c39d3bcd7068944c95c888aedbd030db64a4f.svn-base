/**
 * Created by shin on 16/6/27.
 */
//参数说明,parents:目标对象，type：播放类型；widht:宽，height:高，imgList：加载完成图片数组，step：播放序列帧步长，times：播放间隔时间,loop:循环播放boolean类型

    ///<reference  path='../core/Event.ts'/>
    ///<reference  path='../core/EventDispatcher.ts'/>
    ///<reference path='I/IanmBasic.ts' />

class MF_animateImages extends MF_EVENT.EventDispatcher implements anmBasic{
    public parameter:any;
    public width:number;
    public height:number;
    public parents:any;
    public canvas:any;
    public anmtList:any;//加载的图片数组
    public type:string;//播放类型
    public step:number;//播放跳屏次数
    public times:number;//播放时间
    public ITV:any=null;
    public startIndex:number=0;//起始帧数
    public endIndex:number;//结束帧数
    public progress:number=0;//播放进度
    public loop:boolean;//是否循环
    public up:any=null;//播放更新
    public length:number;
    public drawImages(n:number){};
    public clear(){};//清空
    public getPosition(n:number):any{};
    public rmsPrefix:any = /^-ms-/;
    public rdashAlpha:any = /-([\da-z])/gi;
    public fcamelCase( all, letter) {
        return letter.toUpperCase();
    };
    public cssPrefixes:any = [ "Webkit", "O", "Moz", "ms" ];

    public camelCase(str:string) {
        return str.replace( this.rmsPrefix, "ms-" ).replace( this.rdashAlpha, this.fcamelCase );
    }

    public vendorPropName( style, name ) {
        if ( name in style ) {
            return name;
        }
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = this.cssPrefixes.length;

        while ( i-- ) {
            name = this.cssPrefixes[ i ] + capName;
            if ( name in style ) {
                return name;
            }
        }

        return origName;
    }

    public setOp(o:any,_v:number):void{
        if(o.runtimeStyle) { //ie
            if(typeof o.runtimeStyle["opacity"] === "undefined"){
                o.style.filter="alpha(opacity="+_v*100+")";
            }
            else{
                o.runtimeStyle["opacity"]=_v;
            }
        } else{
            o.style["opacity"]=_v;
        }
    };

    constructor(p:any=null){

        super();
        //if(!p) return ;
        //{imgList:[],parents:'',type:'',step:'',times:'',loop:''}

        if(this.parameter.imgList.length>0){
            this.width=this.parameter.width?this.parameter.width:this.parameter.imgList[0].width;//宽
            this.height=this.parameter.height?this.parameter.height:this.parameter.imgList[0].height;//高
        }
        if(MF_display_Judger.isDom(this.parameter.parents))
            this.parents=this.parameter.parents;//显示对象
        else if(MF_display_Judger.isJQ(this.parameter.parents))
            this.parents=this.parameter.parents[0];

        this.anmtList=this.parameter.imgList;
        this.type=this.parameter.type?this.parameter.type:"canvas";
        this.step=this.parameter.step || 1;
        this.times=this.parameter.times || 100;
        this.loop=this.parameter.loop || false;
    }

    public toProgress(n:number):void{//设置播放进度
        this.progress=n;
        this.drawImages(n);
    };

    public setStart(n:number):void{//设置播放起始帧数
        this.startIndex=n;
        this.toProgress(n);
    };

    public setEnd(n:number):void{//设置结束帧数
        if(n>this.length)
            this.endIndex=this.length
        else
            this.endIndex=n;
    };

    public play():void{//播放
        var self:any = this;
        self.ITV=setInterval(function(){
            self.progress+=self.step;
            if(self.progress>=self.endIndex)
                if(self.loop)
                    self.progress=self.startIndex;
                else{
                    self.stop();

                    self.dispatchEvent(new MF_EVENT.Event("complete",self.progress));
                    return;
                }

            self.toProgress(self.progress);
            self.dispatchEvent(new MF_EVENT.Event("update",self.progress));
            self.dispatchEvent(new MF_EVENT.Event(self.progress,self.progress));

        },self.times);
    };

    public stopActivity():void{
        if(this.ITV){
            clearInterval(this.ITV);
            this.ITV=null;
        }
    };

    public pause():void{//暂停
        this.stopActivity();
    };

    public stop():void{//停止
        this.stopActivity();
        this.progress=this.startIndex;
    };

    public creatElment(name:string):void{
        return (<any>document).createElement(name);
    }

    public setCssObj(o:any,jsons:any):void{
        for(name in jsons){
            this.css(o,name,jsons[name]);
        }
    };

    public css(obj:any,_s:any,_v:any):any{

        if(typeof _s==="undefined"||!_s)
            return false;

        if(typeof _s==="object"){
            this.setCssObj(obj,_s);
            return false;
        };

        var origName = this.camelCase(_s);
        var style = obj.style;
        var name = this.vendorPropName( style, origName );

        if(name == "opacity"){
            this.setOp(obj,_v);
            return ;
        }

        if(typeof _v==="undefined"){
            if(obj.style[name]!=""){
                return obj.style[name];
            }else if(window.getComputedStyle){
                return window.getComputedStyle(obj , null)[name];
            }else if(obj.currentStyle){
                return obj.currentStyle[name];
            }else{
                return "auto";
            }
        }else{
            if(obj.runtimeStyle) { //ie
                obj.runtimeStyle[name]=_v;
            } else{
                obj.style[name]=_v;
            }
        }
    }

    public remove():void{
        while(this.parents.hasChildNodes()){
            this.parents.removeChild(this.parents.firstChild);
        }
    };

}




