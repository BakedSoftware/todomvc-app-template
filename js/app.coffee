"use strict"

$ ->
  window.TD =
    Todo: class Todo
      constructor: (@id, @title) ->
        @complete = false
      status: =>
        return 'editing' if @editing
        return 'completed' if @complete
        return 'incomplete'

    TodoCtrl: class TodoCtrl extends Runtime.Controllers.Base
      constructor: (el) ->
        super

        @_id = 1
        @todos = []
        @new_todo_input = @$ ".new-todo"
        @toggle_all = false
        @turn_off_toggle_all = false

      nextId: =>
        @_id++

      create: =>
        title = @new_todo_input.val().trim()
        return unless title.length > 0
        todo = new TD.Todo(@nextId(), title)
        @todos.unshift todo
        @new_todo_input.val ""
        @turn_off_toggle_all = @toggle_all
        @toggle_all = false

      destroy: (e, todo) =>
        @todos.splice(@todos.indexOf(todo), 1)

      edit: (e, todo) =>
        todo.editing = true

      stop_editing: (e, todo) =>
        unless e.hasClass('edit')
          input = $(".edit", e)
        else
          input = e
        todo.title = input.val().trim()
        todo.editing = false
        if todo.title.length == 0
          @todos.splice(@todos.indexOf(todo), 1)


      has_todos: => @todos.length > 0

      toggle_all_todos: (e) =>
        if @turn_off_toggle_all
          return @turn_off_toggle_all = false
        todo.complete = @toggle_all for todo in @filteredTodos
        null

      complete: => ( todo for todo in @todos when todo.complete is true )
      complete_count: => @complete().length

      incomplete: => ( todo for todo in @todos when todo.complete isnt true )
      incomplete_count: => @incomplete().length

      show_completed: => @complete_count() > 0
      clear_completed: =>
        @todos = @incomplete()
        @filter()

      filter: =>
        if TD.filter == ""
          TD.filter = "/"
        if TD.filter == "/"
          @filteredTodos = @todos
        if TD.filter == "/active"
          @filteredTodos = @incomplete()
        if TD.filter == "/completed"
          @filteredTodos = @complete()

      update_toggle_all: =>
        count = @complete_count()
        @toggle_all = count > 0 && count == @todos.length
        @filter()

      @watchers:
        'toggle_all': @::toggle_all_todos
        'TD.filter': @::filter
        'incomplete_count': @::update_toggle_all
        'complete_count': @::update_toggle_all

    Router: class Router
      route: (hash) =>
        TD.filter = hash.substr(1)
        $('.filters a').removeClass 'selected'
        $("a[href='#{hash}']").addClass 'selected'


  Runtime.addFilter 'pluralize', (amount, str) ->
   if Math.abs(amount) != 1
     str.pluralize()
   else
     str

  Runtime.setContext 'TD'
  Runtime.setRouter new TD.Router
  Runtime.compile document
  Runtime.apply () -> Runtime.router.route(location.hash)
