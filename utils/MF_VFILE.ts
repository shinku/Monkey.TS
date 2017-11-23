import EventDispatcher = MF_EVENT.EventDispatcher;
/**
 * Created by shin on 16/3/9.
 */
///<reference path='../core/EventDispatcher.ts' />;
///<reference path='../core/Event.ts' />;
    ///<reference path='../utils/EXIF.ts'/>
class MF_VFILE  extends MF_EVENT.EventDispatcher{
    private static instance:MF_VFILE;
    private input:any;
    private file:FileReader;
    public data:any;
    public chacheFile:any;

    constructor() {
        super();
        if(window.hasOwnProperty('File') && window.hasOwnProperty('FileReader') && window.hasOwnProperty('FileList') && window.hasOwnProperty('Blob'))
        {
            console.log("Great success! All the File APIs are supported.");
        } else {
            console.log('The File APIs are not fully supported in this browser.');
            alert("你使用的浏览器不支持文件本地上传。请更新你的浏览器");
            return;
        };

        this.file = new FileReader();
        this.file.onload =(e:any)=>{
            //console.log('uploaded');
            this.dispatchEvent(new MF_EVENT.Event('fileloaded',e.target.result));
            //初始化input标签，
            this.initInput();
        }
        //初始化input标签，
        this.initInput();
    }
    public initInput()
    {
        this.input=null;
        this.input = document.createElement('input');
        this.input.type = 'file';
        //document.body.appendChild(this.input);
        this.input.onchange=(e)=>{
            this.fileSelect(e);
        };
    }
    static getInstance():MF_VFILE
    {
        if(!MF_VFILE.instance)
        {
            MF_VFILE.instance=new MF_VFILE();
        }
        return  MF_VFILE.instance;
    }
    private fileSelect(e:any)
    {
        var targe:any= e.target || window.event.srcElement;
        var filedata:any=this.input.files[0];

        //console.log(filedata);

        //EXIF.getData(filedata,function(){
         //   alert(EXIF.pretty(filedata));
        //})
        //console.log(filedata);
        //如果重复提交同一个文件，不用再次读取。直接返回即可。
        if(!filedata){
            console.log('没有选择文件');
            this.dispatchEvent(new MF_EVENT.Event('error','null'));
            return
        }
        else{
            this.file.readAsDataURL(filedata);
            console.log('载入VFILE资源');
        }
    }
    public loadFile(filters)
    {
        //console.log(this.input);
        if(filters)
        {
            this.input.accept=filters;
        }
        //console.log(this.input);
        if(document.all)
        {
            this.input.click();
        }
        else
        {
            var e=document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            this.input.dispatchEvent(e);
        }
    }

}