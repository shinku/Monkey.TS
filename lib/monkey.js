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
        this.file = new FileReader();
        this.file.onload = function (e) {
            _this.dispatchEvent(new MF_EVENT.Event('fileloaded', e.target.result));
            _this.initInput();
        };
        this.initInput();
    }
    MF_VFILE.prototype.initInput = function () {
        var _this = this;
        this.input = null;
        this.input = document.createElement('input');
        this.input.type = 'file';
        this.input.onchange = function (e) {
            _this.fileSelect(e);
        };
    };
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
    MF_VFILE.prototype.loadFile = function (filters) {
        if (filters) {
            this.input.accept = filters;
        }
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
var MF_Point = (function () {
    function MF_Point(x, y, scale, angle, offsetx, offsety, offsetdistance) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (scale === void 0) { scale = 0; }
        if (angle === void 0) { angle = 0; }
        if (offsetx === void 0) { offsetx = 0; }
        if (offsety === void 0) { offsety = 0; }
        if (offsetdistance === void 0) { offsetdistance = 0; }
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.offsetdistance = offsetdistance;
        this.offsetx = offsetx;
        this.offsety = offsety;
    }
    return MF_Point;
})();
var canvasLayerOption = (function () {
    function canvasLayerOption(canvas, img, x, y) {
        var _this = this;
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._img = img;
        this._canvas = canvas;
        this._canvas.addLayer(this);
        this.position = new MF_Point(x, y);
        if (!img.onload) {
            img.onload = function (e) {
                _this.onImgLoaded();
            };
        }
        else {
            this.onImgLoaded();
        }
    }
    Object.defineProperty(canvasLayerOption.prototype, "posx", {
        get: function () {
            return this.position.x;
        },
        set: function (x) {
            this.position.x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(canvasLayerOption.prototype, "posy", {
        get: function () {
            return this.position.y;
        },
        set: function (y) {
            this.position.y = y;
        },
        enumerable: true,
        configurable: true
    });
    canvasLayerOption.prototype.onImgLoaded = function () {
        this._canvas.drawLayer(this);
    };
    Object.defineProperty(canvasLayerOption.prototype, "img", {
        get: function () {
            return this._img;
        },
        enumerable: true,
        configurable: true
    });
    return canvasLayerOption;
})();
var MF_COVERIMG = (function () {
    function MF_COVERIMG() {
    }
    MF_COVERIMG.coverBack90 = function (img, callback) {
        var w = img.width;
        var h = img.height;
        var canvas = document.createElement('canvas');
        canvas.style['width'] = h + "px";
        canvas.style['height'] = w + "px";
        canvas.setAttribute('width', h);
        canvas.setAttribute('height', w);
        var context = canvas.getContext('2d');
        context.translate(h, 0);
        context.rotate(90 / 180 * Math.PI);
        context.drawImage(img, 0, 0, w, h, 0, 0, w, h);
        var tempimg = new Image();
        tempimg.onload = function () {
            canvas = null;
            context = null;
            callback(tempimg);
        };
        tempimg.src = canvas.toDataURL('image/jpg');
    };
    MF_COVERIMG.coverBack180 = function (img, callback) {
        var w = img.width;
        var h = img.height;
        var canvas = document.createElement('canvas');
        canvas.style['width'] = w + "px";
        canvas.style['height'] = h + "px";
        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
        var context = canvas.getContext('2d');
        context.translate(w, h);
        context.rotate(-180 / 180 * Math.PI);
        context.drawImage(img, 0, 0, w, h, 0, 0, w, h);
        var tempimg = new Image();
        tempimg.onload = function () {
            canvas = null;
            context = null;
            callback(tempimg);
        };
        tempimg.src = canvas.toDataURL('image/jpg');
    };
    return MF_COVERIMG;
})();
var MF_Canvas = (function (_super) {
    __extends(MF_Canvas, _super);
    function MF_Canvas() {
        _super.call(this);
        this._scale = 1;
        this.offsetscale = 0;
        this._x = 0;
        this._y = 0;
        this.offsetx = 0;
        this.offsety = 0;
        this._rotate = 0;
        this.offsetrotate = 0;
        this.imgPosition = {};
        this.layers = [];
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
    }
    MF_Canvas.prototype.draw = function (imgdata) {
        this.imgdate = imgdata;
        var self = this;
        EXIF.getData(this.imgdate, function () {
            var exifdata = EXIF.getAllTags(this);
            self.reCoverData(exifdata);
        });
    };
    MF_Canvas.prototype.reCoverData = function (exifdata) {
        var _this = this;
        console.log(exifdata);
        switch (exifdata.Orientation) {
            case 1:
                this.doDraw();
                break;
            case 6:
                MF_COVERIMG.coverBack90(this.imgdate, function (img) { _this.doDraw(img); });
                break;
            case 8:
                this.doDraw();
                break;
            case 3:
                MF_COVERIMG.coverBack180(this.imgdate, function (img) { _this.doDraw(img); });
                break;
            default:
                this.doDraw();
                break;
        }
    };
    MF_Canvas.prototype.doDraw = function (img) {
        if (img)
            this.imgdate = img;
        var imgdata = this.imgdate;
        var w = imgdata.width;
        var h = imgdata.height;
        var cw = this.canvas.width;
        var ch = this.canvas.height;
        this.imgPosition.width = cw;
        this.imgPosition.height = ch;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.save();
        this._x = this._y = this._rotate = 0;
        this._scale = 1;
        if (w / h > cw / ch) {
            this.imgw = cw;
            var sc = cw / w;
            this.imgh = h * sc;
            this.y = (ch - this.imgh) / 2;
        }
        else {
            this.imgh = ch;
            var sc = ch / h;
            this.imgw = w * sc;
            this.x = (cw - this.imgw) / 2;
        }
        ;
        this.dispatchEvent(new MF_EVENT.Event('drawcomplete'));
    };
    MF_Canvas.prototype.update = function () {
        var imgdata = this.imgdate;
        if (!imgdata)
            return;
        var w = imgdata.width;
        var h = imgdata.height;
        var cw = this.canvas.width;
        var ch = this.canvas.height;
        this.clear();
        this.context.globalCompositeOperation = 'copy';
        var offx = this.canvas.width / 2;
        var offy = this.canvas.height / 2;
        this.context.translate(offx, offy);
        this.context.translate(this.x, this.y);
        this.context.rotate(this._rotate / 180 * Math.PI);
        this.context.scale(this._scale, this._scale);
        this.context.translate(-offx, -offy);
        this.context.drawImage(imgdata, 0, 0, w, h, 0, 0, this.imgw, this.imgh);
        this.offsetrotate = this.offsetscale = this.offsetx = this.offsety = 0;
        this.context.restore();
        for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            this.drawLayer(layer);
        }
        ;
    };
    MF_Canvas.prototype.addLayer = function (layer) {
        this.layers.push(layer);
    };
    MF_Canvas.prototype.drawLayer = function (layer) {
        this.context.drawImage(layer.img, 0, 0, layer.img.width, layer.img.height, layer.posx, layer.posy, layer.img.width, layer.img.height);
    };
    MF_Canvas.prototype.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Object.defineProperty(MF_Canvas.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (val) {
            this.offsetscale = val - this._scale;
            this._scale = val;
            this.context.save();
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MF_Canvas.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (val) {
            this.offsetx = val - this._x;
            this.offsetx = val;
            this._x = val;
            this.context.save();
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    MF_Canvas.prototype.roateAnglePosition = function (x, y, angle) {
        x += this.canvas.width / 2;
        y += this.canvas.height / 2;
        var x1 = Math.cos(angle) * x - Math.sin(angle) * y;
        var y1 = Math.cos(angle) * y + Math.sin(angle) * x;
        return { ofx: x1, ofy: y1 };
    };
    Object.defineProperty(MF_Canvas.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (val) {
            this.offsety = val - this._y;
            this.offsety = val;
            this._y = val;
            var offset = this.roateAnglePosition(0, this.offsety / this._scale, -this.rotation / 180 * Math.PI);
            this.context.save();
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MF_Canvas.prototype, "rotation", {
        get: function () {
            return this._rotate;
        },
        set: function (val) {
            this.offsetrotate = (val - this._rotate) / 180 * Math.PI;
            this._rotate = val;
            this.context.save();
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MF_Canvas.prototype, "myCanvas", {
        get: function () {
            return this.canvas;
        },
        enumerable: true,
        configurable: true
    });
    MF_Canvas.prototype.setStyle = function (type, value) {
        this.canvas.style[type] = value;
        if (type == 'width') {
            var ww = parseFloat(value.replace('px', ''));
            this.canvas.width = ww;
        }
        if (type == 'height') {
            var hh = parseFloat(value.replace('px', ''));
            this.canvas.height = hh;
        }
    };
    MF_Canvas.prototype.getCanvasData = function (type, encoderOptions) {
        if (encoderOptions === void 0) { encoderOptions = 1; }
        return this.canvas.toDataURL(type, encoderOptions);
    };
    MF_Canvas.canvasLabs = {};
    return MF_Canvas;
})(MF_EVENT.EventDispatcher);
var MF_UTILS = (function () {
    function MF_UTILS() {
    }
    MF_UTILS.setCookie = function (name, value, time) {
        if (time === void 0) { time = 60000; }
        var time = time || 60000;
        var exp = new Date();
        exp.setTime(exp.getTime() + time);
        document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toUTCString();
    };
    MF_UTILS.getCookie = function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return decodeURI(arr[2]);
        else
            return null;
    };
    MF_UTILS.removeCookie = function (name) {
        MF_UTILS.setCookie(name, '', -1000);
    };
    MF_UTILS.getQuest = function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return r[2];
        }
        return null;
    };
    MF_UTILS.isTel = function (tel) {
        return (/^1[3|4|5|8] \d{9}$/).test(tel);
    };
    MF_UTILS.discribeObject = function (object, bet) {
        if (bet === void 0) { bet = ""; }
        var str = "";
        if (!bet)
            bet = "";
        for (var o in object) {
            str += bet + o + ":";
            if (object[o] instanceof Array) {
                str += "[";
                str += object[o];
                str += "]" + "\n";
            }
            else if (object[o] instanceof Object) {
                var nbet = bet + "  ";
                str += "{\n";
                str += this.discribeObject(object[o], nbet);
                str += nbet + "}" + "\n";
            }
            else {
                str += object[o] + "\n";
            }
        }
        return str;
    };
    MF_UTILS.html_decode = function (str) {
        var s = "";
        if (str.length == 0)
            return "";
        s = str.replace(/&gt;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    };
    MF_UTILS.catact = function (a, b) {
        for (var key in b) {
            if (typeof b[key] == "Object") {
                arguments.callee(a[key], b[key]);
            }
            else {
                a[key] = b[key];
            }
        }
        return a;
    };
    MF_UTILS.getStyleWidth = function (div) {
        var style = div.style['width'];
        return style;
    };
    MF_UTILS.getStyleHeight = function (div) {
        var style = div.style['height'];
        return style;
    };
    MF_UTILS.getStyleTop = function (div) {
        var style = div.style['top'];
        return style;
    };
    MF_UTILS.getStyleLeft = function (div) {
        var style = div.style['left'];
        return style;
    };
    return MF_UTILS;
})();
var MF_ImageScroller = (function (_super) {
    __extends(MF_ImageScroller, _super);
    function MF_ImageScroller(_boxnametag, width, height) {
        var _this = this;
        if (typeof _boxnametag == 'string') {
            this.box = document.getElementById(_boxnametag);
        }
        else if (_boxnametag['tagName']) {
            this.box = _boxnametag;
        }
        this.mf_canvas = new MF_Canvas();
        this.mf_canvas.setStyle('width', width + "px");
        this.mf_canvas.setStyle('height', height + "px");
        this.box.appendChild(this.mf_canvas.myCanvas);
        MF_VFILE.getInstance().addEventListener('fileloaded', function (e) {
            _this.handleFileLoaded(e);
        });
        this.mf_canvas.addEventListener('drawcomplete', function (e) {
            _this.dispatchEvent(new MF_EVENT.Event('drawcomplete'));
        });
        _super.call(this);
    }
    MF_ImageScroller.prototype.addLayer = function (img, x, y) {
        var layer = new canvasLayerOption(this.mf_canvas, img, x, y);
    };
    Object.defineProperty(MF_ImageScroller.prototype, "x", {
        get: function () {
            return this.mf_canvas.x;
        },
        set: function (val) {
            this.mf_canvas.x = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MF_ImageScroller.prototype, "y", {
        get: function () {
            return this.mf_canvas.y;
        },
        set: function (val) {
            this.mf_canvas.y = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MF_ImageScroller.prototype, "scale", {
        get: function () {
            return this.mf_canvas.scale;
        },
        set: function (val) {
            this.mf_canvas.scale = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MF_ImageScroller.prototype, "rotation", {
        get: function () {
            return this.mf_canvas.rotation;
        },
        set: function (val) {
            this.mf_canvas.rotation = val;
        },
        enumerable: true,
        configurable: true
    });
    MF_ImageScroller.prototype.load = function () {
        MF_VFILE.getInstance().loadFile("image/png,image/jpg");
    };
    MF_ImageScroller.prototype.handleImageLoaded = function (e) {
        this.mf_canvas.draw(this.img);
    };
    MF_ImageScroller.prototype.handleFileLoaded = function (e) {
        var _this = this;
        this.img = null;
        this.dispatchEvent(new MF_EVENT.Event('fileloaded', e));
        this.img = new Image();
        this.img.onload = function (e) { _this.handleImageLoaded(e); };
        this.img.src = e.data;
    };
    Object.defineProperty(MF_ImageScroller.prototype, "pngData", {
        get: function () {
            return this.mf_canvas.getCanvasData('image/png');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MF_ImageScroller.prototype, "JpgData", {
        get: function () {
            return this.mf_canvas.getCanvasData('image/jpeg', 60);
        },
        enumerable: true,
        configurable: true
    });
    return MF_ImageScroller;
})(MF_EVENT.EventDispatcher);
var MF_ImageScrollControler = (function (_super) {
    __extends(MF_ImageScrollControler, _super);
    function MF_ImageScrollControler(parenttagname, width, height, useFc) {
        var _this = this;
        if (useFc === void 0) { useFc = true; }
        _super.call(this, parenttagname, width, height);
        if (!useFc)
            return;
        this.fc = new MF_FACETOUCH(this.box);
        this.fc.addEventListener('tapmove', function (e) {
            _this.handleMove(e.data);
        });
        this.fc.addEventListener('taprotate', function (e) {
            _this.handleRotate(e.data);
        });
    }
    MF_ImageScrollControler.prototype.handleMove = function (offset) {
        this.x -= offset.offsetx;
        this.y -= offset.offsety;
    };
    MF_ImageScrollControler.prototype.handleRotate = function (offset) {
        this.scale += offset.scale;
        this.rotation += offset.angle;
    };
    return MF_ImageScrollControler;
})(MF_ImageScroller);
var MF_Loading = (function (_super) {
    __extends(MF_Loading, _super);
    function MF_Loading(p) {
        _super.call(this);
        this._s = this;
        this.list = [];
        this.suclist = [];
        this.set = null;
        this.timers = 30;
        this.length = null;
        this.errorCount = 3;
        this.isLoad = function (e) {
            for (var m = 0; m < this.list.length; m++) {
                if (e && this.list[m].e == e) {
                    return this.list[m];
                }
            }
            return false;
        };
        this.parameter = p;
        this.srcNames = this.parameter.srcNames ? this.parameter.srcNames : "alts";
        this.loadUp = typeof (this.parameter.LDup) === "function" ? this.parameter.LDup : null;
        this.callback = typeof (this.parameter.LDsuccess) === "function" ? this.parameter.LDsuccess : null;
        if (this.parameter.LDpage) {
            this.getDomList(document);
        }
        ;
        if (this.parameter.LDdom) {
            this.addLoadObject(p.LDdom);
        }
        ;
        this.upDate(0);
    }
    MF_Loading.prototype.setDomList = function (domlist, type) {
        var stack = [];
        for (var m = 0; m < domlist.length; m++) {
            var _src = domlist[m].getAttribute(this.srcNames);
            if (_src) {
                stack.push(this.addLDstack({ type: type, src: _src, e: domlist[m] }));
            }
        }
        ;
        return stack;
    };
    ;
    MF_Loading.prototype.setAddList = function (arry) {
        var stack = [];
        for (var n = 0; n < arry.length; n++) {
            stack.push(this.addLDstack(arry[n]));
        }
        ;
        return stack;
    };
    ;
    MF_Loading.prototype.getDomList = function (o) {
        var imglist = o.getElementsByTagName("img");
        var vdlist = o.getElementsByTagName("video");
        var adlist = o.getElementsByTagName("audio");
        var data1 = this.setDomList(imglist, "img");
        var data2 = this.setDomList(vdlist, "video");
        var data3 = this.setDomList(adlist, "audio");
        return data1.concat(data2, data3);
    };
    ;
    MF_Loading.prototype.getJqList = function (o) {
        var data = [];
        var imglist = o.find("img");
        var vdlist = o.find("video");
        var adlist = o.find("audio");
        var data1 = this.setDomList(imglist, "img");
        var data2 = this.setDomList(vdlist, "video");
        var data3 = this.setDomList(adlist, "audio");
        return data1.concat(data2, data3);
    };
    ;
    MF_Loading.prototype.addLoadObject = function (o) {
        if (MF_display_Judger.isDom(o)) {
            if (MF_display_Judger.isLdDom(o)) {
                var type = MF_display_Judger.getDomType(o);
                if (type == "img" || type == "video" || type == "audio") {
                    return this.setDomList([o], type);
                }
            }
            else {
                return this.getDomList(o);
            }
        }
        else if (MF_display_Judger.isJQ(o)) {
            var type = MF_display_Judger.getDomType(o[0]);
            if (type == "img" || type == "video" || type == "audio") {
                return this.setDomList(o, type);
            }
            else {
                return this.getJqList(o);
            }
        }
        else if (typeof o === 'object') {
            if (o.src && o.type) {
                return [this.addLDstack(o)];
            }
            else if (typeof o.sort == 'function') {
                return this.setAddList(o);
            }
        }
    };
    ;
    MF_Loading.prototype.init = function () {
        var s = this;
        for (var m = 0; m < s.list.length; m++) {
            (function () {
                var _this = this;
                var n = m;
                var _LDobj = s.list[m];
                _LDobj.status = 0;
                _LDobj.count = 0;
                if (_LDobj.type == "img") {
                    if (!_LDobj.e) {
                        _LDobj.e = new Image();
                    }
                    ;
                    _LDobj.e.onload = function () {
                        _LDobj.status = 1;
                        s.removeLD(_LDobj);
                    };
                }
                else if (_LDobj.type == "audio" || _LDobj.type == "video") {
                    if (!_LDobj.e) {
                        if (_LDobj.type == "audio") {
                            _LDobj.e = document.createElement("audio");
                        }
                        else {
                            _LDobj.e = document.createElement("video");
                        }
                    }
                    if (!MF_display_Judger.isAndroid || _LDobj.type != "video") {
                        _LDobj.e.addEventListener("canplaythrough", function (e) {
                            _LDobj.status = 1;
                            _this.removeLD(_LDobj);
                        });
                    }
                }
                _LDobj.load = function () {
                    _LDobj.count++;
                    _LDobj.e.src = _LDobj.src;
                    if (_LDobj.type == "video" || _LDobj.type == "audio") {
                        _LDobj.e.load();
                    }
                    ;
                };
                _LDobj.e.onerror = function () {
                    if (_LDobj.count < this.errorCount) {
                        _LDobj.status = 2;
                        _LDobj.load();
                    }
                    else {
                        _LDobj.status = 3;
                        s.removeLD(_LDobj);
                    }
                };
            })();
        }
        ;
    };
    ;
    MF_Loading.prototype.upDate = function (val) {
        if (this.loadUp)
            this.loadUp(val);
        this.loadingpercent = val;
        this.dispatchEvent(new MF_EVENT.Event("update", val));
    };
    ;
    MF_Loading.prototype.start = function () {
        this.init();
        this.length = this.getLength();
        this.loads();
        var speed = 0, s = this, up = function () {
            var LDprogress = parseInt((s.suclist.length / s.length * 100));
            if (LDprogress <= 100) {
                if (s.parameter.LDtween) {
                    speed++;
                }
                else {
                    speed = LDprogress;
                }
                s.upDate(speed);
                if (speed == 100) {
                    clearInterval(s.set);
                    if (s.callback)
                        s.callback();
                    s.dispatchEvent(new MF_EVENT.Event("complete", speed));
                }
            }
            ;
        };
        this.set = setInterval(up, this.timers);
    };
    ;
    MF_Loading.prototype.add = function (o) {
        if (o) {
            return this.addLoadObject(o);
        }
    };
    ;
    MF_Loading.prototype.addLDstack = function (o) {
        var isLD = this.isLoad(o.e);
        if (isLD) {
            return isLD;
        }
        else {
            var length = this.list.push(o);
            return this.list[length - 1];
        }
    };
    ;
    MF_Loading.prototype.addImgSheet = function (arg) {
        var _list = [];
        var mask = arg.mask || "";
        for (var i = arg.start; i <= arg.length; i += arg.step) {
            var findex = mask + i;
            findex = findex.substr(findex.length - mask.length);
            _list.push({ type: "img", src: arg.imgPrefix + findex + "." + arg.imgType });
        }
        ;
        return this.setAddList(_list);
    };
    ;
    MF_Loading.prototype.loads = function () {
        for (var m = 0; m < this.list.length; m++) {
            this.list[m].load();
            if (MF_display_Judger.isAndroid && this.list[m].type == "video") {
                this.list[m].status = 1;
                this.removeLD(this.list[m]);
                m--;
            }
            ;
        }
    };
    ;
    MF_Loading.prototype.getLength = function () {
        return this.list.length;
    };
    ;
    MF_Loading.prototype.removeLD = function (o) {
        var n = 0;
        while (n < this.list.length) {
            if (this.list[n] == o) {
                this.suclist.push(o);
                this.list.splice(n, 1);
                break;
            }
            n++;
        }
        ;
    };
    ;
    return MF_Loading;
})(MF_EVENT.EventDispatcher);
var MF_animateImages = (function (_super) {
    __extends(MF_animateImages, _super);
    function MF_animateImages(p) {
        if (p === void 0) { p = null; }
        _super.call(this);
        this.ITV = null;
        this.startIndex = 0;
        this.progress = 0;
        this.up = null;
        this.rmsPrefix = /^-ms-/;
        this.rdashAlpha = /-([\da-z])/gi;
        this.cssPrefixes = ["Webkit", "O", "Moz", "ms"];
        if (this.parameter.imgList.length > 0) {
            this.width = this.parameter.width ? this.parameter.width : this.parameter.imgList[0].width;
            this.height = this.parameter.height ? this.parameter.height : this.parameter.imgList[0].height;
        }
        if (MF_display_Judger.isDom(this.parameter.parents))
            this.parents = this.parameter.parents;
        else if (MF_display_Judger.isJQ(this.parameter.parents))
            this.parents = this.parameter.parents[0];
        this.anmtList = this.parameter.imgList;
        this.type = this.parameter.type ? this.parameter.type : "canvas";
        this.step = this.parameter.step || 1;
        this.times = this.parameter.times || 100;
        this.loop = this.parameter.loop || false;
    }
    MF_animateImages.prototype.drawImages = function (n) { };
    ;
    MF_animateImages.prototype.clear = function () { };
    ;
    MF_animateImages.prototype.getPosition = function (n) { };
    ;
    MF_animateImages.prototype.fcamelCase = function (all, letter) {
        return letter.toUpperCase();
    };
    ;
    MF_animateImages.prototype.camelCase = function (str) {
        return str.replace(this.rmsPrefix, "ms-").replace(this.rdashAlpha, this.fcamelCase);
    };
    MF_animateImages.prototype.vendorPropName = function (style, name) {
        if (name in style) {
            return name;
        }
        var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = this.cssPrefixes.length;
        while (i--) {
            name = this.cssPrefixes[i] + capName;
            if (name in style) {
                return name;
            }
        }
        return origName;
    };
    MF_animateImages.prototype.setOp = function (o, _v) {
        if (o.runtimeStyle) {
            if (typeof o.runtimeStyle["opacity"] === "undefined") {
                o.style.filter = "alpha(opacity=" + _v * 100 + ")";
            }
            else {
                o.runtimeStyle["opacity"] = _v;
            }
        }
        else {
            o.style["opacity"] = _v;
        }
    };
    ;
    MF_animateImages.prototype.toProgress = function (n) {
        this.progress = n;
        this.drawImages(n);
    };
    ;
    MF_animateImages.prototype.setStart = function (n) {
        this.startIndex = n;
        this.toProgress(n);
    };
    ;
    MF_animateImages.prototype.setEnd = function (n) {
        if (n > this.length)
            this.endIndex = this.length;
        else
            this.endIndex = n;
    };
    ;
    MF_animateImages.prototype.play = function () {
        var self = this;
        self.ITV = setInterval(function () {
            self.progress += self.step;
            if (self.progress >= self.endIndex)
                if (self.loop)
                    self.progress = self.startIndex;
                else {
                    self.stop();
                    self.dispatchEvent(new MF_EVENT.Event("complete", self.progress));
                    return;
                }
            self.toProgress(self.progress);
            self.dispatchEvent(new MF_EVENT.Event("update", self.progress));
            self.dispatchEvent(new MF_EVENT.Event(self.progress, self.progress));
        }, self.times);
    };
    ;
    MF_animateImages.prototype.stopActivity = function () {
        if (this.ITV) {
            clearInterval(this.ITV);
            this.ITV = null;
        }
    };
    ;
    MF_animateImages.prototype.pause = function () {
        this.stopActivity();
    };
    ;
    MF_animateImages.prototype.stop = function () {
        this.stopActivity();
        this.progress = this.startIndex;
    };
    ;
    MF_animateImages.prototype.creatElment = function (name) {
        return document.createElement(name);
    };
    MF_animateImages.prototype.setCssObj = function (o, jsons) {
        for (name in jsons) {
            this.css(o, name, jsons[name]);
        }
    };
    ;
    MF_animateImages.prototype.css = function (obj, _s, _v) {
        if (typeof _s === "undefined" || !_s)
            return false;
        if (typeof _s === "object") {
            this.setCssObj(obj, _s);
            return false;
        }
        ;
        var origName = this.camelCase(_s);
        var style = obj.style;
        var name = this.vendorPropName(style, origName);
        if (name == "opacity") {
            this.setOp(obj, _v);
            return;
        }
        if (typeof _v === "undefined") {
            if (obj.style[name] != "") {
                return obj.style[name];
            }
            else if (window.getComputedStyle) {
                return window.getComputedStyle(obj, null)[name];
            }
            else if (obj.currentStyle) {
                return obj.currentStyle[name];
            }
            else {
                return "auto";
            }
        }
        else {
            if (obj.runtimeStyle) {
                obj.runtimeStyle[name] = _v;
            }
            else {
                obj.style[name] = _v;
            }
        }
    };
    MF_animateImages.prototype.remove = function () {
        while (this.parents.hasChildNodes()) {
            this.parents.removeChild(this.parents.firstChild);
        }
    };
    ;
    return MF_animateImages;
})(MF_EVENT.EventDispatcher);
var MF_display_Judger = (function () {
    function MF_display_Judger() {
    }
    ;
    MF_display_Judger.isAndroid = function () { return /(Android)/i.test(navigator.userAgent); };
    ;
    MF_display_Judger.isDom = function (e) {
        if (typeof (e) == "object" && e instanceof HTMLElement) {
            return true;
        }
        return false;
    };
    ;
    MF_display_Judger.isJQ = function (e) {
        if (typeof (e) == "object" && e instanceof jQuery) {
            return true;
        }
        return false;
    };
    ;
    MF_display_Judger.isLdDom = function (e) {
        if (typeof (e) == "object" && e instanceof HTMLElement) {
            var type = e.nodeName.toLowerCase();
            if (type == "img" || type == "video" || type == "audio") {
                return true;
            }
        }
        return false;
    };
    ;
    MF_display_Judger.isLdCompleteList = function (e) {
        if (typeof (e) == "object" && "sort" in e) {
            var _obj = e[0];
            if ("src" in _obj && "e" in _obj) {
                return true;
            }
        }
        return false;
    };
    ;
    MF_display_Judger.getDomType = function (e) {
        return e.nodeName.toLowerCase();
    };
    ;
    MF_display_Judger.getImgList = function (_list) {
        var _imgList = new Array();
        for (var vals in _list) {
            var _obj = _list[vals];
            if ("src" in _obj && "e" in _obj)
                _imgList.push(_obj.e);
        }
        return _imgList;
    };
    ;
    return MF_display_Judger;
})();
var MF_animateSheet = (function (_super) {
    __extends(MF_animateSheet, _super);
    function MF_animateSheet(p) {
        this.parameter = p;
        if (MF_display_Judger.isLdCompleteList(this.parameter.imgList)) {
            this.parameter.imgList = MF_display_Judger.getImgList(this.parameter.imgList);
        }
        else {
            this.parameter.imgList = [];
        }
        _super.call(this, this.parameter);
        this.length = this.parameter.imgList.length;
        if (this.type == "canvas") {
            this.canvas = this.creatElment("canvas");
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.parents.appendChild(this.canvas);
        }
        else if (this.type == "img") {
        }
        this.endIndex = this.length;
        this.toProgress(this.progress);
    }
    ;
    MF_animateSheet.prototype.drawImages = function (n) {
        switch (this.type) {
            case 'img':
                this.clear();
                this.parents.appendChild(this.anmtList[n]);
                break;
            case 'canvas':
                var ctx = this.canvas.getContext("2d");
                this.clear();
                var img = this.anmtList[n];
                ctx.drawImage(img, 0, 0);
                break;
        }
    };
    ;
    MF_animateSheet.prototype.clear = function () {
        switch (this.type) {
            case 'img':
                while (this.parents.hasChildNodes()) {
                    this.parents.removeChild(this.parents.firstChild);
                }
                break;
            case 'canvas':
                var ctx = this.canvas.getContext("2d");
                ctx.clearRect(0, 0, this.width, this.height);
                break;
        }
    };
    return MF_animateSheet;
})(MF_animateImages);
var MF_animateSprite = (function (_super) {
    __extends(MF_animateSprite, _super);
    function MF_animateSprite(p) {
        this.parameter = p;
        if (MF_display_Judger.isDom(this.parameter.imgList)) {
            this.parameter.imgList = [this.parameter.imgList];
        }
        else if (MF_display_Judger.isLdCompleteList(this.parameter.imgList)) {
            this.parameter.imgList = MF_display_Judger.getImgList(this.parameter.imgList);
        }
        else if (!MF_display_Judger.isJQ(this.parameter.imgList)) {
            this.parameter.imgList = [];
        }
        _super.call(this, p);
        this.length = this.parameter.row * this.parameter.column;
        var _img = this.anmtList[0];
        this.getPosition = function (n) {
            return {
                x: -(n % this.parameter.column * this.width),
                y: -(parseInt((n / this.parameter.column)) * this.height)
            };
        };
        if (this.type == "canvas") {
            this.remove();
            this.canvas = this.creatElment("canvas");
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.parents.appendChild(this.canvas);
            var ctx = this.canvas.getContext("2d");
            var imgW = _img.width;
            var imgH = _img.height;
            this.drawImages = function (n) {
                this.clear();
                var _position = this.getPosition(n);
                ctx.drawImage(_img, _position.x, _position.y, imgW, imgH);
            };
            this.clear = function () {
                ctx.clearRect(0, 0, this.width, this.height);
            };
        }
        else if (this.type == "img") {
            var box = this.creatElment("div");
            this.css(box, { position: "absolute", top: 0, left: 0, width: this.width + "px", height: this.height + "px", overflow: "hidden" }, null);
            this.parents.appendChild(box);
            box.appendChild(_img);
            this.css(_img, { position: "absolute", top: 0, left: 0 }, null);
            this.drawImages = function (n) {
                var _position = this.getPosition(n);
                this.css(_img, { top: _position.y + "px", left: _position.x + "px" }, null);
            };
            this.clear = function () {
                while (this.parents.hasChildNodes()) {
                    this.parents.removeChild(this.parents.firstChild);
                }
            };
        }
        this.endIndex = this.length;
        this.toProgress(this.progress);
    }
    return MF_animateSprite;
})(MF_animateImages);
var MF_DoAjax = (function (_super) {
    __extends(MF_DoAjax, _super);
    function MF_DoAjax() {
        _super.apply(this, arguments);
        this.defaultsOpts = {
            type: 'POST',
            async: true,
            url: "",
            dataStringify: false,
            data: null,
            dataType: "json",
            successDecode: false,
            success: function () { },
            error: function () {
                alert('网络不给力，再试下吧！');
            },
            complete: function () { }
        };
    }
    MF_DoAjax.prototype.initDefaultsOpts = function (opts) {
        this.defaultsOpts = MF_UTILS.catact(this.defaultsOpts, opts);
    };
    MF_DoAjax.prototype.DoAjax = function (typeName, opts, fn) {
        var _this = this;
        if (fn === void 0) { fn = null; }
        opts = MF_UTILS.catact(this.defaultsOpts, opts);
        if (opts.data) {
            if (opts.dataStringify == true) {
                opts.data = JSON.stringify(opts.data);
            }
        }
        if (opts.dataType == "jsonp") {
            var _script = document.createElement("script");
            var _url = opts.url;
            var callBackName = (opts.jsonp && opts.jsonp != "") ? opts.jsonp : "jsonpCallback";
            var postData = opts.data || {};
            postData = (function (obj) {
                var str = "";
                for (var prop in obj) {
                    str += (str.length > 0 ? "&" : "") + prop + "=" + obj[prop];
                }
                return str;
            })(postData);
            if (_url.indexOf("?") === -1) {
                _url += "?jsonp=" + callBackName + (postData.length > 0 ? "&" + postData : "");
            }
            else {
                _url += "&jsonp=" + callBackName + (postData.length > 0 ? "&" + postData : "");
            }
            _script.src = _url;
            _script.type = "text/javascript";
            document.body.appendChild(_script);
        }
        else {
            this.ajax({
                type: opts.type,
                async: opts.async,
                url: opts.url,
                data: opts.data,
                dataType: opts.dataType,
                success: function (opts, d) { _this.handleSucc(opts, d, typeName); },
                error: opts.error,
                complete: opts.complete
            });
        }
    };
    MF_DoAjax.prototype.ajax = function (defaultOpts) {
        var postData = defaultOpts.data || "";
        var async = defaultOpts.async;
        postData = (function (obj) {
            var str = "";
            for (var prop in obj) {
                str += (str.length > 0 ? "&" : "") + prop + "=" + obj[prop];
            }
            return str;
        })(postData);
        var xhr = new XMLHttpRequest();
        xhr.open(defaultOpts.type, defaultOpts.url, async);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            var XMLHttpReq = xhr;
            if (XMLHttpReq.readyState == 4) {
                if (XMLHttpReq.status == 200) {
                    var text = XMLHttpReq.responseText;
                    var msg = "";
                    switch (defaultOpts.dataType) {
                        case "text":
                            msg = text;
                            break;
                        case "json":
                            msg = JSON.parse(text);
                            break;
                        default:
                            msg = JSON.parse(text);
                            break;
                    }
                    defaultOpts.success(defaultOpts, msg);
                }
                else {
                    defaultOpts.error(XMLHttpReq);
                }
                defaultOpts.complete();
            }
        };
        xhr.send(postData);
    };
    MF_DoAjax.prototype.handleSucc = function (opts, d, typename) {
        var e = new MF_EVENT.Event('mf_dataloaded');
        if (opts.successDecode && d.Data && d.Data != '') {
            d.Data = eval('[' + MF_UTILS.html_decode(d.Data) + ']')[0];
        }
        e.data = { data: d, tname: typename };
        this.dispatchEvent(e);
    };
    return MF_DoAjax;
})(MF_EVENT.EventDispatcher);
var MF_JsonpManager = (function () {
    function MF_JsonpManager() {
        this.jsonpfuncstions = {};
    }
    return MF_JsonpManager;
})();
var MF_NET = (function () {
    function MF_NET() {
    }
    MF_NET.reg = function (name, data) {
        MF_NET.appUrlConfig[name] = data;
        MF_NET.GET_IN()[name] = MF_NET.appUrlConfig[name];
    };
    MF_NET.GET_IN = function () {
        if (!MF_NET._instance) {
            MF_NET._instance = new MF_NET();
        }
        return MF_NET._instance;
    };
    MF_NET.appUrlConfig = {};
    return MF_NET;
})();
var MF_PackInterface = (function (_super) {
    __extends(MF_PackInterface, _super);
    function MF_PackInterface(EVENT_OBJ) {
        _super.call(this);
        this.ajaxer = new MF_DoAjax();
        this.EVENT_OBJ = EVENT_OBJ || MF_NET.GET_IN();
        this.init();
    }
    MF_PackInterface.prototype.init = function () {
        var _this = this;
        this.ajaxer.addEventListener('mf_dataloaded', function (e) { _this.handleLoaded(e); });
    };
    MF_PackInterface.prototype.handleLoaded = function (e) {
        this.runEvent(e.data.tname, e.data.data);
    };
    MF_PackInterface.prototype.callInterface = function (typeName, data) {
        if (this.EVENT_OBJ[typeName].url && this.EVENT_OBJ[typeName].url.length > 0) {
            this.EVENT_OBJ[typeName].data = data || {};
            this.ajaxer.DoAjax(typeName, this.EVENT_OBJ[typeName]);
        }
        else {
            this.runEvent(typeName, data || {});
        }
    };
    MF_PackInterface.prototype.runEvent = function (typeName, Data) {
        this.dispatchEvent(new MF_EVENT.Event(typeName, Data));
    };
    MF_PackInterface.prototype.initDefaultsOpts = function (opts) {
        this.ajaxer.initDefaultsOpts(opts);
    };
    return MF_PackInterface;
})(MF_EVENT.EventDispatcher);
(function () {
    var debug = false;
    var root = this;
    var EXIF = function (obj) {
        if (obj instanceof EXIF)
            return obj;
        if (!(this instanceof EXIF))
            return new EXIF(obj);
        this.EXIFwrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EXIF;
        }
        exports.EXIF = EXIF;
    }
    else {
        root.EXIF = EXIF;
    }
    var ExifTags = EXIF.Tags = {
        0x9000: "ExifVersion",
        0xA000: "FlashpixVersion",
        0xA001: "ColorSpace",
        0xA002: "PixelXDimension",
        0xA003: "PixelYDimension",
        0x9101: "ComponentsConfiguration",
        0x9102: "CompressedBitsPerPixel",
        0x927C: "MakerNote",
        0x9286: "UserComment",
        0xA004: "RelatedSoundFile",
        0x9003: "DateTimeOriginal",
        0x9004: "DateTimeDigitized",
        0x9290: "SubsecTime",
        0x9291: "SubsecTimeOriginal",
        0x9292: "SubsecTimeDigitized",
        0x829A: "ExposureTime",
        0x829D: "FNumber",
        0x8822: "ExposureProgram",
        0x8824: "SpectralSensitivity",
        0x8827: "ISOSpeedRatings",
        0x8828: "OECF",
        0x9201: "ShutterSpeedValue",
        0x9202: "ApertureValue",
        0x9203: "BrightnessValue",
        0x9204: "ExposureBias",
        0x9205: "MaxApertureValue",
        0x9206: "SubjectDistance",
        0x9207: "MeteringMode",
        0x9208: "LightSource",
        0x9209: "Flash",
        0x9214: "SubjectArea",
        0x920A: "FocalLength",
        0xA20B: "FlashEnergy",
        0xA20C: "SpatialFrequencyResponse",
        0xA20E: "FocalPlaneXResolution",
        0xA20F: "FocalPlaneYResolution",
        0xA210: "FocalPlaneResolutionUnit",
        0xA214: "SubjectLocation",
        0xA215: "ExposureIndex",
        0xA217: "SensingMethod",
        0xA300: "FileSource",
        0xA301: "SceneType",
        0xA302: "CFAPattern",
        0xA401: "CustomRendered",
        0xA402: "ExposureMode",
        0xA403: "WhiteBalance",
        0xA404: "DigitalZoomRation",
        0xA405: "FocalLengthIn35mmFilm",
        0xA406: "SceneCaptureType",
        0xA407: "GainControl",
        0xA408: "Contrast",
        0xA409: "Saturation",
        0xA40A: "Sharpness",
        0xA40B: "DeviceSettingDescription",
        0xA40C: "SubjectDistanceRange",
        0xA005: "InteroperabilityIFDPointer",
        0xA420: "ImageUniqueID"
    };
    var TiffTags = EXIF.TiffTags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x8769: "ExifIFDPointer",
        0x8825: "GPSInfoIFDPointer",
        0xA005: "InteroperabilityIFDPointer",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x011C: "PlanarConfiguration",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x0128: "ResolutionUnit",
        0x0111: "StripOffsets",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x0201: "JPEGInterchangeFormat",
        0x0202: "JPEGInterchangeFormatLength",
        0x012D: "TransferFunction",
        0x013E: "WhitePoint",
        0x013F: "PrimaryChromaticities",
        0x0211: "YCbCrCoefficients",
        0x0214: "ReferenceBlackWhite",
        0x0132: "DateTime",
        0x010E: "ImageDescription",
        0x010F: "Make",
        0x0110: "Model",
        0x0131: "Software",
        0x013B: "Artist",
        0x8298: "Copyright"
    };
    var GPSTags = EXIF.GPSTags = {
        0x0000: "GPSVersionID",
        0x0001: "GPSLatitudeRef",
        0x0002: "GPSLatitude",
        0x0003: "GPSLongitudeRef",
        0x0004: "GPSLongitude",
        0x0005: "GPSAltitudeRef",
        0x0006: "GPSAltitude",
        0x0007: "GPSTimeStamp",
        0x0008: "GPSSatellites",
        0x0009: "GPSStatus",
        0x000A: "GPSMeasureMode",
        0x000B: "GPSDOP",
        0x000C: "GPSSpeedRef",
        0x000D: "GPSSpeed",
        0x000E: "GPSTrackRef",
        0x000F: "GPSTrack",
        0x0010: "GPSImgDirectionRef",
        0x0011: "GPSImgDirection",
        0x0012: "GPSMapDatum",
        0x0013: "GPSDestLatitudeRef",
        0x0014: "GPSDestLatitude",
        0x0015: "GPSDestLongitudeRef",
        0x0016: "GPSDestLongitude",
        0x0017: "GPSDestBearingRef",
        0x0018: "GPSDestBearing",
        0x0019: "GPSDestDistanceRef",
        0x001A: "GPSDestDistance",
        0x001B: "GPSProcessingMethod",
        0x001C: "GPSAreaInformation",
        0x001D: "GPSDateStamp",
        0x001E: "GPSDifferential"
    };
    var StringValues = EXIF.StringValues = {
        ExposureProgram: {
            0: "Not defined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode"
        },
        MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
        },
        LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
        },
        Flash: {
            0x0000: "Flash did not fire",
            0x0001: "Flash fired",
            0x0005: "Strobe return light not detected",
            0x0007: "Strobe return light detected",
            0x0009: "Flash fired, compulsory flash mode",
            0x000D: "Flash fired, compulsory flash mode, return light not detected",
            0x000F: "Flash fired, compulsory flash mode, return light detected",
            0x0010: "Flash did not fire, compulsory flash mode",
            0x0018: "Flash did not fire, auto mode",
            0x0019: "Flash fired, auto mode",
            0x001D: "Flash fired, auto mode, return light not detected",
            0x001F: "Flash fired, auto mode, return light detected",
            0x0020: "No flash function",
            0x0041: "Flash fired, red-eye reduction mode",
            0x0045: "Flash fired, red-eye reduction mode, return light not detected",
            0x0047: "Flash fired, red-eye reduction mode, return light detected",
            0x0049: "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059: "Flash fired, auto mode, red-eye reduction mode",
            0x005D: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
            1: "Not defined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor"
        },
        SceneCaptureType: {
            0: "Standard",
            1: "Landscape",
            2: "Portrait",
            3: "Night scene"
        },
        SceneType: {
            1: "Directly photographed"
        },
        CustomRendered: {
            0: "Normal process",
            1: "Custom process"
        },
        WhiteBalance: {
            0: "Auto white balance",
            1: "Manual white balance"
        },
        GainControl: {
            0: "None",
            1: "Low gain up",
            2: "High gain up",
            3: "Low gain down",
            4: "High gain down"
        },
        Contrast: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        Saturation: {
            0: "Normal",
            1: "Low saturation",
            2: "High saturation"
        },
        Sharpness: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        SubjectDistanceRange: {
            0: "Unknown",
            1: "Macro",
            2: "Close view",
            3: "Distant view"
        },
        FileSource: {
            3: "DSC"
        },
        Components: {
            0: "",
            1: "Y",
            2: "Cb",
            3: "Cr",
            4: "R",
            5: "G",
            6: "B"
        }
    };
    function addEvent(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }
    function imageHasData(img) {
        return !!(img.exifdata);
    }
    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || '';
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }
    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function (e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }
    function getImageData(img, callback) {
        function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            var iptcdata = findIPTCinJPEG(binFile);
            img.exifdata = data || {};
            img.iptcdata = iptcdata || {};
            if (callback) {
                callback.call(img);
            }
        }
        if (img.src) {
            if (/^data\:/i.test(img.src)) {
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);
            }
            else if (/^blob\:/i.test(img.src)) {
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    handleBinaryFile(e.target.result);
                };
                objectURLToBlob(img.src, function (blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            }
            else {
                var http = new XMLHttpRequest();
                http.onload = function () {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    }
                    else {
                        throw "Could not load image";
                    }
                    http = null;
                };
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        }
        else if (window.FileReader && (img instanceof window.Blob || img instanceof window.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                if (debug)
                    console.log("Got file of length " + e.target.result.byteLength);
                handleBinaryFile(e.target.result);
            };
            fileReader.readAsArrayBuffer(img);
        }
    }
    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);
        if (debug)
            console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug)
                console.log("Not a valid JPEG");
            return false;
        }
        var offset = 2, length = file.byteLength, marker;
        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                if (debug)
                    console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
                return false;
            }
            marker = dataView.getUint8(offset + 1);
            if (debug)
                console.log(marker);
            if (marker == 225) {
                if (debug)
                    console.log("Found 0xFFE1 marker");
                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);
            }
            else {
                offset += 2 + dataView.getUint16(offset + 2);
            }
        }
    }
    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);
        if (debug)
            console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug)
                console.log("Not a valid JPEG");
            return false;
        }
        var offset = 2, length = file.byteLength;
        var isFieldSegmentStart = function (dataView, offset) {
            return (dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset + 1) === 0x42 &&
                dataView.getUint8(offset + 2) === 0x49 &&
                dataView.getUint8(offset + 3) === 0x4D &&
                dataView.getUint8(offset + 4) === 0x04 &&
                dataView.getUint8(offset + 5) === 0x04);
        };
        while (offset < length) {
            if (isFieldSegmentStart(dataView, offset)) {
                var nameHeaderLength = dataView.getUint8(offset + 7);
                if (nameHeaderLength % 2 !== 0)
                    nameHeaderLength += 1;
                if (nameHeaderLength === 0) {
                    nameHeaderLength = 4;
                }
                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);
                return readIPTCData(file, startOffset, sectionLength);
                break;
            }
            offset++;
        }
    }
    var IptcFieldMap = {
        0x78: 'caption',
        0x6E: 'credit',
        0x19: 'keywords',
        0x37: 'dateCreated',
        0x50: 'byline',
        0x55: 'bylineTitle',
        0x7A: 'captionWriter',
        0x69: 'headline',
        0x74: 'copyright',
        0x0F: 'category'
    };
    function readIPTCData(file, startOffset, sectionLength) {
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while (segmentStartPos < startOffset + sectionLength) {
            if (dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos + 1) === 0x02) {
                segmentType = dataView.getUint8(segmentStartPos + 2);
                if (segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos + 3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos + 5, dataSize);
                    if (data.hasOwnProperty(fieldName)) {
                        if (data[fieldName] instanceof Array) {
                            data[fieldName].push(fieldValue);
                        }
                        else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    }
                    else {
                        data[fieldName] = fieldValue;
                    }
                }
            }
            segmentStartPos++;
        }
        return data;
    }
    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd), tags = {}, entryOffset, tag, i;
        for (i = 0; i < entries; i++) {
            entryOffset = dirStart + i * 12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug)
                console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }
    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset + 2, !bigEnd), numValues = file.getUint32(entryOffset + 4, !bigEnd), valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart, offset, vals, val, n, numerator, denominator;
        switch (type) {
            case 1:
            case 7:
                if (numValues == 1) {
                    return file.getUint8(entryOffset + 8, !bigEnd);
                }
                else {
                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = file.getUint8(offset + n);
                    }
                    return vals;
                }
            case 2:
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return getStringFromDB(file, offset, numValues - 1);
            case 3:
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                }
                else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = file.getUint16(offset + 2 * n, !bigEnd);
                    }
                    return vals;
                }
            case 4:
                if (numValues == 1) {
                    return file.getUint32(entryOffset + 8, !bigEnd);
                }
                else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = file.getUint32(valueOffset + 4 * n, !bigEnd);
                    }
                    return vals;
                }
            case 5:
                if (numValues == 1) {
                    numerator = file.getUint32(valueOffset, !bigEnd);
                    denominator = file.getUint32(valueOffset + 4, !bigEnd);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                }
                else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        numerator = file.getUint32(valueOffset + 8 * n, !bigEnd);
                        denominator = file.getUint32(valueOffset + 4 + 8 * n, !bigEnd);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }
            case 9:
                if (numValues == 1) {
                    return file.getInt32(entryOffset + 8, !bigEnd);
                }
                else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = file.getInt32(valueOffset + 4 * n, !bigEnd);
                    }
                    return vals;
                }
            case 10:
                if (numValues == 1) {
                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset + 4, !bigEnd);
                }
                else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = file.getInt32(valueOffset + 8 * n, !bigEnd) / file.getInt32(valueOffset + 4 + 8 * n, !bigEnd);
                    }
                    return vals;
                }
        }
    }
    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (n = start; n < start + length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }
    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug)
                console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
        }
        var bigEnd, tags, tag, exifData, gpsData, tiffOffset = start + 6;
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        }
        else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        }
        else {
            if (debug)
                console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
        }
        if (file.getUint16(tiffOffset + 2, !bigEnd) != 0x002A) {
            if (debug)
                console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }
        var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);
        if (firstIFDOffset < 0x00000008) {
            if (debug)
                console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset + 4, !bigEnd));
            return false;
        }
        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);
        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                    case "LightSource":
                    case "Flash":
                    case "MeteringMode":
                    case "ExposureProgram":
                    case "SensingMethod":
                    case "SceneCaptureType":
                    case "SceneType":
                    case "CustomRendered":
                    case "WhiteBalance":
                    case "GainControl":
                    case "Contrast":
                    case "Saturation":
                    case "Sharpness":
                    case "SubjectDistanceRange":
                    case "FileSource":
                        exifData[tag] = StringValues[tag][exifData[tag]];
                        break;
                    case "ExifVersion":
                    case "FlashpixVersion":
                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                        break;
                    case "ComponentsConfiguration":
                        exifData[tag] =
                            StringValues.Components[exifData[tag][0]] +
                                StringValues.Components[exifData[tag][1]] +
                                StringValues.Components[exifData[tag][2]] +
                                StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }
        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                    case "GPSVersionID":
                        gpsData[tag] = gpsData[tag][0] +
                            "." + gpsData[tag][1] +
                            "." + gpsData[tag][2] +
                            "." + gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }
        return tags;
    }
    EXIF.getData = function (img, callback) {
        if ((img instanceof Image || img instanceof HTMLImageElement) && !img.complete)
            return false;
        if (!imageHasData(img)) {
            getImageData(img, callback);
        }
        else {
            if (callback) {
                callback.call(img);
            }
        }
        return true;
    };
    EXIF.getTag = function (img, tag) {
        if (!imageHasData(img))
            return;
        return img.exifdata[tag];
    };
    EXIF.getAllTags = function (img) {
        if (!imageHasData(img))
            return {};
        var a, data = img.exifdata, tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    };
    EXIF.pretty = function (img) {
        if (!imageHasData(img))
            return "";
        var a, data = img.exifdata, strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a] instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    }
                    else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                }
                else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    };
    EXIF.readFromBinaryFile = function (file) {
        return findEXIFinJPEG(file);
    };
    if (typeof define === 'function' && define.amd) {
        define('exif-js', [], function () {
            return EXIF;
        });
    }
}.call(this));
var MF_DEVICECENTER = (function () {
    function MF_DEVICECENTER() {
    }
    MF_DEVICECENTER.check = function () {
        var deviceinfo = navigator.userAgent.toLowerCase();
        if (deviceinfo.match(/ipad/)) {
            console.log('this is ipad');
        }
        else if (deviceinfo.match(/iphone/)) {
            console.log('this is iphone');
        }
        else if (deviceinfo.match(/android/)) {
            console.log('this is android');
        }
        else if (deviceinfo.match(/windows phone/) || deviceinfo.match(/windows mobile/)) {
            MF_DEVICECENTER.TOUCH_START = 'mousedown';
            MF_DEVICECENTER.TOUCH_MOVE = 'mousemove';
            MF_DEVICECENTER.TOUCH_END = 'mouseup';
        }
        else {
            MF_DEVICECENTER.TOUCH_START = 'mousedown';
            MF_DEVICECENTER.TOUCH_MOVE = 'mousemove';
            MF_DEVICECENTER.TOUCH_END = 'mouseup';
        }
        ;
        MF_DEVICECENTER.isChecked = true;
    };
    Object.defineProperty(MF_DEVICECENTER, "TOUCH_START", {
        get: function () {
            if (!MF_DEVICECENTER.isChecked)
                MF_DEVICECENTER.check();
            return MF_DEVICECENTER._TOUCH_START;
        },
        set: function (val) {
            MF_DEVICECENTER._TOUCH_START = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MF_DEVICECENTER, "TOUCH_MOVE", {
        get: function () {
            if (!MF_DEVICECENTER.isChecked)
                MF_DEVICECENTER.check();
            return MF_DEVICECENTER._TOUCH_MOVE;
        },
        set: function (val) {
            MF_DEVICECENTER._TOUCH_MOVE = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MF_DEVICECENTER, "TOUCH_END", {
        get: function () {
            if (!MF_DEVICECENTER.isChecked)
                MF_DEVICECENTER.check();
            return MF_DEVICECENTER._TOUCH_END;
        },
        set: function (val) {
            MF_DEVICECENTER._TOUCH_END = val;
        },
        enumerable: true,
        configurable: true
    });
    MF_DEVICECENTER._TOUCH_START = 'touchstart';
    MF_DEVICECENTER._TOUCH_MOVE = 'touchmove';
    MF_DEVICECENTER._TOUCH_END = 'touchend';
    MF_DEVICECENTER._DEVICE_TYPE = 'mobile';
    MF_DEVICECENTER.isChecked = false;
    return MF_DEVICECENTER;
})();
var MF_FACETOUCH = (function (_super) {
    __extends(MF_FACETOUCH, _super);
    function MF_FACETOUCH(targetname) {
        _super.call(this);
        this.element = null;
        this.isTouch = false;
        this.touchpoints = new Array();
        this.name = 'shin';
        this.initdis = 0;
        this.initrotation = 0;
        this.pointsnumber = 0;
        this.lastdis = 0;
        this.lastrotation = 0;
        this.element = document.getElementById(targetname) || targetname || document.body;
        this.initEvent();
    }
    ;
    MF_FACETOUCH.prototype.initEvent = function () {
        var _this = this;
        this.element.addEventListener(MF_DEVICECENTER.TOUCH_START, function (e) { _this.handleTouchBegin(e); });
        this.element.addEventListener(MF_DEVICECENTER.TOUCH_MOVE, function (e) { _this.handleTouchMove(e); });
        this.element.addEventListener(MF_DEVICECENTER.TOUCH_END, function (e) { _this.handleTouchEnd(e); });
        var element = this.element;
        document.addEventListener(MF_DEVICECENTER.TOUCH_END, function () {
            element.removeEventListener(MF_DEVICECENTER.TOUCH_MOVE, this.handleTouchMove);
        });
    };
    ;
    MF_FACETOUCH.prototype.handleTouchBegin = function (e) {
        e.preventDefault();
        this.isTouch = true;
        var str = '';
        for (var o in e) {
            str += o + "=" + e[o] + "\n";
        }
        if (e.targetTouches) {
            var touchnum = e.targetTouches.length;
            this.pointsnumber++;
            switch (touchnum) {
                case 1:
                    this.lastp = this.touchpoints = [
                        new MF_Point(e.targetTouches[0].pageX, e.targetTouches[0].pageY)
                    ];
                    break;
                case 2:
                    this.touchpoints = [
                        new MF_Point(e.targetTouches[0].pageX, e.targetTouches[0].pageY),
                        new MF_Point(e.targetTouches[1].pageX, e.targetTouches[1].pageY)
                    ];
                    this.initdis = this.caculatepointsDistance(this.touchpoints[0], this.touchpoints[1]).offsetdistance;
                    this.initrotation = this.caculatepointsDistance(this.touchpoints[0], this.touchpoints[1]).angle / Math.PI * 180;
                    break;
            }
            ;
            this.element.addEventListener('touchmove', this.handleTouchMove);
        }
        else {
            this.touchpoints = this.lastp = [new MF_Point(e.pageX, e.pageY)];
            ;
            this.element.addEventListener(MF_DEVICECENTER.TOUCH_MOVE, this.handleTouchMove);
        }
    };
    ;
    MF_FACETOUCH.prototype.handleTouchMove = function (e) {
        if (this.isTouch) {
            var newtouchs;
            if (e.targetTouches) {
                var touchnum = e.targetTouches.length;
                switch (touchnum) {
                    case 1:
                        newtouchs = [new MF_Point(e.targetTouches[0].pageX, e.targetTouches[0].pageY)];
                        this.handleTouchesByOnePoint(newtouchs, this.touchpoints);
                        break;
                    case 2:
                        newtouchs = [
                            new MF_Point(e.targetTouches[0].pageX, e.targetTouches[0].pageY),
                            new MF_Point(e.targetTouches[1].pageX, e.targetTouches[1].pageY)];
                        this.handleTouchsByMultiPoints(newtouchs, this.touchpoints);
                        break;
                }
            }
            else {
                newtouchs = [new MF_Point(e.pageX, e.pageY)];
                this.handleTouchesByOnePoint(newtouchs, this.touchpoints);
            }
        }
        this.touchpoints = newtouchs;
    };
    MF_FACETOUCH.prototype.caculatepointsDistance = function (point1, point2) {
        var resultp = new MF_Point();
        var movex = point2.x - point1.x;
        var movey = point2.y - point1.y;
        var distance = Math.sqrt(movex * movex + movey * movey);
        var angle1, angle2, anglebe;
        angle1 = Math.atan2(movey, movex);
        resultp.offsetx = movex;
        resultp.offsety = movey;
        resultp.offsetdistance = distance;
        resultp.angle = angle1;
        return resultp;
    };
    MF_FACETOUCH.prototype.handleTouchEnd = function (e) {
        this.isTouch = false;
        this.pointsnumber = 0;
        this.initdis = this.lastdis;
        this.initrotation = this.lastrotation;
        this.dispatchEvent(new MF_EVENT.Event('tapend', this.lastp));
        this.element.removeEventListener(MF_DEVICECENTER.TOUCH_MOVE, this.handleTouchMove);
    };
    ;
    MF_FACETOUCH.prototype.handleTouchesByOnePoint = function (points1, points2) {
        var p = this.caculatepointsDistance(points1[0], points2[0]);
        this.lastp = p;
        this.dispatchEvent(new MF_EVENT.Event('tapmove', p));
    };
    MF_FACETOUCH.prototype.handleTouchsByMultiPoints = function (points1, points2) {
        var result1 = this.caculatepointsDistance(points1[0], points1[1]);
        var result2 = this.caculatepointsDistance(points2[0], points2[1]);
        var dis = result2.offsetdistance - result1.offsetdistance;
        var ang = result2.angle - result1.angle;
        var sc = -dis / this.initdis / 2;
        var mainresult = new MF_Point();
        mainresult.angle = -ang / Math.PI * 180;
        mainresult.scale = sc;
        this.dispatchEvent(new MF_EVENT.Event('taprotate', mainresult));
    };
    return MF_FACETOUCH;
})(MF_EVENT.EventDispatcher);
var MF_TagManager = (function () {
    function MF_TagManager() {
    }
    MF_TagManager.start = function () {
        window.onhashchange = function (e) {
            MF_TagManager.handleHash();
        };
        var _h = window.location.hash.replace(/#/, "");
        var postTag = MF_TagManager.tags;
        if (_h in postTag) {
            var fun = postTag[_h]['funname'];
            fun(postTag[_h]['a']);
        }
    };
    MF_TagManager.handleHash = function () {
        var _h = window.location.hash.replace(/#/, "");
        if (_h in MF_TagManager.tags) {
            MF_TagManager.tags[_h]['funname'](MF_TagManager.tags[_h]['a']);
        }
    };
    MF_TagManager.addTag = function (n, fn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        MF_TagManager.tags[n] = { 'funname': fn, a: args };
    };
    MF_TagManager.removeTag = function (n) {
        var postTag = MF_TagManager.tags;
        if (n in postTag) {
            delete postTag[n];
        }
    };
    MF_TagManager.configTag = function (n, fn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        MF_TagManager.addTag(n, fn, args);
    };
    MF_TagManager.tags = {};
    return MF_TagManager;
})();
//# sourceMappingURL=monkey.js.map