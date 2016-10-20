/**
 * Created by shin on 16/3/10.
 */
class MF_Point {
    public x:number;
    public y:number;
    public angle:number;
    public offsetx:number;
    public offsety:number;
    public offsetdistance:number;
    public scale:number;
    constructor(x:number=0,y:number=0,scale:number=0,angle:number=0,offsetx:number=0,offsety:number=0,offsetdistance:number=0) {
        this.x=x;
        this.y=y;
        this.angle=angle;
        this.offsetdistance=offsetdistance;
        this.offsetx=offsetx;
        this.offsety=offsety;
    }
}