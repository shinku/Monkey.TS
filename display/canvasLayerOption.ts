/**
 * Created by shin on 2017/11/22.
 */
    ///<reference path='../utils/MF_Point'/>
    ///<reference path='MF_Canvas' />

class canvasLayerOption {
    protected _img:HTMLImageElement;
    protected position:MF_Point;
    protected _canvas:MF_Canvas;
    constructor(canvas,img,x=0,y=0) {
        this._img=img;
        this._canvas=canvas;
        this._canvas.addLayer(this);
        this.position=new MF_Point(x,y);
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