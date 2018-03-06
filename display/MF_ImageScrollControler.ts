/**
 * Created by shin on 2017/8/16.
 */
    ///<reference path='../core/Event'/>
    ///<reference path='../core/EventDispatcher'/>
    ///<reference path='../utils/MF_VFILE'/>
    ///<reference path='MF_Canvas' />
    ///<reference path="../utils/MF_UTILS"/>
    ///<reference path="MF_ImageScroller"/>
class MF_ImageScrollControler  extends MF_ImageScroller{
    private  fc:MF_FACETOUCH;
    constructor(parenttagname:any,width:number,height:number,useFc:Boolean=true,rate=1) {
        super(parenttagname,width*rate,height*rate);
        //rate 不要随意设置。
        this.mf_canvas.setStyle('transform-origin','0 0');
        this.mf_canvas.setStyle('-webkit-transform-origin','0 0');
        this.mf_canvas.setStyle('-o-transform-origin','0 0');
        this.mf_canvas.setStyle('-moz-transform-origin','0 0');
        var r=1/rate;
        this.mf_canvas.setStyle('transform','scale('+r+','+r+')');
        this.mf_canvas.setStyle('-webkit-transform','scale('+r+','+r+')');
        this.mf_canvas.setStyle('-o-transform','scale('+r+','+r+')');
        this.mf_canvas.setStyle('-moz-transform','scale('+r+','+r+')');
        //useFc决定是否禁用触屏事件。
        if(!useFc) return;
        this.fc=new MF_FACETOUCH(this.box);
        this.fc.addEventListener('tapmove',(e)=>{
            this.handleMove(e.data);
        });
        this.fc.addEventListener('taprotate',(e)=>{
            this.handleRotate(e.data);
        })
    }
    private handleMove(offset:any)
    {
        this.x-=offset.offsetx;
        this.y-=offset.offsety;
    }
    private handleRotate(offset:any)
    {
        this.scale+=offset.scale;
        this.rotation+=offset.angle;
    }
}