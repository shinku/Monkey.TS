/**
 * Created by n-158 on 16/6/17.
 */
class MF_NET
{
    private static _instance:MF_NET;
    constructor(){}
    private static appUrlConfig:any={};

    public static reg(name:string,data:any)
    {
        MF_NET.appUrlConfig[name]=data;
        MF_NET.GET_IN()[name]=MF_NET.appUrlConfig[name];
    }
    public static GET_IN()
    {
        if(!MF_NET._instance)
        {
            MF_NET._instance=new MF_NET();
        }
        return MF_NET._instance;
    }

}