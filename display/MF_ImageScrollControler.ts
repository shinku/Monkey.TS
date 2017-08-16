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
    constructor(parenttagname:string,width:number,height:number) {
        super(parenttagname,width,height);
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