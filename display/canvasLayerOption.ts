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
            }
        }
        else{
            this.onImgLoaded();
        }

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

}