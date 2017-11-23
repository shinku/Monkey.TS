/**
 * Created by shin on 2017/11/24.
 */
class MF_COVERIMG {

    constructor() {
    }
    //向回旋转90度
    static coverBack90(img,callback)
    {
        var w=img.width;
        var h=img.height;
        var canvas=document.createElement('canvas');
        canvas.style['width']=h+"px";
        canvas.style['height']=w+"px";
        canvas.setAttribute('width',h);
        canvas.setAttribute('height',w);
        var context=canvas.getContext('2d');
        context.translate(h,0);
        context.rotate(90/180*Math.PI);

        context.drawImage(img,0,0,w,h,0,0,w,h);
        var tempimg=new Image();
        tempimg.onload=function(){
            //img=tempimg;
            canvas=null;
            context=null;
            callback(tempimg);
        };
        tempimg.src= canvas.toDataURL('image/jpg');
        //return canvas.toDataURL('image/jpg');

    }
    static coverBack180(img,callback)
    {
        var w=img.width;
        var h=img.height;
        var canvas=document.createElement('canvas');
        canvas.style['width']=w+"px";
        canvas.style['height']=h+"px";
        canvas.setAttribute('width',w);
        canvas.setAttribute('height',h);
        var context=canvas.getContext('2d');
        context.translate(w,h);
        context.rotate(-180/180*Math.PI);

        context.drawImage(img,0,0,w,h,0,0,w,h);
        var tempimg=new Image();
        tempimg.onload=function(){
            //img=tempimg;
            canvas=null;
            context=null;
            callback(tempimg);
        };
        tempimg.src= canvas.toDataURL('image/jpg');
    }

}