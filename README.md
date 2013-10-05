# Backbone.EasyBind

Ridiculously easy event binding for your Backbone objects!

```coffeescript

class Model extends Backbone.EasyBind.Model
  # Fires on trigger 'change:active' event
  onChangeActive: (model, value) ->

  # Fires on 'change' event
  onChange: (model) ->

  # Fires on 'myCustomEvent' event.
  onMyCustomEvent: ->


class View extends Backbone.EasyBind.View
  # Fires when @el was clicked
  onClick: (event) ->

  # Fires on hover '.main-image'
  onHoverMainImage: (event) ->

  # Fires on touchend '.title-container'
  onTouchendTitleContainer: (event) ->


class Router extends Backbone.EasyBind.Router
  # Fires on 'route' event
  onRoute: ->

  # Fires on 'route:home' event
  onRouteHome: ->


class Collection extends Backbone.EasyBind.Collection
  # Fires on 'add' event
  onAdd: (model) ->

  # Fires when a model in the collection fires a 'change:active' event
  onChangeActive: (model, value) ->

```

Documentation coming soon...