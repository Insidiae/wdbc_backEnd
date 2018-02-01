$(document).ready(function(){
    $.getJSON("/api/todos")
        .then(addTodos)
        .catch(showErr);
    
    $("#todoInput").keypress(function(event) {
        if(event.which == 13) {
            createTodo($(this).val());
        }
    });
    
    $(".list").on("click", "li", function() {
        updateTodo($(this));
    });
    
    $(".list").on("click", "span", function(e) {
        e.stopPropagation();
        deleteTodo($(this).parent());
    });
})

function addTodos(todos) {
    todos.forEach(appendTodo);
}

function appendTodo(todo) {
    var newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
    newTodo.data('completed', todo.completed);
    newTodo.data('id', todo._id);
    if(todo.completed) newTodo.addClass("done");
    $(".list").append(newTodo)
}

function createTodo(usrInput) {
    $.post("/api/todos", {name: usrInput})
        .then(function(newTodo) {
            appendTodo(newTodo);
            $("#todoInput").val('');
        })
        .catch(showErr);
}

function updateTodo(todo) {
    const todoId = todo.data("id");
    const todoStatus = !todo.data("completed");
    var updateData = {completed: todoStatus};
    $.ajax({
       method: "PUT",
       url: `/api/todos/${todoId}`,
       data: updateData
    }).then(function(updatedTodo) {
        todo.toggleClass("done");
        todo.data("completed", todoStatus);
    }).catch(showErr);
}

function deleteTodo(todo) {
    const todoId = todo.data("id");
    $.ajax({
       method: "DELETE",
       url: `/api/todos/${todoId}`
    }).then(function(data) {
            todo.remove();
    }).catch(showErr);
}

function showErr(err) {
    console.log(err);
}