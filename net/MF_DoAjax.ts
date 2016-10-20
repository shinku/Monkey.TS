/**
 * Created by n-158 on 16/6/21.
 */
    ///<reference path='../core/EventDispatcher.ts'/>;
    ///<reference path='../core/Event.ts'/>;
    ///<reference path='../utils/MF_UTILS.ts'/>;
class MF_DoAjax extends MF_EVENT.EventDispatcher{
    private defaultsOpts = {
        type: 'POST',
        async: true,
        url: "",
        dataStringify: false,
        data: null,
        dataType: "json",
        successDecode: false,
        success: function(){},
        error: function () {
            alert('网络不给力，再试下吧！')
        },
        complete: function(){}
    }
    public initDefaultsOpts(opts){
        this.defaultsOpts = MF_UTILS.catact(this.defaultsOpts, opts);
    }
    public DoAjax(typeName:string,opts:any,fn:Function=null) {

        opts = MF_UTILS.catact(this.defaultsOpts, opts);

        if (opts.data) {
            if (opts.dataStringify == true) {
                opts.data = JSON.stringify(opts.data);
            }
        }
        if(opts.dataType=="jsonp"){
            var _script = document.createElement("script");
            var _url = opts.url;
            var callBackName = (opts.jsonp && opts.jsonp!="")?opts.jsonp:"jsonpCallback";

            var postData = opts.data||{};
                postData = (function(obj){ // 转成post需要的字符串.
                    var str = "";
                    for(var prop in obj){
                        str += (str.length>0?"&":"") + prop + "=" + obj[prop];
                    }
                    return str;
                })(postData);
            if(_url.indexOf("?") === -1){
                _url += "?jsonp="+callBackName+(postData.length>0?"&"+postData:"");
            }else{
                _url += "&jsonp="+callBackName+(postData.length>0?"&"+postData:"");
            }
            _script.src = _url;
            _script.type="text/javascript";
            document.body.appendChild(_script);
        }else{
            this.ajax({
                type: opts.type,
                async: opts.async,
                url: opts.url,
                data: opts.data,
                dataType: opts.dataType,
                success:(opts,d)=>{this.handleSucc(opts,d,typeName)},
                error: opts.error,
                complete: opts.complete
            });
        }

    }
    public ajax(defaultOpts:any){
        var postData = defaultOpts.data||"";
        var async = defaultOpts.async;

        postData = (function(obj){ // 转成post需要的字符串.
            var str = "";
            for(var prop in obj){
                str += (str.length>0?"&":"") + prop + "=" + obj[prop];
            }
            return str;
        })(postData);
        var xhr = new XMLHttpRequest();
        xhr.open(defaultOpts.type, defaultOpts.url, async);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            var XMLHttpReq = xhr;
            if (XMLHttpReq.readyState == 4){
                if (XMLHttpReq.status == 200){
                    var text = XMLHttpReq.responseText;
                    var msg = "";
                    switch(defaultOpts.dataType){
                        case "text": msg = text;break;
                        case "json": msg = JSON.parse(text);break;
                        default: msg = JSON.parse(text);break;
                    }

                    defaultOpts.success(defaultOpts,msg);

                }else{
                    defaultOpts.error(XMLHttpReq);
                }
                defaultOpts.complete();
            }
        };
        xhr.send(postData);
    }
    private handleSucc(opts:any,d:any,typename:string)
    {
        var e:MF_EVENT.Event=new MF_EVENT.Event('mf_dataloaded');
        if (opts.successDecode && d.Data && d.Data != '') {
            d.Data = eval('[' + MF_UTILS.html_decode(d.Data) + ']')[0];
        }
        //if (typeof d == "string") {
        //    d = JSON.parse(d);
        //}
        e.data={data:d,tname:typename};
        this.dispatchEvent(e);
    }
}