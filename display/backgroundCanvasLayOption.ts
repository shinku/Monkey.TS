
///<reference path='../utils/MF_Point'/>
///<reference path='MF_Canvas' />


class backgroundCanvasLayOption extends canvasLayerOption
{

    constructor(canvas,img,x=0,y=0)
    {


        super(canvas,img,x,y,false);
        canvas.background=this;
        this._isbackground=true;
    }
    protected canvasAddLayer ()
    {
            console.log('!');
    }

}