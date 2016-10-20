/**
 * Created by shin on 16/6/27.
 */
    ///<reference path='MF_animateImages.ts'/>
    ///<reference path='MF_judge.ts'/>
class MF_animateSheet extends MF_animateImages{

    constructor(p:any){

        this.parameter = p;
        if(MF_display_Judger.isLdCompleteList(this.parameter.imgList)){
            this.parameter.imgList=MF_display_Judger.getImgList(this.parameter.imgList);
        }else{
            this.parameter.imgList=[];
        }
        super(this.parameter);
        this.length=this.parameter.imgList.length;

        if(this.type=="canvas"){
            this.canvas=this.creatElment("canvas");
            this.canvas.width=this.width;
            this.canvas.height=this.height;
            this.parents.appendChild(this.canvas);
        }else if(this.type=="img"){

        }
        this.endIndex=this.length;
        this.toProgress(this.progress);
    };
    drawImages(n)
    {
        switch(this.type)
        {
            case 'img':
                this.clear();
                this.parents.appendChild(this.anmtList[n]);
                break;
            case 'canvas':
                var ctx=this.canvas.getContext("2d");
                this.clear();
                var img:HTMLImageElement=this.anmtList[n] as HTMLImageElement;
                ctx.drawImage(img,0,0);
                break;
        }
    };
    clear()
    {
        switch(this.type)
        {
            case 'img':
                while(this.parents.hasChildNodes()){
                    this.parents.removeChild(this.parents.firstChild);
                }
            break;
            case 'canvas':
            var ctx=this.canvas.getContext("2d");
            ctx.clearRect(0,0,this.width,this.height);
            break;
        }
    }

}