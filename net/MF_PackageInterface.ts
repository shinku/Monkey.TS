/**
 * Created by n-158 on 16/6/21.
 */
    ///<reference path='../core/EventDispatcher.ts'/>;
    ///<reference path='../core/Event.ts'/>;
    ///<reference path='MF_DoAjax.ts'/>;
class MF_PackInterface extends MF_EVENT.EventDispatcher {
    protected ajaxer:MF_DoAjax=new MF_DoAjax();
    protected EVENT_OBJ:any;
    constructor(EVENT_OBJ:any) {
        super();
        this.EVENT_OBJ = EVENT_OBJ || MF_NET.GET_IN();
        this.init();
    }
    public init() {
        this.ajaxer.addEventListener('mf_dataloaded',(e)=>{this.handleLoaded(e)});
    }

    private handleLoaded(e:MF_EVENT.Event)
    {
        this.runEvent(e.data.tname,e.data.data);
    }
    public callInterface(typeName:string, data?:any) {

        if(this.EVENT_OBJ[typeName].url && this.EVENT_OBJ[typeName].url.length>0) {
            this.EVENT_OBJ[typeName].data = data||{};
            this.ajaxer.DoAjax(typeName, this.EVENT_OBJ[typeName]);
        }else{
            this.runEvent(typeName, data||{});
        }
    }
    public runEvent(typeName:string, Data:Object) {
        this.dispatchEvent(new MF_EVENT.Event(typeName, Data));
    }
    public initDefaultsOpts(opts:any){
        this.ajaxer.initDefaultsOpts(opts);
    }
}