/**
 * Created by shin on 16/6/27.
 */
///<reference path='MF_animateImages.ts' />
//参数：row：行数，column：列数；
class MF_animateSprite extends MF_animateImages{

    constructor(p:any){

        this.parameter = p;
        if(MF_display_Judger.isDom(this.parameter.imgList)){
            this.parameter.imgList=[this.parameter.imgList];
        }else if(MF_display_Judger.isLdCompleteList(this.parameter.imgList)){
            this.parameter.imgList=MF_display_Judger.getImgList(this.parameter.imgList);
        }else if(!MF_display_Judger.isJQ(this.parameter.imgList)){
            this.parameter.imgList=[];
        }
        super(p);
        this.length=this.parameter.row*this.parameter.column;

        var _img=this.anmtList[0];
        this.getPosition=function(n:number){
            return {
                x:-(n%this.parameter.column*this.width),
                y:-(parseInt(<any>(n/this.parameter.column))*this.height)
            };
        };
        if(this.type=="canvas"){
            this.remove();
            this.canvas=this.creatElment("canvas");
            this.canvas.width=this.width;
            this.canvas.height=this.height;
            this.parents.appendChild(this.canvas);
            var ctx=this.canvas.getContext("2d");
            var imgW=_img.width;
            var imgH=_img.height;
            this.drawImages=function(n){
                this.clear();
                var _position=this.getPosition(n);
                ctx.drawImage(_img,_position.x,_position.y,imgW,imgH);
            };
            this.clear=function(){
                ctx.clearRect(0,0,this.width,this.height);
            };
        }else if(this.type=="img"){
            var box:any=this.creatElment("div");
            this.css(box,{position:"absolute",top:0,left:0,width:this.width+"px",height:this.height+"px",overflow:"hidden"}, null);
            this.parents.appendChild(box);
            box.appendChild(_img);
            this.css(_img,{position:"absolute",top:0,left:0},null);
            this.drawImages=function(n){
                var _position=this.getPosition(n);
                this.css(_img,{top:_position.y+"px",left:_position.x+"px"},null);
            };
            this.clear=function(){
                while(this.parents.hasChildNodes()){
                    this.parents.removeChild(this.parents.firstChild);
                }
            };
        }
        this.endIndex=this.length;
        this.toProgress(this.progress);
    }
}