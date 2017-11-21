/**
 * Created by shin on 2017/7/31.
 */
    ///<reference path='../core/Event'/>
    ///<reference path='../core/EventDispatcher'/>
    ///<reference path='../utils/MF_VFILE'/>
class MF_Canvas extends MF_EVENT.EventDispatcher{
    static canvasLabs:any={};
    protected canvas:HTMLCanvasElement;
    protected _scale:number=1;
    protected offsetscale:number=0;
    protected _x:number=0;
    protected _y:number=0;
    protected offsetx:number=0;
    protected offsety:number=0;
    protected _rotate:number=0;
    protected offsetrotate:number=0;
    protected context:CanvasRenderingContext2D;
    protected imgdate:HTMLImageElement;
    protected imgPosition:any={};
    constructor() {
        super();
        this.canvas=document.createElement('canvas');

        this.context=this.canvas.getContext('2d');

    }
    public draw(imgdata:HTMLImageElement)
    {
        this.imgdate=imgdata;
        this.doDraw();
    }
    private doDraw()
    {
        var imgdata=this.imgdate;
        var w:number=imgdata.width;
        var h:number=imgdata.height;
        var cw:number=this.canvas.width;
        var ch:number=this.canvas.height;
        this.imgPosition.width=cw;
        this.imgPosition.height=ch;
        this.context.setTransform(1,0,0,1,0,0);
        this.context.drawImage(imgdata,0,0,w,h,0,0,cw,ch);
    }

    /*
     a	水平旋转绘图
     b	水平倾斜绘图
     c	垂直倾斜绘图
     d	垂直缩放绘图
     e	水平移动绘图
     f	垂直移动绘图
    * */
    public update()
    {
        var imgdata=this.imgdate;
        var w:number=imgdata.width;
        var h:number=imgdata.height;
        var cw:number=this.canvas.width;
        var ch:number=this.canvas.height;
        //console.log(this.x,this.y);
        //this.context.translate(this.offsetx,this.offsety);
        this.clear();
        this.context.globalCompositeOperation='copy';
        this.context.drawImage(imgdata,0,0,w,h,0,0,cw,ch);
        this.offsetrotate=this.offsetscale=this.offsetx=this.offsety = 0;

    }
    protected clear()
    {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        //this.context.fillStyle='white';
        //this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
        //this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    public set scale(val:number)
    {
        this.offsetscale=val-this._scale;
        this._scale=val;
        this.clear();
        var w:number=this.imgPosition.width*(this.offsetscale+1);
        var h:number=this.imgPosition.height*(this.offsetscale+1);
        this.context.transform(this.offsetscale+1,
            0,
            0,
            this.offsetscale+1,
            -this.offsetscale*this.imgPosition.width/2,
            -this.offsetscale*this.imgPosition.height/2);
        this.update();

    }
    public get scale():number
    {
        return this._scale;
    }
    /*
    *
    * 坐标旋转：
     x1 = Math.cos(angle) * x - Math.sin(angle) * y;
     y1 = Math.cos(angle) * y + Math.sin(angle) * x;
     反坐标旋转：
     x1 = Math.cos(angle) * x + Math.sin(angle) * y;
     y1 = Math.cos(angle) * y - Math.sin(angle) * x;
    *
    * */
    public set x(val:number)
    {
        this.offsetx=val-this._x;
        this._x=val;
        this.clear();
        var offset:any=this.roateAnglePosition(this.offsetx/this._scale,0,-this.rotation/180*Math.PI);
        this.context.transform(1,
            0,
            0,
            1,
            offset.ofx,
            offset.ofy);

        this.update();

    }
    private roateAnglePosition(x,y,angle)
    {
       var  x1:number = Math.cos(angle) * x - Math.sin(angle) * y;
        var  y1:number = Math.cos(angle) * y + Math.sin(angle) * x;
        return {ofx:x1,ofy:y1};
    }
    public get x():number
    {
        return this._x;
    }
    public set y(val:number)
    {
        this.offsety=val-this._y;
        this._y=val;
        this.clear();
        var offset:any=this.roateAnglePosition(0,this.offsety/this._scale,-this.rotation/180*Math.PI);
        this.context.transform(1,
            0,
            0,
            1,
            offset.ofx,
            offset.ofy);
        this.update();
    }
    public get y():number
    {
        return this._y;
    }

    public set rotation(val:number)
    {
        this.offsetrotate=(val-this._rotate)/180*Math.PI;
        this._rotate=val;
        this.clear();
        var w:number=this.imgPosition.width*(this.offsetscale+1);
        var h:number=this.imgPosition.height*(this.offsetscale+1);

       // this.context.rotate(-this._rotate/180*Math.PI);
        this.context.translate( this.canvas.width/2,
            this.canvas.height/2);
        //this.clear();
        this.context.rotate( this.offsetrotate);
        //this.clear();
        this.context.translate(-this.canvas.width/2,-this.canvas.height/2);
        //this.clear();
        this.clear();

        this.update();

    }
    public get rotation():number
    {
        return this._rotate;
    }

    public get myCanvas():HTMLCanvasElement
    {
        return this.canvas;
    }
    public setStyle(type:string,value:string)
    {
        this.canvas.style[type]=value;
        if(type=='width')
        {
            var ww:number=parseFloat(value.replace('px',''));
            this.canvas.width=ww;
        }
        if(type=='height')
        {
            var hh:number=parseFloat(value.replace('px',''));
            this.canvas.height=hh;
        }
    }
    public getCanvasData(type:string,encoderOptions:number=1):string
    {
        return this.canvas.toDataURL(type,encoderOptions)
    }

}