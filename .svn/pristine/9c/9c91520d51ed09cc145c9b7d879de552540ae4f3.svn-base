/**
 * Created by shin on 16/3/9.
 */
    ///<reference path='../core/EventDispatcher.ts'/>;
class MF_FACETOUCH extends MF_EVENT.EventDispatcher{
    private element:HTMLElement=null;
    private isTouch:boolean=false;
    private touchpoints:Array<MF_Point>=new Array<MF_Point>();
    private name:string='shin';
    private initdis:number=0;
    private initrotation:number=0;
    private pointsnumber:number=0;
    private lastp:any;
    private lastdis:number=0;
    private lastrotation:number=0;
    constructor(targetname:string) {
        super();
        this.element=document.getElementById(targetname) || document.body;
        this.initEvent();
    };

    private initEvent()
    {
        this.element.addEventListener(MF_DEVICECENTER.TOUCH_START,this.handleTouchBegin);
        this.element.addEventListener(MF_DEVICECENTER.TOUCH_MOVE,this.handleTouchMove);
        this.element.addEventListener(MF_DEVICECENTER.TOUCH_END,this.handleTouchEnd);
        document.addEventListener(MF_DEVICECENTER.TOUCH_END,function(){
            this.element.removeEventListener(MF_DEVICECENTER.TOUCH_MOVE,this.handleTouchMove);
        });
    };
    private handleTouchBegin(e:any)
    {
        e.preventDefault();
        this.isTouch=true;
        var str='';
        for (var o in e)
        {
            str+=o+"="+e[o]+"\n";
        }
        if(e.targetTouches)
        {
            var touchnum=e.targetTouches.length;
            this.pointsnumber++;
            switch(touchnum)
            {
                case 1:
                    this.lastp=this.touchpoints=[
                        new MF_Point(e.targetTouches[0].pageX,e.targetTouches[0].pageY)
                    ];/*[{'x':e.targetTouches[0].pageX,
                        'y':e.targetTouches[0].pageY}];*/
                    //handleTouchesByOnePoint(touchpoints);
                    break;
                case 2:
                    this.touchpoints=[
                        new MF_Point(e.targetTouches[0].pageX,e.targetTouches[0].pageY),
                        new MF_Point(e.targetTouches[1].pageX,e.targetTouches[1].pageY)
                    ];/*[{'x':e.targetTouches[0].pageX,
                        'y':e.targetTouches[0].pageY},
                        {'x':e.targetTouches[1].pageX,
                            'y':e.targetTouches[1].pageY}];*/
                    //if(self.initdis==0 && self.initrotation==0)
                    //{
                    //alert(touchnum);
                    this.initdis=this.caculatepointsDistance(this.touchpoints[0],this.touchpoints[1]).offsetdistance;
                    this.initrotation=this.caculatepointsDistance(this.touchpoints[0],this.touchpoints[1]).angle/Math.PI*180;
                    //alert(self.initdis,self.initrotation);
                    //}
                    break;
            };
            this.element.addEventListener('touchmove',this.handleTouchMove);
        }
        else
        {
            this.touchpoints=this.lastp=[new MF_Point(e.pageX,e.pageY)];
                /*[{'x':e.pageX,'y':e.pageY}]*/;
            this.element.addEventListener(MF_DEVICECENTER.TOUCH_MOVE,this.handleTouchMove);
        }
    };
    private handleTouchMove(e:any)
    {
        if(this.isTouch)
        {
            var newtouchs:Array<MF_Point>;
            if(e.targetTouches)
            {
                var touchnum=e.targetTouches.length;
                switch(touchnum)
                {
                    case 1:

                        newtouchs=[new MF_Point(e.targetTouches[0].pageX,e.targetTouches[0].pageY)];
                        /*[{'x':e.targetTouches[0].pageX,
                         'y':e.targetTouches[0].pageY}];*/

                        this.handleTouchesByOnePoint(newtouchs,this.touchpoints);
                        break;
                    case 2:
                        newtouchs=[
                            new MF_Point(e.targetTouches[0].pageX,e.targetTouches[0].pageY),
                            new MF_Point(e.targetTouches[1].pageX,e.targetTouches[1].pageY)];
                        this.handleTouchsByMultiPoints(newtouchs,this.touchpoints);

                        break;
                }
            }
            else{

                newtouchs=[new MF_Point(e.pageX,e.pageY)];
                this.handleTouchesByOnePoint(newtouchs,this.touchpoints);
            }
        }
        this.touchpoints=newtouchs;
    }
    private caculatepointsDistance(point1:MF_Point,point2:MF_Point):MF_Point
    {
        var resultp:MF_Point=new MF_Point();
        var movex:number=point2.x-point1.x;
        var movey:number=point2.y-point1.y;
        var distance=Math.sqrt(movex*movex+movey*movey);
        var angle1,angle2,anglebe:number;
        angle1=Math.atan2(movey,movex);
        resultp.offsetx=movex;
        resultp.offsety=movey;
        resultp.offsetdistance=distance;
        resultp.angle=angle1;
        return resultp;
    }

    private handleTouchEnd(e:any)
    {
        this.isTouch=false;
        this.pointsnumber=0;
        this.initdis=this.lastdis;
        this.initrotation=this.lastrotation;
        //this.ontouchend(lastp);
        this.dispatchEvent(new MF_EVENT.Event('tapend',this.lastp));
        this.element.removeEventListener(MF_DEVICECENTER.TOUCH_MOVE,this.handleTouchMove);
    };
    private handleTouchesByOnePoint(points1:Array<MF_Point>,points2:Array<MF_Point>){
        var p:MF_Point=this.caculatepointsDistance(points1[0],points2[0]);
        this.lastp=p;
        this.dispatchEvent(new MF_EVENT.Event('tapmove',p));
    }
    private handleTouchsByMultiPoints(points1:Array<MF_Point>,points2:Array<MF_Point>)
    {
        var result1:MF_Point=this.caculatepointsDistance(points1[0],points1[1]);
        var result2:MF_Point=this.caculatepointsDistance(points2[0],points2[1]);
        var dis:number=result2.offsetdistance-result1.offsetdistance;
        var ang:number=result2.angle-result1.angle;
        var sc:number=-dis/this.initdis/2;
        var mainresult:MF_Point=new MF_Point();
        mainresult.angle=-ang/Math.PI*180;
        mainresult.scale=sc;
        this.dispatchEvent(new MF_EVENT.Event('taprotate',mainresult));
    }

}
//addEventListener('tapend',function(e){console.log(e.data)});
//addEventListener('tapmove',function(e){console.log(e.data)});
//addEventListener('taprotate',function(e){console.log(e.data)});