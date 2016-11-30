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
        this.step = this.parameter.step;
        this.times = this.parameter.times;
        this.loop = this.parameter.loop;
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
    return MF_UTILS;
})();
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
        this.element = document.getElementById(targetname) || document.body;
        this.initEvent();
    }
    ;
    MF_FACETOUCH.prototype.initEvent = function () {
        this.element.addEventListener(MF_DEVICECENTER.TOUCH_START, this.handleTouchBegin);
        this.element.addEventListener(MF_DEVICECENTER.TOUCH_MOVE, this.handleTouchMove);
        this.element.addEventListener(MF_DEVICECENTER.TOUCH_END, this.handleTouchEnd);
        document.addEventListener(MF_DEVICECENTER.TOUCH_END, function () {
            this.element.removeEventListener(MF_DEVICECENTER.TOUCH_MOVE, this.handleTouchMove);
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
//# sourceMappingURL=monkey.js.map