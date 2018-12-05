/**
 * Created by shin on 2017/11/22.
 */
    ///<reference path='../utils/MF_Point'/>
    ///<reference path='MF_Canvas' />

class canvasLayerOption {
    protected _img:HTMLImageElement;
    protected position:MF_Point;
    protected _canvas:MF_Canvas;
    protected _ismask:boolean;
    protected _isbackground:boolean;
    protected _width;
    protected _height;
    protected _scale=1;
    protected _rotation=0;
    protected _center={};
    constructor(canvas,img,x=0,y=0,isMask=false) {
        this._img=img;
        this._canvas=canvas;
        this.canvasAddLayer();

        this.position=new MF_Point(x,y);
        this._ismask=isMask;
        if(!img.onload)
        {
            img.onload=(e)=>{
                this.onImgLoaded();
                this._width=e.target.width;
                this._height=e.target.height;
            }
        }
        else{
            this.onImgLoaded();
            this._width=img.width;
            this._height=img.height;
        }

    }
    public get center()
    {
        function p(x,y){
            this.x=x;
            this.y=y;
        }
        function middlep(p1,p2)
        {
            return new p((p1.x+p2.x)/2,(p1.y+p2.y)/2);
        }
        var p1=new p(this.posx,this.posy);
        var p2=new p(this.posx+this._width,this.posy);
        var p3=new p(this.posx,this.posy+this._height);
        var p4=new p(this.posx+this._width,this.posy+this._height);

        var m1=middlep(p1,p2);
        var m2=middlep(p3,p4);
        var m=middlep(m1,m2);
        return {
            x:this.posx+this._width/2,
            y:this.posy+this._height/2,
        };

    }
    protected canvasAddLayer()
    {
        if(this._canvas)
        {
            this._canvas.addLayer(this);
        }

    }

    public get ismask()
    {
        return this._ismask;
    }
    set posx(x:number)
    {
        this.position.x=x;
    }
    get posx()
    {
        return this.position.x;
    }

    set posy(y:number)
    {
        this.position.y=y;
    }
    get posy()
    {
        return this.position.y;
    }

    onImgLoaded()
    {
        this._canvas.drawLayer(this);
    }
    get img()
    {
        //console.log(this._img);
        return this._img;
    }
    get bound()
    {
        return {
            x:this.posx,
            y:this.posy,
            width:this._img.width,
            height:this._img.height
        }
    }
    hitTest(x,y)
    {
        var ret=this.bound;
       // console.log(ret,"X-",x,"Y-",y);

        if(x>=ret.x && x <= ret.x+ret.width && y>=ret.y && y<=ret.y+ret.height )
        {
            //console.log(123123);
            return true;
        }
        return false;
    }

}