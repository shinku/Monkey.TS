/**
 * Created by shin on 16/3/9.
 *
 */
namespace MF_EVENT {
    export abstract class EventDispatcher {
        private eventLip:Object={};
        constructor() {
        }
        public onEvent(eventtype:string,fun:Function)
        {
            this.addEventListener(eventtype,fun);
        }
        public moveEvent(eventtype:string,fun:Function)
        {
            this.removeEventListener(eventtype,fun);
        }
        public addEventListener(eventtype:string,fun:Function)
        {
            if(!this.eventLip[eventtype])
            {
                this.eventLip[eventtype]=new Array<Function>();
            }
            if(this.contains(eventtype,fun)) return;
            this.eventLip[eventtype].push(fun);
        }
        public dispatchEvent(event:MF_EVENT.Event)
        {
            var arr:Array<Function>=this.eventLip[event.type];
            if(arr)
            {
                for(var i:number=0; i< arr.length;i++ )
                {
                    var f:Function=arr[i];
                    event.target=this;
                    f(event);
                }
            }
        }
        private contains(eventtype:string,fun:Function)
        {
            for(var i:number=0;i< this.eventLip[eventtype].length;i++)
            {
                if(this.eventLip[eventtype][i]==fun) {return true};
            }
            return false;
        };
        public removeEventListener(eventtype:string,fun:Function)
        {
            var arr:Array<Function>=this.eventLip[eventtype];
            if(!arr) return;
            for(var i:number=0;i<arr.length;i++)
            {
                if(arr[i]==fun)
                {
                    arr.splice(i);
                }
            }
        }
    }
}