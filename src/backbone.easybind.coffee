Backbone = @Backbone or typeof require is 'function' and require 'backbone'

DOMEventList = 'blur focus focusin focusout load resize scroll
  unload click dblclick mousedown mouseup mousemove mouseover
  mouseout mouseenter mouseleave change select submit keydown
  keypress keyup error touchstart touchend touchmove'.split /\s+/

camelize = (str) ->
  str.replace /[^\d\w]+(.)?/g, (match, chr) ->
    if chr then chr.toUpperCase() else ''

capitalize = (str) ->
  if str then ( str[0].toUpperCase() + str.substring 1 ) else ''

dasherize = (str) ->
  str
    .replace(/::/g, '/')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/_/g, '-')
    .toLowerCase()

Backbone.EasyBind = {}

bindEvents = (context) ->
  $window = $ window
  $document = $ document

  eventNamespace = "easyBindEvents-#{ context.cid }"
  for ctx, val of document: $document, window: $window
    for key, value of context
      if key.indexOf "on#{ capitalize ctx }" is 0
        eventName = key.substring(ctx.length + 2).toLowerCase()
        val.on "#{ eventName }.#{ eventNamespace }", value and value.bind context

  context.on 'destroy', =>
    $window.off eventNamespace
    $document.off eventNamespace

  conext.on 'all', (event, args...) =>
    camelized = camelize event
    methodName = "on#{ camelized[0].toUpperCase() }#{ camelized.substring 1 }"
    method = context[methodName]
    method.apply context, args if method

class Backbone.EasyBind.View extends Backbone.View
  constructor: ->
    super
    bindEvents @

    @on 'all', (event, args...) =>
      for key, value of @
        if key.indexOf('on') is 0
          camelSplit = key.match /[A-Z][a-z]+/
          event = camelSplit[0]
          if event and event.toLowerCase in DOMEventList
            callback = if typeof value is 'function' then value else @[value]
            if callback and key.length is event.length + 2
              @$el.on "#{ event }.delegateEvents", callback
            else
              selector = dasherize camelSplit.slice 1
              @$el.on "#{ event }.delegateEvents", ".#{ selector }", callback


class Backbone.EasyBind.Model extends Backbone.Model
  constructor: ->
    super
    bindEvents @


class Backbone.EasyBind.Router extends Backbone.Router
  constructor: ->
    super
    bindEvents @


class Backbone.EasyBind.Collection extends Backbone.Collection
  constructor: ->
    super
    bindEvents @


# This property is updated automatically by Grunt during builds
Backbone.EasyBind.VERSION = '0.0.3'