(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) {
          return a(o, !0);
        }
        if (i) {
          return i(o, !0);
        }
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {exports:{}};
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0;o < r.length;o++) {
    s(r[o]);
  }
  return s;
})({1:[function(require, module, exports) {
  var _classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0;i < props.length;i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
          descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) {
        defineProperties(Constructor.prototype, protoProps);
      }
      if (staticProps) {
        defineProperties(Constructor, staticProps);
      }
      return Constructor;
    };
  }();
  Object.defineProperty(exports, "__esModule", {value:true});
  var Base = function() {
    function Base($el) {
      _classCallCheck(this, Base);
      this.$el = $el;
      this.$el.data("$ctrl", this);
    }
    _createClass(Base, [{key:"$", value:function(_$) {
      function $(_x) {
        return _$.apply(this, arguments);
      }
      $.toString = function() {
        return _$.toString();
      };
      return $;
    }(function(selector) {
      return $(selector, this.$el);
    })}]);
    return Base;
  }();
  Base.watchers = {};
  exports["default"] = Base;
  module.exports = exports["default"];
}, {}], 2:[function(require, module, exports) {
  var _interopRequireWildcard = function(obj) {
    return obj && obj.__esModule ? obj : {"default":obj};
  };
  Object.defineProperty(exports, "__esModule", {value:true});
  var _BaseController = require("./base");
  var _BaseController2 = _interopRequireWildcard(_BaseController);
  Controllers = {Base:_BaseController2["default"]};
  exports["default"] = Controllers;
  module.exports = exports["default"];
}, {"./base":1}], 3:[function(require, module, exports) {
  var _interopRequireWildcard = function(obj) {
    return obj && obj.__esModule ? obj : {"default":obj};
  };
  var _Controllers = require("./controllers/controllers");
  var _Controllers2 = _interopRequireWildcard(_Controllers);
  var Runtime = {context:window, contextName:"", directives:{}, filters:{}, router:{}, _ifs:{}, _repeat:{}, _shws:{}, _klass:{}, _watch:{}, setContext:function setContext(contextName) {
    this.contextName = contextName;
  }, setRouter:function setRouter(router) {
    var _this = this;
    this.router = router;
    window.onhashchange = function() {
      _this.apply(function() {
        return _this.router.route(location.hash);
      });
    };
  }, compile:function compile(element) {
    var flush = arguments[1] === undefined ? true : arguments[1];
    var context = arguments[2] === undefined ? null : arguments[2];
    var func, k, _ref;
    if (element == document) {
      context = context || {};
    } else {
      context = context || Runtime.getContext(element);
      element[0]._rt_ctx = context;
    }
    Runtime.cacheTemplates(element);
    Runtime.interpolate(element, context, flush);
    for (var key in Runtime.compilers) {
      if (key[0] !== "_") {
        Runtime.compilers[key].apply(element, [context]);
      }
    }
    if (flush) {
      Runtime.flush(element, true);
    }
    return element;
  }, cacheTemplates:function cacheTemplates(element) {
    $("*[data-repeat]", element).each(function() {
      var $elm;
      $elm = $(this);
      if (!$elm.data("template")) {
        $elm.data("template", $elm.html());
        $elm.html("");
      }
    });
  }, flush:function flush() {
    var element = arguments[0] === undefined ? document : arguments[0];
    var onlySafe = arguments[1] === undefined ? false : arguments[1];
    var changed = arguments[2] === undefined ? {} : arguments[2];
    if (Runtime.isInFlush) {
      if (Runtime._scheduledFlush) {
        return;
      } else {
        Runtime._scheduledFlush = true;
      }
    }
    Runtime.isInFlush = true;
    if (!changed) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = Runtime._watch[Symbol.iterator](), _step;!(_iteratorNormalCompletion = (_step = _iterator.next()).done);_iteratorNormalCompletion = true) {
          var funcs = _step.value;
          for (var _func in funcs) {
            _func[1].apply(_func[0]);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      var obj = undefined, k = undefined;
      for (k in changed) {
        obj = changed[k];
        if (obj !== true) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;
          try {
            for (var _iterator2 = obj[Symbol.iterator](), _step2;!(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);_iteratorNormalCompletion2 = true) {
              var _func2 = _step2.value;
              _func2[1].apply(_func2[0]);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        } else {
          obj = Runtime._watch[k];
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;
          try {
            for (var _iterator3 = obj[Symbol.iterator](), _step3;!(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);_iteratorNormalCompletion3 = true) {
              var _func3 = _step3.value;
              _func3[1].apply(_func3[0]);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      }
    }
    var watchers = Runtime.watchers;
    var func = undefined;
    for (var k in watchers) {
      if (onlySafe && k[0] === "_") {
        continue;
      }
      func = watchers[k];
      func.apply(element);
    }
    Runtime.isInFlush = false;
    if (Runtime._scheduledFlush === true) {
      Runtime._scheduledFlush = false;
      window.setTimeout(Runtime.flush, 20);
    }
    return Runtime;
  }, apply:function apply(func) {
    var element = arguments[1] === undefined ? document : arguments[1];
    var args, assoc, changed, changes, finalChanges, funcs, k, oldVal, old_values, v, val, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    if (Runtime.isInApply) {
      return func.call();
    }
    old_values = {};
    var association;
    for (var property in Runtime._watch) {
      funcs = Runtime._watch[property];
      old_values[property] = [];
      if (property[0].match(/^[^A-Z]/)) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;
        try {
          for (var _iterator4 = funcs[Symbol.iterator](), _step4;!(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);_iteratorNormalCompletion4 = true) {
            association = _step4.value;
            val = Runtime.getPropByString(association[0], property);
            if (Array.isArray(val)) {
              val = val.slice();
            }
            old_values[property].push([association[0], val]);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      } else {
        val = Runtime.getPropByString(window, property);
        if (Array.isArray(val)) {
          val = val.slice();
        }
        old_values[property] = val;
      }
    }
    Runtime.isInApply = true;
    func.call();
    Runtime.isInApply = false;
    changes = {};
    _ref1 = Runtime._watch;
    for (k in _ref1) {
      funcs = _ref1[k];
      if (k[0].match(/^[^A-Z]/)) {
        changes[k] = [];
        for (_j = 0, _len1 = funcs.length;_j < _len1;_j++) {
          func = funcs[_j];
          if (k.match(/\.\*$/)) {
            changes[k].push(func);
          } else {
            val = Runtime.getPropByString(func[0], k);
            _ref2 = old_values[k];
            for (_k = 0, _len2 = _ref2.length;_k < _len2;_k++) {
              args = _ref2[_k];
              if (args[0] === func[0]) {
                oldVal = args[1];
              }
            }
            changed = val !== oldVal;
            if (Array.isArray(val) && Array.isArray(oldVal)) {
              changed = oldVal && val ? oldVal.length !== val.length : true;
              if (!changed) {
                changed = oldVal.some(function(e, idx) {
                  return val[idx] !== e;
                });
              }
            }
            if (changed) {
              changes[k].push(func);
            }
          }
        }
      } else {
        val = Runtime.getPropByString(window, k);
        oldVal = old_values[k];
        changed = val !== oldVal;
        if (Array.isArray(val) && Array.isArray(oldVal)) {
          changed = oldVal && val ? oldVal.length !== val.length : true;
          if (!changed) {
            changed = oldVal.some(function(e, idx) {
              return val[idx] !== e;
            });
          }
        }
        changes[k] = changed;
      }
    }
    finalChanges = {};
    for (k in changes) {
      v = changes[k];
      if (Array.isArray(v) && v.length || v === true) {
        finalChanges[k] = v;
      }
    }
    return Runtime.flush(element, false, finalChanges);
  }, getPropByString:function getPropByString(obj, propString) {
    if (!propString) {
      return obj;
    }
    var comps = propString.split(".");
    if (!obj.hasOwnProperty(comps[0])) {
      if (obj.hasOwnProperty("$ctrl")) {
        obj = obj.$ctrl;
      } else {
        return null;
      }
    }
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;
    try {
      for (var _iterator5 = propString.split(".")[Symbol.iterator](), _step5;!(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);_iteratorNormalCompletion5 = true) {
        var property = _step5.value;
        obj = obj[property];
        if (typeof obj === "function") {
          obj = obj();
        }
        if (obj === null || obj === void 0) {
          return null;
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
    return obj;
  }, getValue:function getValue(raw, propString) {
    var context = arguments[2] === undefined ? null : arguments[2];
    var ctx;
    ctx = context ? context : propString.match(/^[A-Z]/) ? window : Runtime.getContext($(raw));
    raw._rt_ctx = ctx;
    return Runtime.getPropByString(ctx, propString);
  }, setPropByString:function setPropByString(obj, propString, value) {
    var key, paths, prop, _i, _len, _ref, _ref1;
    if (!propString) {
      return obj;
    }
    paths = propString.split(".");
    key = paths[paths.length - 1];
    if (!obj.hasOwnProperty(paths[0]) && obj.hasOwnProperty("$ctrl")) {
      obj = obj.$ctrl;
    }
    for (_i = 0, _len = paths.length;_i < _len;_i++) {
      prop = paths[_i];
      if (prop !== key) {
        obj = (_ref = (_ref1 = obj != null ? typeof obj[prop] === "function" ? obj[prop]() : void 0 : void 0) != null ? _ref1 : obj != null ? obj[prop] : void 0) != null ? _ref : "";
      }
    }
    return obj ? obj[key] = value : void 0;
  }, evaluateExpression:function evaluateExpression(expr, $elm) {
    var ctx = arguments[2] === undefined ? {} : arguments[2];
    var filter, filterKey, filterOptions, value;
    if (!expr) {
      return;
    }
    filter = null;
    if (expr.match("|")) {
      expr = expr.split("|");
      filter = $.trim(expr[1]);
      expr = $.trim(expr[0]);
    }
    if (!ctx.$ctrl) {
      ctx.$ctrl = Runtime.getContext($elm);
    }
    if (expr[0].match(/^[A-Z]/)) {
      ctx = window;
    }
    value = Runtime.getPropByString(ctx, expr);
    if (filter) {
      filter = filter.split(/:(.+)/);
      filterKey = filter ? filter[0] : null;
      filterOptions = filter && filter.length > 1 ? eval(filter[1]) : null;
      filter = filterKey ? Runtime.filters[filterKey] : null;
      value = filter ? filter(value, filterOptions, ctx) : value;
    }
    return value;
  }, interpolate:function interpolate($elm) {
    var context = arguments[1] === undefined ? null : arguments[1];
    var flush = arguments[2] === undefined ? true : arguments[2];
    return $(':containsRegex("/{{.*?}}/")', $elm).not("script").contents().filter(function() {
      var h;
      return this.nodeType === 3 && (h = $(this).text()) && h.match(/\{\{.*?\}\}/);
    }).each(function() {
      var $el, comps, evald, expr, filter, fmt, node, property, span, text, _ref;
      $el = $(this);
      if ($el.attr("type") === "text/x-rt-template") {
        return;
      }
      text = $el.text();
      while (expr = (_ref = text.match(/\{\{(.*?)\}\}/)) != null ? _ref[1] : void 0) {
        comps = expr.split("|");
        property = $.trim(comps[0]);
        fmt = comps.length === 1 ? "<span data-model='" + property + "'>{{val}}</span>" : (filter = $.trim(comps[1]), "<span data-model='" + property + "' data-filter='" + filter + "'>{{val}}</span>");
        evald = fmt.replace("{{val}}", Runtime.evaluateExpression(expr, $el, context));
        text = text.replace("{{" + expr + "}}", evald);
      }
      span = "<span>" + text + "</span>";
      node = $(span);
      $el.replaceWith(node);
      Runtime.compile(node, flush, context);
      return node.children().unwrap();
    });
  }, addFilter:function addFilter(key, func) {
    Runtime.filters[key] = func;
  }, addDirective:function addDirective(key, obj) {
    Runtime.directives[key] = obj;
  }, getContext:function getContext(element) {
    var $elm, constructor, ctrl, k, v, _ref;
    $elm = element.constructor.name === "" ? element : $(element);
    if ($elm[0]._rt_ctx) {
      return $elm[0]._rt_ctx;
    } else {
      if ($elm.data("$ctrl")) {
        return $elm.data("$ctrl");
      } else {
        if ($elm.is($("body"))) {
          return Runtime.context;
        } else {
          if ($elm.data("controller")) {
            constructor = eval($elm.data("controller"));
            if (!constructor) {
              return console.error("Unknown Controller: " + $elm.data("controller"));
            }
            ctrl = new constructor($elm);
            $elm.data("rt-live", true);
            $elm.data("$ctrl", ctrl);
            _ref = constructor.watchers;
            for (k in _ref) {
              v = _ref[k];
              if (!Runtime._watch[k]) {
                Runtime._watch[k] = [];
              }
              Runtime._watch[k].push([ctrl, v]);
            }
            if (typeof ctrl.onLoad === "function") {
              ctrl.onLoad();
            }
            return ctrl;
          } else {
            if ($elm.parent().length > 0) {
              return Runtime.getContext($elm.parent());
            } else {
              return Runtime.context;
            }
          }
        }
      }
    }
  }, _show:function _show(element, expr, negate) {
    var $elm, ctx, isVisible;
    isVisible = true;
    if (expr.indexOf(Runtime.contextName) === 0) {
      isVisible = Runtime.getPropByString(Runtime.context, expr.substr(Runtime.contextName.length + 1));
    } else {
      $elm = element.constructor.name === "" ? element : $(element);
      if (typeof(ctx = $elm[0]._rt_ctx) !== "undefined") {
        isVisible = Runtime.getPropByString(ctx, expr);
      } else {
        ctx = Runtime.getContext($elm);
        $elm[0]._rt_ctx = ctx;
        isVisible = Runtime.getPropByString(ctx, expr);
      }
    }
    if (negate) {
      isVisible = !isVisible;
    }
    return isVisible;
  }, _call:function _call(element, evnt, act) {
    evnt.preventDefault();
    Runtime.apply(function() {
      var $elm, action, ctx, model, obj;
      $elm = $(element);
      ctx = Runtime.getContext($elm);
      action = $elm.data(act);
      action = action.match(/(\w+)(?:\((\w+)\))*/);
      if (typeof action[2] !== "undefined") {
        model = action[2];
      }
      action = action[1];
      if (model) {
        obj = ctx[model];
      }
      if (!ctx.hasOwnProperty(action) && ctx.hasOwnProperty("$ctrl")) {
        ctx = ctx.$ctrl;
      }
      if (ctx.hasOwnProperty(action)) {
        return ctx[action].apply(ctx, [$elm, obj]);
      } else {
        if (Runtime.context[action] != null) {
          return Runtime.context[action].apply(Runtime.ctx, [$elm, obj]);
        } else {
          return console.error("Unknown action '" + action + "' for " + $elm[0].outerHTML + " in " + ctx.constructor.name);
        }
      }
    });
  }, _model_get_val:function _model_get_val(raw) {
    var filter, filterKey, filterOptions, value, _ref;
    filter = typeof(_ref = raw.dataset.filter) !== "undefined" ? _ref.split(/:(.+)/) : void 0;
    filterKey = filter ? filter[0] : null;
    if (filterKey && !Runtime.filters[filterKey]) {
      throw new Error("Unknown filter: '" + filterKey + "' for element: " + raw.outerHTML);
    }
    filterOptions = filter && filter.length > 1 ? eval(filter[1]) : null;
    filter = filterKey ? Runtime.filters[filterKey] : null;
    value = Runtime.getValue(raw, raw.dataset.model);
    if (filter && value != null) {
      return filter(value, filterOptions);
    } else {
      return value;
    }
  }, compilers:{directives:function directives() {
    var k, obj, _ref, _results;
    _ref = Runtime.directives;
    _results = [];
    for (k in _ref) {
      obj = _ref[k];
      if (Runtime.directives.hasOwnProperty(k)) {
        _results.push($(k, this).each(function() {
          return $(this).replaceWith(obj.template);
        }));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }, "if":function _if() {
    return $("*[data-if]", this).each(function() {
      var $elm, comment, isVisible, negate, raw, val, _ref;
      isVisible = false;
      $elm = $(this);
      raw = val = $elm.data("if");
      negate = val[0] === "!";
      if (negate) {
        val = val.substr(1);
      }
      if (!Runtime._ifs[raw]) {
        Runtime._ifs[raw] = [];
      }
      isVisible = Runtime._show($elm, val, negate);
      if (isVisible) {
        Runtime._ifs[raw].push(this);
      } else {
        $("*[data-show]", $elm).each(function() {
          var $e, list, prop, _ref;
          $e = $(this);
          prop = $e.data("show");
          list = Runtime._shws[prop];
          Runtime._shws[prop] = (_ref = list != null ? list.filter(function(obj) {
            return!$(obj).is($e);
          }) : void 0) != null ? _ref : [];
        });
        $("*[data-controller]", $elm).each(function() {
          var $e, ctrl, k, list, _ref, _results;
          $e = $(this);
          ctrl = $e.data("$ctrl");
          _results = [];
          for (k in ctrl != null ? ctrl.watchers : void 0) {
            list = Runtime._watch[k];
            _results.push(Runtime._watch[k] = (_ref = list != null ? list.filter(function(obj) {
              return obj[0] !== ctrl;
            }) : void 0) != null ? _ref : []);
          }
          return _results;
        });
        comment = document.createComment(this.outerHTML);
        Runtime._ifs[raw].push(comment);
        $elm.replaceWith(comment);
        if ((_ref = Runtime.getContext($elm)) != null) {
          if (typeof _ref.onLoad === "function") {
            _ref.onLoad();
          }
        }
      }
      return null;
    });
  }, show:function show() {
    return $("*[data-show]", this).each(function() {
      var $elm, isVisible, negate, raw, val;
      $elm = $(this);
      raw = val = $elm.data("show");
      negate = val[0] === "!";
      if (negate) {
        val = val.substr(1);
      }
      if (!Runtime._shws[raw]) {
        Runtime._shws[raw] = [];
      }
      if (Runtime._shws[raw].some(function(obj) {
        return $(obj).is($elm);
      })) {
        return;
      }
      $elm.on("remove", function() {
        var list, _ref;
        list = Runtime._shws[raw];
        Runtime._shws[raw] = (_ref = list != null ? list.filter(function(obj) {
          return!$(obj).is($elm);
        }) : void 0) != null ? _ref : [];
      });
      isVisible = Runtime._show($elm, val, negate);
      Runtime._shws[raw].push(this);
      if (isVisible) {
        $elm.removeClass("hidden");
      } else {
        $elm.addClass("hidden");
      }
      return null;
    });
  }, "class":function _class() {
    var attach = function attach() {
      var $elm, raw, val, klass;
      $elm = $(this);
      raw = val = $elm.data("class");
      $elm[0]._rt_hard_klass = $elm.attr("class") || "";
      if (!Runtime._klass[raw]) {
        Runtime._klass[raw] = [];
      }
      if (Runtime._klass[raw].some(function(obj) {
        return $(obj).is($elm);
      })) {
        return;
      }
      $elm.on("remove", function() {
        var list, _ref;
        list = Runtime._klass[raw];
        Runtime._klass[raw] = (_ref = list != null ? list.filter(function(obj) {
          return!$(obj).is($elm);
        }) : void 0) != null ? _ref : [];
      });
      klass = Runtime.getValue($elm[0], raw);
      Runtime._klass[raw].push(this);
      $elm.attr("class", $elm[0]._rt_hard_klass);
      $elm.addClass(klass);
    };
    $("*[data-class]", this).each(attach);
    if ($(this).data("class")) {
      attach.call(this);
    }
  }, include:function include() {
    return $("*[data-include]", this).each(function() {
      var $elm, partial;
      $elm = $(this);
      partial = eval($elm.data("include"));
      $elm.removeData("include");
      return $elm.load(partial, function() {
        var _ref;
        Runtime.compile($elm);
        return(_ref = Runtime.getContext($elm)) != null ? typeof _ref.onLoad === "function" ? _ref.onLoad() : void 0 : void 0;
      });
    });
  }, controller:function controller() {
    return $("*[data-controller]", this).filter(function() {
      return!$(this).data("rt-live");
    }).each(function() {
      var $elm, constructor, ctrl, k, v, _ref;
      $elm = $(this);
      constructor = eval($elm.data("controller"));
      if (!constructor) {
        return console.error("Unknown Controller: " + $elm.data("controller"));
      }
      ctrl = new constructor($elm);
      $elm.data("rt-live", true);
      _ref = constructor.watchers;
      for (k in _ref) {
        v = _ref[k];
        if (!Runtime._watch[k]) {
          Runtime._watch[k] = [];
        }
        Runtime._watch[k].push([ctrl, v]);
      }
      if (typeof ctrl.onLoad === "function") {
        ctrl.onLoad();
      }
      return null;
    });
  }, click:function click() {
    return $("*[data-click]", this).filter(function() {
      return!$(this).data("rt-live");
    }).each(function() {
      var $elm;
      $elm = $(this);
      $elm.data("rt-live", true);
      $elm[0].onclick = function(evt) {
        Runtime._call(this, evt, "click");
      };
    });
  }, dblclick:function dblclick() {
    return $("*[data-dblclick]", this).filter(function() {
      return!$(this).data("rt-live");
    }).each(function() {
      var $elm;
      $elm = $(this);
      $elm.data("rt-live", true);
      $elm[0].ondblclick = function(evt) {
        Runtime._call(this, evt, "dblclick");
      };
    });
  }, blur:function blur() {
    return $("*[data-blur]", this).filter(function() {
      return!$(this).data("rt-live");
    }).each(function() {
      var $elm;
      $elm = $(this);
      $elm.data("rt-live", true);
      $elm[0].onblur = function(evt) {
        Runtime._call(this, evt, "blur");
      };
    });
  }, tabs:function tabs() {
    var li, pane, template;
    li = '<li><a href="#" data-click="open"></a></li>';
    pane = '<div class="tab-pane"></div>';
    template = '<div class="tabbable"><ul class="nav nav-tabs"></ul><div class="tab-content"></div></div>';
    return $("*[data-tabs]", this).each(function() {
      var $elm, $target, tabCtrl;
      $elm = $(this);
      $target = $(template);
      $target.addClass($elm.attr("class"));
      tabCtrl = {open:function open(el) {
        $(".active", $target).removeClass("active");
        $(el).parent().addClass("active");
        return $(".tab-pane[title='" + $(el).parent().attr("title") + "']", $target).addClass("active");
      }};
      $target.data("$ctrl", tabCtrl);
      $("*[data-pane]", $elm).each(function() {
        var $link, $pane, newPane, title;
        $pane = $(this);
        $link = $(li);
        title = $pane.attr("title");
        $link.attr("title", title);
        $("a", $link).html(title);
        $("ul.nav", $target).append($link);
        newPane = $(pane).append($pane.children());
        newPane.attr("title", title);
        return $(".tab-content", $target).append(newPane);
      });
      tabCtrl.open($("li:first-child > a", $target));
      return $elm.replaceWith(Runtime.compile($target));
    });
  }, model:function model() {
    var context = arguments[0] === undefined ? null : arguments[0];
    $("input[data-model], select[data-model], textarea[data-model]", this).each(function() {
      var $elm, change, ctx, model, val;
      $elm = $(this);
      ctx = context != null ? context : Runtime.getContext($elm);
      model = $elm.data("model");
      if ($elm.attr("type") === "text" || $elm.attr("type") === "file") {
        $elm.val(Runtime.getValue($elm[0], model, ctx));
      } else {
        if ($elm.attr("type") === "radio") {
          val = $elm.val();
          if (val[0].match(/[0-9]/)) {
            val = parseInt(val);
          }
          $elm.prop("checked", Runtime.getValue($elm[0], model, ctx) === val);
        } else {
          if ($elm.attr("type") === "checkbox") {
            $elm.prop("checked", Runtime.getValue($elm[0], model, ctx));
          }
        }
      }
      change = function() {
        var obj, _ref, _ref1, _ref2;
        val = $elm.val();
        if ($elm.attr("type") === "radio") {
          if (val[0].match(/[0-9]/)) {
            val = parseInt(val);
          }
        } else {
          if ($elm.attr("type") === "checkbox") {
            val = $elm.prop("checked");
          }
        }
        if (Runtime.isInApply) {
          obj = (_ref = $elm[0]._rt_ctx) != null ? _ref : ctx;
          Runtime.setPropByString(obj, model, val);
        } else {
          if ($elm.data("trap")) {
            obj = (_ref1 = $elm[0]._rt_ctx) != null ? _ref1 : ctx;
            Runtime.apply(function() {
              return Runtime.setPropByString(obj, model, val);
            }, $elm);
          } else {
            obj = (_ref2 = $elm[0]._rt_ctx) != null ? _ref2 : ctx;
            Runtime.apply(function() {
              return Runtime.setPropByString(obj, model, val);
            });
          }
        }
      };
      $elm[0].onchange = change;
      $elm[0].onkeyup = change;
      $elm[0].onsearch = change;
      if ($elm.attr("x-webkit-speech")) {
        $elm[0].onwebkitspeechchange = change;
      }
    });
  }, submit:function submit() {
    $("*[data-submit]", this).each(function() {
      var $elm;
      $elm = $(this);
      $elm[0].onsubmit = function(evt) {
        Runtime._call(this, evt, "submit");
      };
    });
  }, repeat:function repeat() {
    $("*[data-repeat]", this).each(function() {
      var $elm, child, children, ctx, expr, html, list, model, obj, repeat, template;
      $elm = $(this);
      repeat = $elm.data("repeat");
      repeat = repeat.split(" in ");
      list = repeat[1];
      model = repeat[0];
      ctx = Runtime.getContext($elm);
      list = Runtime.getPropByString(ctx, list);
      $elm.data("$ctrl", ctx);
      $elm.data("rt-repeat-list", SparkMD5.hash(JSON.stringify(list, function(key, value) {
        if (key == "__$elm" || key == "$ctrl") {
          return undefined;
        }
        return value;
      })));
      template = $elm.data("template");
      if (list) {
        children = function() {
          var _i, _len, _ref, _results, context;
          _results = [];
          for (_i = 0, _len = list.length;_i < _len;_i++) {
            obj = list[_i];
            html = template;
            context = {};
            context[model] = obj;
            context.$ctrl = ctx;
            child = Runtime.compile($(html), false, context);
            child[0]._rt_ctx = context;
            obj.__$elm = child;
            _results.push(child);
          }
          return _results;
        }();
        $elm.append(children);
      }
    });
  }, src:function src() {
    $("img[data-src]", this).each(function() {
      var $elm;
      $elm = $(this);
      $elm.attr("src", Runtime.getValue($elm[0], $elm.data("src")));
    });
  }}, watchers:{_updateIf:function _updateIf() {
    var comment, compiled, element, elements, i, isVisible, k, negate, raw, _i, _len, _ref;
    _ref = Runtime._ifs;
    for (k in _ref) {
      elements = _ref[k];
      if (Runtime._ifs.hasOwnProperty(k)) {
        raw = k;
        negate = k[0] === "!";
        if (negate) {
          k = k.substr(1);
        }
        for (i = _i = 0, _len = elements.length;_i < _len;i = ++_i) {
          element = elements[i];
          isVisible = Runtime._show($(element), k, negate);
          if (isVisible) {
            if (element.nodeType === 8) {
              compiled = Runtime.compile($(element.nodeValue), false);
              $(element).replaceWith(compiled);
              Runtime._ifs[raw][i] = compiled;
            }
          } else {
            if (element.nodeType !== 8) {
              $("*[data-show]", element).each(function() {
                var $e, list, prop, _ref1;
                $e = $(this);
                prop = $e.data("show");
                list = Runtime._shws[prop];
                return Runtime._shws[prop] = (_ref1 = list != null ? list.filter(function(obj) {
                  return!$(obj).is($e);
                }) : void 0) != null ? _ref1 : [];
              });
              $("*[data-controller]", element).each(function() {
                var $e, ctrl, list, _ref1, _results;
                $e = $(this);
                ctrl = $e.data("$ctrl");
                _results = [];
                for (k in ctrl != null ? ctrl.watchers : void 0) {
                  list = Runtime._watch[k];
                  _results.push(Runtime._watch[k] = (_ref1 = list != null ? list.filter(function(obj) {
                    return obj[0] !== ctrl;
                  }) : void 0) != null ? _ref1 : []);
                }
                return _results;
              });
              comment = document.createComment($(element)[0].outerHTML);
              Runtime._ifs[raw][i] = comment;
              $(element).replaceWith(comment);
            }
          }
        }
      }
    }
  }, updateShow:function updateShow() {
    var element, elements, i, isVisible, k, negate, raw, _i, _len, _ref;
    _ref = Runtime._shws;
    for (k in _ref) {
      elements = _ref[k];
      if (Runtime._shws.hasOwnProperty(k)) {
        raw = k;
        negate = k[0] === "!";
        if (negate) {
          k = k.substr(1);
        }
        for (i = _i = 0, _len = elements.length;_i < _len;i = ++_i) {
          element = elements[i];
          isVisible = Runtime._show($(element), k, negate);
          if (isVisible && element.classList.contains("hidden")) {
            element.classList.remove("hidden");
          } else {
            if (!isVisible && !element.classList.contains("hidden")) {
              element.classList.add("hidden");
            }
          }
        }
      }
    }
  }, updateClass:function updateClass() {
    var element, elements, i, isVisible, k, raw, _i, _len, _ref, klass;
    _ref = Runtime._klass;
    for (k in _ref) {
      elements = _ref[k];
      if (Runtime._klass.hasOwnProperty(k)) {
        raw = k;
        for (i = _i = 0, _len = elements.length;_i < _len;i = ++_i) {
          element = $(elements[i]);
          klass = Runtime.getValue(element, k);
          element.attr("class", element[0]._rt_hard_klass);
          element.addClass(klass);
        }
      }
    }
  }, updateModel:function updateModel() {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;
    try {
      for (var _iterator6 = $(":text[data-model]", this).not(":focus").toArray()[Symbol.iterator](), _step6;!(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);_iteratorNormalCompletion6 = true) {
        var elm = _step6.value;
        elm.value = Runtime._model_get_val(elm);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
          _iterator6["return"]();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
    $(":radio[data-model]", $(this)).each(function() {
      var $elm, val;
      $elm = $(this);
      val = $elm.val();
      if (val[0].match(/[0-9]/)) {
        val = parseInt(val);
      }
      $elm.prop("checked", Runtime.getValue($elm[0], this.dataset.model) === val);
    });
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;
    try {
      for (var _iterator7 = $(":checkbox[data-model]", this).toArray()[Symbol.iterator](), _step7;!(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done);_iteratorNormalCompletion7 = true) {
        var elm = _step7.value;
        elm.checked = Runtime.getValue(elm, elm.dataset.model);
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
          _iterator7["return"]();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;
    try {
      for (var _iterator8 = $("span[data-model]", this).toArray()[Symbol.iterator](), _step8;!(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done);_iteratorNormalCompletion8 = true) {
        var elm = _step8.value;
        elm.innerHTML = Runtime._model_get_val(elm);
      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
          _iterator8["return"]();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }
  }, updateSrc:function updateSrc() {
    return $("img[data-src]", $(this)).each(function() {
      var $elm, newSrc;
      $elm = $(this);
      newSrc = Runtime.getValue($elm[0], $elm.data("src"));
      if ($elm.attr("src") !== newSrc) {
        return $elm.attr("src", newSrc);
      }
    });
  }, updateRepeat:function updateRepeat() {
    $("*[data-repeat]", this).each(function() {
      var $elm, changed, child, container, context, ctx, expr, html, list, model, newList, newListHash, obj, oldList, repeat, rt_model, template, _i, _len, _ref;
      $elm = $(this);
      repeat = $elm.data("repeat");
      repeat = repeat.split(" in ");
      list = repeat[1];
      model = repeat[0];
      ctx = Runtime.getContext($elm);
      newList = Runtime.getPropByString(ctx, list);
      newListHash = SparkMD5.hash(JSON.stringify(newList, function(key, value) {
        if (key == "__$elm" || key == "$ctrl") {
          return undefined;
        }
        return value;
      }));
      oldList = $elm.data("rt-repeat-list");
      changed = oldList && newList ? oldList !== newListHash : true;
      if (!changed) {
        return;
      }
      if (newList) {
        $elm.data("rt-repeat-list", newListHash);
      } else {
        $elm.removeData("rt-repeat-list");
      }
      $elm.empty();
      if (!newList) {
        return;
      }
      template = $elm.data("template");
      container = $(document.createElement("div"));
      if (newList) {
        for (_i = 0, _len = newList.length;_i < _len;_i++) {
          obj = newList[_i];
          html = template;
          if (!obj.hasOwnProperty("__$elm")) {
            context = {};
            context[model] = obj;
            context.$ctrl = ctx;
            child = Runtime.compile($(html), false, context);
            child[0]._rt_ctx = context;
            obj.__$elm = child;
          }
          container.append(obj.__$elm);
        }
        $elm.append(container.children());
        return $elm.trigger("contentchanged");
      }
    });
  }}};
  Runtime.Controllers = _Controllers2["default"];
  window.Runtime = Runtime;
}, {"./controllers/controllers":2}]}, {}, [3]);
$.extend($.expr[":"], {containsExact:$.expr.createPseudo ? $.expr.createPseudo(function(text) {
  return function(elem) {
    return $.trim(elem.innerHTML.toLowerCase()) === text.toLowerCase();
  };
}) : function(elem, i, match) {
  return $.trim(elem.innerHTML.toLowerCase()) === match[3].toLowerCase();
}, containsExactCase:$.expr.createPseudo ? $.expr.createPseudo(function(text) {
  return function(elem) {
    return $.trim(elem.innerHTML) === text;
  };
}) : function(elem, i, match) {
  return $.trim(elem.innerHTML) === match[3];
}, containsRegex:$.expr.createPseudo ? $.expr.createPseudo(function(text) {
  var reg = /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})$/.exec(text);
  return function(elem) {
    return reg ? RegExp(reg[1], reg[2]).test($.trim(elem.textContent)) : false;
  };
}) : function(elem, i, match) {
  var reg = /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})$/.exec(match[3]);
  return reg ? RegExp(reg[1], reg[2]).test($.trim(elem.innerHTML)) : false;
}});
(function(factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else {
    if (typeof define === "function" && define.amd) {
      define(factory);
    } else {
      var glob;
      try {
        glob = window;
      } catch (e) {
        glob = self;
      }
      glob.SparkMD5 = factory();
    }
  }
})(function(undefined) {
  var add32 = function(a, b) {
    return a + b & 4294967295;
  }, cmn = function(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32(a << s | a >>> 32 - s, b);
  }, ff = function(a, b, c, d, x, s, t) {
    return cmn(b & c | ~b & d, a, b, x, s, t);
  }, gg = function(a, b, c, d, x, s, t) {
    return cmn(b & d | c & ~d, a, b, x, s, t);
  }, hh = function(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }, ii = function(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }, md5cycle = function(x, k) {
    var a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }, md5blk = function(s) {
    var md5blks = [], i;
    for (i = 0;i < 64;i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }, md5blk_array = function(a) {
    var md5blks = [], i;
    for (i = 0;i < 64;i += 4) {
      md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
    }
    return md5blks;
  }, md51 = function(s) {
    var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
    for (i = 64;i <= n;i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    length = s.length;
    tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0;i < length;i += 1) {
      tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
    }
    tail[i >> 2] |= 128 << (i % 4 << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0;i < 16;i += 1) {
        tail[i] = 0;
      }
    }
    tmp = n * 8;
    tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    lo = parseInt(tmp[2], 16);
    hi = parseInt(tmp[1], 16) || 0;
    tail[14] = lo;
    tail[15] = hi;
    md5cycle(state, tail);
    return state;
  }, md51_array = function(a) {
    var n = a.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
    for (i = 64;i <= n;i += 64) {
      md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
    }
    a = i - 64 < n ? a.subarray(i - 64) : new Uint8Array(0);
    length = a.length;
    tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0;i < length;i += 1) {
      tail[i >> 2] |= a[i] << (i % 4 << 3);
    }
    tail[i >> 2] |= 128 << (i % 4 << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0;i < 16;i += 1) {
        tail[i] = 0;
      }
    }
    tmp = n * 8;
    tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    lo = parseInt(tmp[2], 16);
    hi = parseInt(tmp[1], 16) || 0;
    tail[14] = lo;
    tail[15] = hi;
    md5cycle(state, tail);
    return state;
  }, hex_chr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], rhex = function(n) {
    var s = "", j;
    for (j = 0;j < 4;j += 1) {
      s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15];
    }
    return s;
  }, hex = function(x) {
    var i;
    for (i = 0;i < x.length;i += 1) {
      x[i] = rhex(x[i]);
    }
    return x.join("");
  }, md5 = function(s) {
    return hex(md51(s));
  }, SparkMD5 = function() {
    this.reset();
  };
  if (md5("hello") !== "5d41402abc4b2a76b9719d911017c592") {
    add32 = function(x, y) {
      var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 65535;
    };
  }
  SparkMD5.prototype.append = function(str) {
    if (/[\u0080-\uFFFF]/.test(str)) {
      str = unescape(encodeURIComponent(str));
    }
    this.appendBinary(str);
    return this;
  };
  SparkMD5.prototype.appendBinary = function(contents) {
    this._buff += contents;
    this._length += contents.length;
    var length = this._buff.length, i;
    for (i = 64;i <= length;i += 64) {
      md5cycle(this._state, md5blk(this._buff.substring(i - 64, i)));
    }
    this._buff = this._buff.substr(i - 64);
    return this;
  };
  SparkMD5.prototype.end = function(raw) {
    var buff = this._buff, length = buff.length, i, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ret;
    for (i = 0;i < length;i += 1) {
      tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3);
    }
    this._finish(tail, length);
    ret = !!raw ? this._state : hex(this._state);
    this.reset();
    return ret;
  };
  SparkMD5.prototype._finish = function(tail, length) {
    var i = length, tmp, lo, hi;
    tail[i >> 2] |= 128 << (i % 4 << 3);
    if (i > 55) {
      md5cycle(this._state, tail);
      for (i = 0;i < 16;i += 1) {
        tail[i] = 0;
      }
    }
    tmp = this._length * 8;
    tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    lo = parseInt(tmp[2], 16);
    hi = parseInt(tmp[1], 16) || 0;
    tail[14] = lo;
    tail[15] = hi;
    md5cycle(this._state, tail);
  };
  SparkMD5.prototype.reset = function() {
    this._buff = "";
    this._length = 0;
    this._state = [1732584193, -271733879, -1732584194, 271733878];
    return this;
  };
  SparkMD5.prototype.destroy = function() {
    delete this._state;
    delete this._buff;
    delete this._length;
  };
  SparkMD5.hash = function(str, raw) {
    if (/[\u0080-\uFFFF]/.test(str)) {
      str = unescape(encodeURIComponent(str));
    }
    var hash = md51(str);
    return!!raw ? hash : hex(hash);
  };
  SparkMD5.hashBinary = function(content, raw) {
    var hash = md51(content);
    return!!raw ? hash : hex(hash);
  };
  SparkMD5.ArrayBuffer = function() {
    this.reset();
  };
  SparkMD5.ArrayBuffer.prototype.append = function(arr) {
    var buff = this._concatArrayBuffer(this._buff, arr), length = buff.length, i;
    this._length += arr.byteLength;
    for (i = 64;i <= length;i += 64) {
      md5cycle(this._state, md5blk_array(buff.subarray(i - 64, i)));
    }
    this._buff = i - 64 < length ? buff.subarray(i - 64) : new Uint8Array(0);
    return this;
  };
  SparkMD5.ArrayBuffer.prototype.end = function(raw) {
    var buff = this._buff, length = buff.length, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i, ret;
    for (i = 0;i < length;i += 1) {
      tail[i >> 2] |= buff[i] << (i % 4 << 3);
    }
    this._finish(tail, length);
    ret = !!raw ? this._state : hex(this._state);
    this.reset();
    return ret;
  };
  SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
  SparkMD5.ArrayBuffer.prototype.reset = function() {
    this._buff = new Uint8Array(0);
    this._length = 0;
    this._state = [1732584193, -271733879, -1732584194, 271733878];
    return this;
  };
  SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
  SparkMD5.ArrayBuffer.prototype._concatArrayBuffer = function(first, second) {
    var firstLength = first.length, result = new Uint8Array(firstLength + second.byteLength);
    result.set(first);
    result.set(new Uint8Array(second), firstLength);
    return result;
  };
  SparkMD5.ArrayBuffer.hash = function(arr, raw) {
    var hash = md51_array(new Uint8Array(arr));
    return!!raw ? hash : hex(hash);
  };
  return SparkMD5;
});

