var PH_UTILS = (function () {
    function PH_UTILS() {
    }
    PH_UTILS.setStyle = function (dom, stylename, value) {
        if (PH_UTILS.NeedCompatible(stylename)) {
            PH_UTILS.setCompatible(dom, stylename, value);
        }
        else {
            dom.style[stylename] = value;
        }
    };
    PH_UTILS.setCompatible = function (dom, stylename, value) {
        dom.style['-webkit-' + stylename] = value;
        dom.style['-o-' + stylename] = value;
        dom.style['-moz-' + stylename] = value;
        dom.style['-os-' + stylename] = value;
        dom.style[stylename] = value;
    };
    PH_UTILS.NeedCompatible = function (stylename) {
        stylename = stylename.toLowerCase();
        return (stylename == 'opacity' ||
            stylename == 'animation' ||
            stylename == 'transition' ||
            stylename == 'perspective' ||
            stylename == 'box-sizing' ||
            stylename == 'column-count' ||
            stylename == 'column-gap' ||
            stylename == 'column-rule' ||
            stylename == 'column-rule-color' ||
            stylename == 'column-rule-style' ||
            stylename == 'column-rule-width' ||
            stylename == 'column-span' ||
            stylename == 'column-width' ||
            stylename == 'columns' ||
            stylename.indexOf('transform') >= 0 ||
            stylename.indexOf('transition') >= 0);
    };
    return PH_UTILS;
})();
var DOM_CON = (function () {
    function DOM_CON(_dom) {
        var _this = this;
        if (_dom === void 0) { _dom = null; }
        this.childrens = {};
        this._classes = "";
        this.styleobject = {};
        this.content = '';
        if (_dom) {
            this.mydom = _dom;
            var doms = this.mydom.children;
            if (doms.length >= 1) {
                this.scrollNodes(doms);
            }
        }
        this.mydom.addEventListener('click', function (e) {
            if (_this.onClick) {
                _this.onClick();
            }
        });
        this.mydom.addEventListener('touchstart', function (e) {
            if (_this.onTap) {
                _this.onTap();
            }
        });
    }
    DOM_CON.prototype.addAttrChildren = function (name) {
        Object.defineProperty(this, name, {
            set: function (val) {
                this.childrens[name] = val;
            },
            get: function () {
                return this.childrens[name];
            },
            enumerable: true,
            configurable: true
        });
    };
    Object.defineProperty(DOM_CON.prototype, "dom", {
        set: function (_dom) {
            this.mydom = _dom;
            var doms = this.mydom.children;
            if (doms.length >= 1) {
                this.scrollNodes(doms);
            }
        },
        enumerable: true,
        configurable: true
    });
    DOM_CON.prototype.css = function (stylename, value) {
        PH_UTILS.setStyle(this.mydom, stylename, value);
    };
    DOM_CON.prototype.scrollNodes = function (doms) {
        for (var i = 0; i < doms.length; i++) {
            var mydom = doms[i];
            if (!mydom.getAttribute) {
                continue;
            }
            ;
            var name = mydom.getAttribute('ph_name');
            if (!name)
                break;
            if (name) {
                var c = PF_DOM_MANAGER.getDom(mydom);
                PH_LAB[name] = c;
                this.addAttrChildren(name);
                eval('this.' + name + "=c");
            }
        }
    };
    Object.defineProperty(DOM_CON.prototype, "style", {
        get: function () {
            return this.mydom.style;
        },
        enumerable: true,
        configurable: true
    });
    DOM_CON.prototype.bind = function (event, fun) {
        this.mydom.addEventListener(event, fun);
    };
    DOM_CON.prototype.show = function () {
        this.mydom.style['display'] = 'block';
    };
    DOM_CON.prototype.hide = function () {
        this.mydom.style['display'] = 'none';
    };
    Object.defineProperty(DOM_CON.prototype, "html", {
        get: function () {
            return this.mydom.innerHTML;
        },
        set: function (val) {
            this.mydom.innerHTML = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOM_CON.prototype, "classes", {
        get: function () {
            return this._classes;
        },
        enumerable: true,
        configurable: true
    });
    DOM_CON.prototype.addClass = function (classname) {
        if (this.classes.indexOf(classname) >= 0) {
            return;
        }
        else {
            this._classes += (" " + classname);
            this.mydom.setAttribute('class', this._classes);
        }
    };
    DOM_CON.prototype.removeClass = function (classname) {
        this._classes = this._classes.replace(classname, "");
        this.mydom.setAttribute('class', this._classes);
    };
    DOM_CON.prototype.static = function () {
        this.mydom.style['position'] = 'static';
    };
    DOM_CON.prototype.relative = function () {
        this.mydom.style['position'] = 'relative';
    };
    DOM_CON.prototype.absolute = function () {
        this.mydom.style['position'] = 'absolute';
        this.top = 0;
    };
    Object.defineProperty(DOM_CON.prototype, "left", {
        get: function () {
            return this.styleobject['left'];
        },
        set: function (val) {
            this.styleobject['left'] = val;
            this.mydom.style['left'] = val + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOM_CON.prototype, "top", {
        get: function () {
            return this.styleobject['top'];
        },
        set: function (val) {
            this.styleobject['top'] = val;
            this.mydom.style['top'] = val + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOM_CON.prototype, "styleWidth", {
        get: function () {
            return this.styleobject['width'];
        },
        set: function (val) {
            this.styleobject['stylewidth'] = val;
            this.mydom.style['width'] = val + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOM_CON.prototype, "styleHeight", {
        get: function () {
            return this.styleobject['height'];
        },
        set: function (val) {
            this.styleobject['styleheight'] = val;
            this.mydom.style['height'] = val + "px";
        },
        enumerable: true,
        configurable: true
    });
    DOM_CON.prototype.getAttr = function (str) {
        return this.mydom.getAttribute(str);
    };
    return DOM_CON;
})();
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
var PH_LAB = {
    setGlobal: function () {
        for (var a in PH_LAB) {
            if (!window[a] && a != 'setGlobal') {
                window[a] = PH_LAB[a];
            }
        }
    }
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PF_DIV = (function (_super) {
    __extends(PF_DIV, _super);
    function PF_DIV(dom) {
        _super.call(this, dom);
    }
    return PF_DIV;
})(DOM_CON);
var PF_IMG = (function (_super) {
    __extends(PF_IMG, _super);
    function PF_IMG(dom) {
        _super.call(this, dom);
    }
    Object.defineProperty(PF_IMG.prototype, "width", {
        get: function () {
            return this.styleobject['width'];
        },
        set: function (val) {
            this.styleobject['width'] = val;
            this.mydom.setAttribute('width', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PF_IMG.prototype, "height", {
        get: function () {
            return this.styleobject['height'];
        },
        set: function (val) {
            this.styleobject['height'] = val;
            this.mydom.setAttribute('height', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PF_IMG.prototype, "src", {
        get: function () {
            return this.styleobject['src'];
        },
        set: function (val) {
            var _this = this;
            this.styleobject['src'] = val;
            this.mydom.src = val;
            this.mydom.onload = function (e) {
                if (!_this.width) {
                    _this.width = e.target.width;
                }
                if (!_this.height) {
                    _this.height = e.target.height;
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return PF_IMG;
})(DOM_CON);
var PF_CANVAS = (function (_super) {
    __extends(PF_CANVAS, _super);
    function PF_CANVAS(dom) {
        _super.call(this, dom);
    }
    PF_CANVAS.prototype.getContext = function (str) {
        if (str === void 0) { str = '2d'; }
        var context = this.mydom.getContext(str);
        return context;
    };
    Object.defineProperty(PF_CANVAS.prototype, "width", {
        get: function () {
            return this.styleobject['width'];
        },
        set: function (val) {
            this.styleobject['width'] = val;
            this.mydom.setAttribute('width', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PF_CANVAS.prototype, "height", {
        get: function () {
            return this.styleobject['height'];
        },
        set: function (val) {
            this.styleobject['height'] = val;
            this.mydom.setAttribute('height', val);
        },
        enumerable: true,
        configurable: true
    });
    return PF_CANVAS;
})(DOM_CON);
var PF_INPUT = (function (_super) {
    __extends(PF_INPUT, _super);
    function PF_INPUT(dom) {
        _super.call(this, dom);
    }
    return PF_INPUT;
})(DOM_CON);
var PF_P = (function (_super) {
    __extends(PF_P, _super);
    function PF_P(dom) {
        _super.call(this, dom);
    }
    return PF_P;
})(DOM_CON);
var PF_SELECT = (function (_super) {
    __extends(PF_SELECT, _super);
    function PF_SELECT(dom) {
        var _this = this;
        _super.call(this, dom);
        dom.addEventListener('change', function (e) {
            if (_this.onChange) {
                _this.onChange(e);
            }
        });
    }
    Object.defineProperty(PF_SELECT.prototype, "optiondata", {
        set: function (_data) {
            this._optiondata = _data;
            var options = "";
            for (var i = 0; i < _data.length; i++) {
                options += "<option value='" + _data[i]['value'] + "'>" + _data[i]['text'] + "</option>";
            }
            this.mydom.innerHTML = options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PF_SELECT.prototype, "selectedText", {
        get: function () {
            var index = this.selectindex;
            var text = this.mydom.options[index].text;
            return text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PF_SELECT.prototype, "selectedValue", {
        get: function () {
            var index = this.selectindex;
            var text = this.mydom.options[index].value;
            return text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PF_SELECT.prototype, "selectindex", {
        get: function () {
            return this.mydom.selectedIndex;
        },
        set: function (val) {
            this.mydom.selectedIndex = val;
        },
        enumerable: true,
        configurable: true
    });
    return PF_SELECT;
})(DOM_CON);
var PF_SELECTION = (function (_super) {
    __extends(PF_SELECTION, _super);
    function PF_SELECTION(dom) {
        _super.call(this, dom);
    }
    return PF_SELECTION;
})(DOM_CON);
var PF_VIDEO = (function (_super) {
    __extends(PF_VIDEO, _super);
    function PF_VIDEO(dom) {
        _super.call(this, dom);
    }
    return PF_VIDEO;
})(DOM_CON);
var PF_AUDIO = (function (_super) {
    __extends(PF_AUDIO, _super);
    function PF_AUDIO(dom) {
        _super.call(this, dom);
    }
    return PF_AUDIO;
})(DOM_CON);
var PF_A = (function (_super) {
    __extends(PF_A, _super);
    function PF_A(dom) {
        _super.call(this, dom);
    }
    return PF_A;
})(DOM_CON);
var PF_DOM_MANAGER = (function () {
    function PF_DOM_MANAGER() {
    }
    PF_DOM_MANAGER.getDom = function (dom) {
        var domcon;
        switch (dom.tagName.toLowerCase()) {
            case 'div':
                domcon = new PF_DIV(dom);
                break;
            case 'img':
                domcon = new PF_IMG(dom);
                break;
            case 'p':
                domcon = new PF_P(dom);
                break;
            case 'a':
                domcon = new PF_A(dom);
                break;
            case 'input':
                domcon = new PF_INPUT(dom);
                break;
            case 'select':
                domcon = new PF_SELECT(dom);
                break;
            case 'selection':
                domcon = new PF_SELECTION(dom);
                break;
            case 'video':
                domcon = new PF_VIDEO(dom);
                break;
            case 'audio':
                domcon = new PF_AUDIO(dom);
                break;
            case 'canvas':
                domcon = new PF_CANVAS(dom);
                break;
        }
        return domcon;
    };
    return PF_DOM_MANAGER;
})();
var main = (function () {
    function main() {
    }
    main.init = function () {
        main.mydoms = document.body.children;
        main.scrollDivs();
    };
    ;
    main.scrollDivs = function () {
        for (var i = 0; i < main.mydoms.length; i++) {
            var mydom = main.mydoms[i];
            if (!mydom.getAttribute) {
                continue;
            }
            var name = mydom.getAttribute('ph_name');
            if (!name)
                break;
            if (name) {
                var c = PF_DOM_MANAGER.getDom(mydom);
                PH_LAB[name] = c;
            }
        }
    };
    Object.defineProperty(main.prototype, "a", {
        set: function (val) {
        },
        enumerable: true,
        configurable: true
    });
    return main;
})();
main.init();
var PH_FORM = (function () {
    function PH_FORM() {
    }
    return PH_FORM;
})();
var PH_TRACKING = (function () {
    function PH_TRACKING() {
    }
    PH_TRACKING.prototype.doTrack = function () {
    };
    return PH_TRACKING;
})();
var PH_GA_TRACKING = (function (_super) {
    __extends(PH_GA_TRACKING, _super);
    function PH_GA_TRACKING() {
        _super.call(this);
    }
    PH_GA_TRACKING.prototype.doTrack = function () {
    };
    return PH_GA_TRACKING;
})(PH_TRACKING);
//# sourceMappingURL=index.js.map