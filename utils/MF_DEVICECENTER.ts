/**
 * Created by shin on 16/3/9.
 * 设备中心
 */
class MF_DEVICECENTER {
    private static _TOUCH_START:string='touchstart';
    private static _TOUCH_MOVE:string='touchmove';
    private static _TOUCH_END:string='touchend';
    private static _DEVICE_TYPE:string='mobile';
    private static isChecked:boolean=false;
    constructor() {
    }
    static check()
    {
        var deviceinfo:string=navigator.userAgent.toLowerCase();
        if(deviceinfo.match(/ipad/))
        {
            console.log('this is ipad')
        }
        else if(deviceinfo.match(/iphone/))
        {
            console.log('this is iphone')
        }
        else if(deviceinfo.match(/android/))
        {
            console.log('this is android')
        }
        else if(deviceinfo.match(/windows phone/) || deviceinfo.match(/windows mobile/))
        {
           // console.log('this is wp');
            MF_DEVICECENTER.TOUCH_START='mousedown';MF_DEVICECENTER.TOUCH_MOVE='mousemove';MF_DEVICECENTER.TOUCH_END='mouseup';
        }
        else
        {
            MF_DEVICECENTER.TOUCH_START='mousedown';MF_DEVICECENTER.TOUCH_MOVE='mousemove';MF_DEVICECENTER.TOUCH_END='mouseup';
        };
        MF_DEVICECENTER.isChecked=true;
    }
    static get TOUCH_START():string
    {
        if(!MF_DEVICECENTER.isChecked) MF_DEVICECENTER.check();
        return MF_DEVICECENTER._TOUCH_START;
    }
    static set TOUCH_START(val:string)
    {
        MF_DEVICECENTER._TOUCH_START=val;
    }
    static get TOUCH_MOVE():string
    {
        if(!MF_DEVICECENTER.isChecked) MF_DEVICECENTER.check();
        return MF_DEVICECENTER._TOUCH_MOVE;
    }
    static set TOUCH_MOVE(val:string)
    {
        MF_DEVICECENTER._TOUCH_MOVE=val;
    };
    static get TOUCH_END():string
    {
        if(!MF_DEVICECENTER.isChecked) MF_DEVICECENTER.check();
        return MF_DEVICECENTER._TOUCH_END;
    }
    static set TOUCH_END(val:string)
    {
        MF_DEVICECENTER._TOUCH_END=val;
    }

}