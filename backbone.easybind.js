/* backbone.easybind.js v0.0.3 (coffeescript output) */ 

(function() {
  var DOMEventList, bindEvents, camelize, capitalize, dasherize,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  DOMEventList = 'blur focus focusin focusout load resize scroll\
  unload click dblclick mousedown mouseup mousemove mouseover\
  mouseout mouseenter mouseleave change select submit keydown\
  keypress keyup error touchstart touchend touchmove'.split(/\s+/);

  camelize = function(str) {
    return str.replace(/[^\d\w]+(.)?/g, function(match, chr) {
      if (chr) {
        return chr.toUpperCase();
      } else {
        return '';
      }
    });
  };

  capitalize = function(str) {
    if (str) {
      return str[0].toUpperCase() + str.substring(1);
    } else {
      return '';
    }
  };

  dasherize = function(str) {
    return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
  };

  Backbone.EasyBind = {};

  bindEvents = function(context) {
    var _this = this;
    return conext.on('all', function() {
      var args, camelized, event, method, methodName;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      camelized = camelize(event);
      if (camelized) {
        methodName = "on" + (camelized[0].toUpperCase()) + (camelized.substring(1));
        method = context[methodName];
        if (method) {
          return method.apply(context, args);
        }
      }
    });
  };

  Backbone.EasyBind.View = (function(_super) {
    __extends(View, _super);

    function View() {
      var _this = this;
      View.__super__.constructor.apply(this, arguments);
      bindEvents(this);
      this.on('all', function() {
        var args, callback, camelSplit, event, key, selector, value, _ref, _results;
        event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        _results = [];
        for (key in _this) {
          value = _this[key];
          if (key.indexOf('on') === 0) {
            camelSplit = key.match(/[A-Z][a-z]+/);
            event = camelSplit[0];
            if (event && (_ref = event.toLowerCase, __indexOf.call(DOMEventList, _ref) >= 0)) {
              callback = typeof value === 'function' ? value : _this[value];
              if (callback && key.length === event.length + 2) {
                _results.push(_this.$el.on("" + event + ".delegateEvents", callback));
              } else {
                selector = dasherize(camelSplit.slice(1));
                _results.push(_this.$el.on("" + event + ".delegateEvents", "." + selector, callback));
              }
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    }

    return View;

  })(Backbone.View);

  Backbone.EasyBind.Model = (function(_super) {
    __extends(Model, _super);

    function Model() {
      Model.__super__.constructor.apply(this, arguments);
      bindEvents(this);
    }

    return Model;

  })(Backbone.Model);

  Backbone.EasyBind.Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
      bindEvents(this);
    }

    return Router;

  })(Backbone.Router);

  Backbone.EasyBind.Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      Collection.__super__.constructor.apply(this, arguments);
      bindEvents(this);
    }

    return Collection;

  })(Backbone.Collection);

  Backbone.EasyBind.VERSION = '0.0.3';

}).call(this);
