/**
 * Created by shin on 2017/7/28.
 */
    ///<reference path='../core/Event'/>
    ///<reference path='../core/EventDispatcher'/>
    ///<reference path='../utils/MF_VFILE'/>
    ///<reference path='MF_Canvas' />
    ///<reference path="../utils/MF_UTILS"/>
    ///<reference path='canvasLayerOption'/>
    ///<reference path='backgroundCanvasLayOption'/>

class MF_ImageScroller extends MF_EVENT.EventDispatcher {
    protected canvas:HTMLCanvasElement;
    protected box:HTMLElement;
    protected mf_canvas:MF_Canvas;
    protected img:HTMLImageElement;
    constructor(_boxnametag:any,width:number,height:number) {
        super();
        if(typeof  _boxnametag =='string')
        {
            this.box=document.getElementById(_boxnametag);
        }
        else if(_boxnametag['tagName'])
        {
            this.box=_boxnametag;
        }
        this.mf_canvas=new MF_Canvas();

        this.mf_canvas.setStyle('width',width+"px");
        this.mf_canvas.setStyle('height',height+"px");
        this.box.appendChild(this.mf_canvas.myCanvas);
        MF_VFILE.getInstance().addEventListener('fileloaded',(e)=>{
            this.handleFileLoaded(e);
        });

        this.mf_canvas.addEventListener('drawcomplete',(e)=>{
            //监听到drawcomplete事件之后 ，同时向外发布drawcomplete 事件
            this.dispatchEvent(new MF_EVENT.Event('drawcomplete'));
        })

    }
    public set CanvasFilleStyle(val)
    {
        this.mf_canvas.fillStyle=val ||'normal';
    }
    public addLayer(img,x,y)
    {
        var layer=new canvasLayerOption(this.mf_canvas,img,x,y);
        return layer;
        //layer.posx=x;
        //layer.posy=y;
    }
    public addMask(img,x,y)
    {
        var layer=new canvasLayerOption(this.mf_canvas,img,x,y,true);
    }
    public addBackGround(img,x,y)
    {
        x=x || 0;
        y=y || 0;
        var layer=new backgroundCanvasLayOption(this.mf_canvas,img,x,y);
        return layer;
    }

    public set x(val:number)
    {
        this.mf_canvas.x=val;
    }
    public get x():number
    {
        return this.mf_canvas.x;
    }
    public set y(val:number)
    {
        this.mf_canvas.y=val;
    }
    public get y():number
    {
        return this.mf_canvas.y;
    }
    public set scale(val:number)
    {
        this.mf_canvas.scale=val;
    }
    public get scale():number
    {
        return this.mf_canvas.scale;
    }
    public set rotation(val:number)
    {
        this.mf_canvas.rotation=val;
    }
    public get rotation()
    {
        return this.mf_canvas.rotation;
    }


    public load()
    {

        MF_VFILE.getInstance().loadFile("image/png,image/jpg");
    }
    protected handleImageLoaded(e)
    {
        this.mf_canvas.draw(this.img);
    }
    handleFileLoaded(e)
    {
        //console.log(e);
        this.img=null;
        this.dispatchEvent(new MF_EVENT.Event('fileloaded',e));
        //数据结构：
        //{type: "fileloaded", data: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD…5wTX3FqTvBuKuxncwTyZPaBQPy8qbGdSHQQFoVmjZOtFiH//Z", target: MF_VFILE}
        this.img=new Image();
        this.img.onload=(e)=>{this.handleImageLoaded(e)}
        this.img.src=e.data;
    }
    public get pngData():string
    {
        return this.mf_canvas.getCanvasData('image/png');
    }
    public get JpgData():string
    {
        return this.mf_canvas.getCanvasData('image/jpeg',60);
    }
}