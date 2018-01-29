var express = require("express"),
    router = express.Router();

var helpers = require("../helpers/todos");

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo);

router.route("/:todoId")
    .get(helpers.showTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);

module.exports = router;