var MF_EVENT;
(function (MF_EVENT) {
    var Event = (function () {
        function Event(type, data) {
            if (data === void 0) { data = null; }
            this.type = type;
            this.data = data;
        }
        return Event;
    })();
    MF_EVENT.Event = Event;
})(MF_EVENT || (MF_EVENT = {}));
var MF_EVENT;
(function (MF_EVENT) {
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.eventLip = {};
        }
        EventDispatcher.prototype.onEvent = function (eventtype, fun) {
            this.addEventListener(eventtype, fun);
        };
        EventDispatcher.prototype.moveEvent = function (eventtype, fun) {
            this.removeEventListener(eventtype, fun);
        };
        EventDispatcher.prototype.addEventListener = function (eventtype, fun) {
            if (!this.eventLip[eventtype]) {
                this.eventLip[eventtype] = new Array();
            }
            if (this.contains(eventtype, fun))
                return;
            this.eventLip[eventtype].push(fun);
        };
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var arr = this.eventLip[event.type];
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var f = arr[i];
                    event.target = this;
                    f(event);
                }
            }
        };
        EventDispatcher.prototype.contains = function (eventtype, fun) {
            for (var i = 0; i < this.eventLip[eventtype].length; i++) {
                if (this.eventLip[eventtype][i] == fun) {
                    return true;
                }
                ;
            }
            return false;
        };
        ;
        EventDispatcher.prototype.removeEventListener = function (eventtype, fun) {
            var arr = this.eventLip[eventtype];
            if (!arr)
                return;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == fun) {
                    arr.splice(i);
                }
            }
        };
        return EventDispatcher;
    })();
    MF_EVENT.EventDispatcher = EventDispatcher;
})(MF_EVENT || (MF_EVENT = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher = MF_EVENT.EventDispatcher;
var MF_VFILE = (function (_super) {
    __extends(MF_VFILE, _super);
    function MF_VFILE() {
        var _this = this;
        _super.call(this);
        if (window.hasOwnProperty('File') && window.hasOwnProperty('FileReader') && window.hasOwnProperty('FileList') && window.hasOwnProperty('Blob')) {
            console.log("Great success! All the File APIs are supported.");
        }
        else {
            console.log('The File APIs are not fully supported in this browser.');
            alert("你使用的浏览器不支持文件本地上传。请更新你的浏览器");
            return;
        }
        ;
        this.input = document.createElement('input');
        this.input.type = 'file';
        this.input.onchange = function (e) {
            _this.fileSelect(e);
        };
        this.file = new FileReader();
        this.file.onload = function (e) {
            _this.dispatchEvent(new MF_EVENT.Event('fileloaded', e.target.result));
        };
    }
    MF_VFILE.getInstance = function () {
        if (!MF_VFILE.instance) {
            MF_VFILE.instance = new MF_VFILE();
        }
        return MF_VFILE.instance;
    };
    MF_VFILE.prototype.fileSelect = function (e) {
        var targe = e.target || window.event.srcElement;
        var filedata = this.input.files[0];
        if (!filedata) {
            console.log('没有选择文件');
            this.dispatchEvent(new MF_EVENT.Event('error', 'null'));
            return;
        }
        else {
            this.file.readAsDataURL(filedata);
            console.log('载入VFILE资源');
        }
    };
    MF_VFILE.prototype.loadFile = function () {
        if (document.all) {
            this.input.click();
        }
        else {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            this.input.dispatchEvent(e);
        }
    };
    return MF_VFILE;
})(MF_EVENT.EventDispatcher);
//# sourceMappingURL=vfile.js.map