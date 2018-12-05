/**
 * Created by shin on 2017/7/31.
 */
    ///<reference path='../core/Event'/>
    ///<reference path='../core/EventDispatcher'/>
    ///<reference path='../utils/MF_VFILE'/>
    ///<reference path='canvasLayerOption'/>
    ///<reference path='../utils/MF_COVERIMG'/>
    ///<reference path='../utils/EXIF'/>
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
    protected imgw:number;
    protected imgh:number;
    protected _background:canvasLayerOption;
    protected layers:Array<canvasLayerOption>=[];
    public fillStyle='normal';//'cover ; normal';
    protected _masker:any;
    constructor() {
        super();
        this.canvas=document.createElement('canvas');
        this.context=this.canvas.getContext('2d');

    }
    public getStyle(styename)
    {
        return this.myCanvas.style[styename];
    }
    public set mask(m)
    {
        this._masker=m;
    }
    public set background(layer)
    {
        this._background=layer;
    }
    public draw(imgdata:HTMLImageElement)
    {
        this.imgdate=imgdata;
        var self=this;
        if(!EXIF) return;
        EXIF.getData(this.imgdate,function(){
            //alert('getdata');
            //console.log(this);
            //console.log(this.exifdata);
            //alert(EXIF.pretty(this));
            //console.log(EXIF.getAllTags(this));
            //alert(EXIF.pretty(this));
            var exifdata=EXIF.getAllTags(this);
            //console.log(exifdata);
            self.reCoverData(exifdata);

        });

    }
    public reCoverData(exifdata){

        console.log(exifdata);
        switch(exifdata.Orientation)
        {
            //0
            case 1:
                //this.doDraw();
                //MF_COVERIMG.coverBack90(this.imgdate,(img)=>{this.doDraw(img)});
                this.doDraw();
                break;
            //90
            case 6:
                //往回旋转-90度，重新获取图片
                MF_COVERIMG.coverBack90(this.imgdate,(img)=>{this.doDraw(img)});
                break;
            //-90
            case 8:
                this.doDraw();
                break;
            //180
            case 3:
                MF_COVERIMG.coverBack180(this.imgdate,(img)=>{this.doDraw(img)});
                break;
            default:
                this.doDraw();
                break;
        }

    }
    private doDraw(img=null)
    {
        if(img) this.imgdate=img;
        var imgdata=this.imgdate;
        var w:number=imgdata.width;
        var h:number=imgdata.height;
        var cw:number=this.canvas.width;
        var ch:number=this.canvas.height;
        this.imgPosition.width=cw;
        this.imgPosition.height=ch;
        this.context.setTransform(1,0,0,1,0,0);
        this.context.save();

        this._x=this._y=this._rotate=0;
        this._scale=1;

        switch(this.fillStyle)
        {
            case "normal":
                if(w/h>cw/ch)
                {
                    // 图片宽高比比容器宽高比多
                    this.imgw=cw;
                    var sc=cw/w;
                    this.imgh=h*sc;
                    this.y=(ch-this.imgh)/2;
                    //this.x=0;
                }
                else{
                    //
                    this.imgh=ch;
                    var sc=ch/h;
                    this.imgw=w*sc;
                    this.x=(cw-this.imgw)/2;
                    //this.y=0;
                    //this.context.drawImage(imgdata,0,0,w,h,0,0,this.imgw,this.imgh);
                };
                break;
            case "cover":
                if(w/h>cw/ch)
                {
                    // 图片宽高比比容器宽高比多
                    this.imgh=ch;
                    var sc=ch/h;
                    this.imgw=w*sc;
                    this.x=(cw-this.imgw)/2;

                }else{
                    this.imgw=cw;
                    var sc=cw/w;
                    this.imgh=h*sc;
                    this.y=(ch-this.imgh)/2;
                }

                break;
        }



        //发布绘制完成事件
        this.dispatchEvent(new MF_EVENT.Event('drawcomplete'));
        //this.context.save();
        //this.context.drawImage(imgdata,0,0,w,h,0,0,this.imgw,this.imgh);
        //this.context.drawImage(imgdata,0,0,w,h,0,0,cw,ch);
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
        if(!imgdata) return;




        var w:number=imgdata.width;
        var h:number=imgdata.height;
        var cw:number=this.canvas.width;
        var ch:number=this.canvas.height;
        //console.log(this.x,this.y);
        //this.context.translate(this.offsetx,this.offsety);
        this.clear();

        if(this._background)
        {
            this.drawLayer(this._background);
            //return;
        }


        //this.context.globalCompositeOperation='copy';





        this.context.save();
        var offx=this.canvas.width/2;
        var offy=this.canvas.height/2;
        this.context.translate(offx,offy);
        this.context.translate(this.x,this.y);

        this.context.rotate( this._rotate/180*Math.PI);
        this.context.scale(this._scale,this._scale);
        //var offset:any=this.roateAnglePosition((this.x+offx)/this._scale,(this.y+offx)/this._scale,-this.rotation/180*Math.PI);

        this.context.translate(-offx,-offy);
        //this.context.translate(offset.ofx-offx,offset.ofy-offy);
        //this.context.translate(offset.ofx,offset.ofy);
        //this.context.rotate( this._rotate/180*Math.PI);
        //this.context.scale(this._scale,this._scale);
        //this.context.translate(-this.canvas.width/2,-this.canvas.height/2);
        /* var offset:any=this.roateAnglePosition(this.x,
            this.y,
            -this.rotation/180*Math.PI);
        this.context.translate(offset.ofx,offset.ofy);
        this.context.rotate( this._rotate/180*Math.PI);*/
        //this.context.translate(this.canvas.width/2,this.canvas.height/2);

        //this.context.translate(-this.canvas.width/2,-this.canvas.height/2);
        //this.context.translate(-this.offsetscale*this.imgPosition.width/2,-this.offsetscale*this.imgPosition.height/2);
        this.context.drawImage(imgdata,0,0,w,h,0,0,this.imgw,this.imgh);
        this.offsetrotate=this.offsetscale=this.offsetx=this.offsety = 0;
        this.context.restore();
        for(var i=0;i<this.layers.length;i++)
        {
            var layer=this.layers[i];
            this.drawLayer(layer);
        };
        this.drawMask();
    }
    public addLayer(layer)
    {
        this.layers.push(layer);
    }
    public drawMask(){

    }
    public drawLayer(layer)
    {
        //this.context.setTransform(1,0,0,1,0,0);
        //console.log(layer.img.width,layer.img.height,layer.x,layer.y);
        //console.log(layer.posx);
        this.context.save();
        if(layer.ismask)
        {
            this.context.globalCompositeOperation="destination-in";
            //console.log("MASK!!");
        }
        var offx=this.canvas.width/2;
        var offy=this.canvas.height/2;
        //this.context.translate(-offx,-offy);
        console.log(layer.posx,layer.posy);

        this.context.translate(layer.center.x,layer.center.y);
        //this.context.translate(layer.posx,layer.posy);
        this.context.rotate(layer._rotation/180*Math.PI);
        this.context.scale(layer._scale,layer._scale);
        this.context.translate(-layer.center.x,-layer.center.y);
        //this.context.translate(layer.posx,layer.posy);
        //this.context.translate(layer._width/2,layer._height/2);
       // this.context.translate(offx,offy);
        /*this.context.drawImage(layer.img,0,0,
            layer.img.width,
            layer.img.height,
            layer.posx,
            layer.posy,
            layer.img.width,
            layer.img.height);*/
        this.context.drawImage(layer.img,0,0,
            layer.img.width,
            layer.img.height,
            layer.posx,
            layer.posy,
            layer.img.width,
            layer.img.height);
        this.context.restore();
        //this.context.restore();
      //  console.log(layer.img);
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
        this.context.save();
        //var w:number=this.imgPosition.width*(this.offsetscale+1);
        //var h:number=this.imgPosition.height*(this.offsetscale+1);
        /*this.context.transform(this.offsetscale+1,
            0,
            0,
            this.offsetscale+1,
            -this.offsetscale*this.imgPosition.width/2,
            -this.offsetscale*this.imgPosition.height/2);*/
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
        this.offsetx=val;
        this._x=val;

        this.context.save();
      /*  this.context.transform(1,
            0,
            0,
            1,
            offset.ofx,
            offset.ofy);*/
        this.update();
    }
    private roateAnglePosition(x,y,angle)
    {
        x+=this.canvas.width/2;
        y+=this.canvas.height/2;
       var  x1:number = Math.cos(angle) * x - Math.sin(angle) * y ;
        var  y1:number = Math.cos(angle) * y + Math.sin(angle) * x;
        //x1-=this.canvas.width/2;
        //y1-=this.canvas.height/2;
        return {ofx:x1,ofy:y1};

    }
    public get x():number
    {
        return this._x;
    }
    public set y(val:number)
    {
        this.offsety=val-this._y;
        this.offsety=val;
        this._y=val;
        var offset:any=this.roateAnglePosition(0,this.offsety/this._scale,-this.rotation/180*Math.PI);
        this.context.save();
        /*this.context.transform(1,
            0,
            0,
            1,
            offset.ofx,
            offset.ofy);*/
        this.update();
    }
    public get y():number
    {
        return this._y;
    }
    public chekTarget(x,y)
    {

        var i=0;
        var hittarget=null;
        //console.log(this.layers.length);
        while(i<=this.layers.length-1)
        {
            var target=this.layers[i];
            if(target && target.hitTest(x,y))
            {
                hittarget=target;
            }
            i++;
        }
        return hittarget;
    }
    public removeLayer(layer)
    {
        for(var i =0;i<this.layers.length;i++)
        {
            if(layer==this.layers[i])
            {
                this.layers.splice(i,1);
            }
        }
    }
    public setLayerToTheTop(layer)
    {
        for(var i =0;i<this.layers.length;i++)
        {
            if(layer==this.layers[i])
            {
                this.layers.splice(i,1);
                continue;
            }
        }
        this.layers.push(layer);
        this.update();
    }
    public set rotation(val:number)
    {
        this.offsetrotate=(val-this._rotate)/180*Math.PI;
        this._rotate=val;
        //var w:number=this.imgPosition.width*(this.offsetscale+1);
        //var h:number=this.imgPosition.height*(this.offsetscale+1);
        this.context.save();
       // this.context.rotate(-this._rotate/180*Math.PI);
       /* this.context.translate( this.canvas.width/2,
            this.canvas.height/2);
        //this.clear();
        this.context.rotate( this.offsetrotate);
        //this.clear();
        this.context.translate(-this.canvas.width/2,-this.canvas.height/2);*/
        //this.clear();
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