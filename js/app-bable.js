"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
} // Class for create Tasks


var Task =
/*#__PURE__*/
function () {
  function Task(value) {
    _classCallCheck(this, Task);

    this.value = value;
  }

  _createClass(Task, [{
    key: "createDoneTask",
    // Create task with status "Done"
    value: function createDoneTask() {
      var taskDoneItem = document.createElement("li");
      taskDoneItem.className = "todo-list__item todo-list__item--done";
      taskDoneItem.innerHTML = "\n            <input type=\"text\" class=\"todo-list__value\" disabled value=\"".concat(this.value, "\">\n            <button class=\"todo-list__btn-edit\"><i class=\"far fa-edit\"></i></button>\n            <button class=\"todo-list__btn-remove\"><i class=\"far fa-trash-alt\"></i></button>\n        ");
      return taskDoneItem;
    }
  }, {
    key: "createUndoneTask",
    // Create task with status "Undone"
    value: function createUndoneTask() {
      var taskUndoneItem = document.createElement("li");
      taskUndoneItem.className = "todo-list__item";
      taskUndoneItem.innerHTML = "\n            <input type=\"text\" class=\"todo-list__value\" disabled value=\"".concat(this.value, "\">\n            <button class=\"todo-list__btn-edit\"><i class=\"far fa-edit\"></i></button>\n            <button class=\"todo-list__btn-remove\"><i class=\"far fa-trash-alt\"></i></button>\n        ");
      return taskUndoneItem;
    }
  }]);

  return Task;
}();

; // Class for create tasks list

var List =
/*#__PURE__*/
function () {
  function List(taskInput, taskListDone, taskListUnDone) {
    _classCallCheck(this, List);

    this.taskInput = taskInput;
    this.taskListDone = taskListDone;
    this.taskListUnDone = taskListUnDone;
    this.undoneTaskArr = JSON.parse(localStorage.getItem("undoneTask")) || [];
    this.doneTaskArr = JSON.parse(localStorage.getItem("doneTask")) || [];
    this.renderUndoneTask();
    this.renderDoneTask();
  }

  _createClass(List, [{
    key: "renderUndoneTask",
    // Render Undone tasks list
    value: function renderUndoneTask() {
      for (var i = 0; i < this.undoneTaskArr.length; i++) {
        var task = new Task(this.undoneTaskArr[i]);
        this.taskListUnDone.appendChild(task.createUndoneTask());
      }

      ;
    }
  }, {
    key: "renderDoneTask",
    // Render Done tasks list
    value: function renderDoneTask() {
      for (var i = 0; i < this.doneTaskArr.length; i++) {
        var task = new Task(this.doneTaskArr[i]);
        this.taskListDone.appendChild(task.createDoneTask());
      }

      ;
    }
  }, {
    key: "addTask",
    // Create new task
    value: function addTask() {
      if (this.taskInput.value === "") {
        alert("Add Task!!!");
      } else {
        var task = new Task(this.taskInput.value);
        this.undoneTaskArr.push(this.taskInput.value);
        this.taskListUnDone.appendChild(task.createUndoneTask());
        this.taskToLocal("undoneTask", this.undoneTaskArr);
        this.taskInput.value = "";
      }

      ;
    }
  }, {
    key: "removeTask",
    // Remove task form list
    value: function removeTask(target) {
      if (!target.classList.contains("todo-list__btn-remove")) return;
      var li = target.parentElement;

      if (li.classList.contains("todo-list__item--done")) {
        var index = _toConsumableArray(li.parentElement.children).indexOf(li);

        this.doneTaskArr.splice(index - 1, 1);
        this.taskToLocal("doneTask", this.doneTaskArr);
        li.remove();
      } else {
        var _index = _toConsumableArray(li.parentElement.children).indexOf(li);

        this.undoneTaskArr.splice(_index - 1, 1);
        this.taskToLocal("undoneTask", this.undoneTaskArr);
        li.remove();
      }
    }
  }, {
    key: "editTask",
    // Editing task
    value: function editTask(target) {
      if (!target.classList.contains("todo-list__btn-edit")) return;
      var li = target.parentElement;
      var input = target.previousElementSibling;

      if (input.disabled === true) {
        input.disabled = false;
        input.classList.add("todo-list__value--editable");
        input.focus();
      } else {
        this.saveEditTask(li, input);
        input.disabled = true;
        input.classList.remove("todo-list__value--editable");
      }

      ;
    }
  }, {
    key: "saveEditTask",
    // Saving changes after editing
    value: function saveEditTask(li, input) {
      var index = _toConsumableArray(li.parentElement.children).indexOf(li);

      if (li.classList.contains("todo-list__item--done")) {
        this.doneTaskArr.splice(index - 1, 1, input.value);
        this.taskToLocal("doneTask", this.doneTaskArr);
      } else {
        this.undoneTaskArr.splice(index - 1, 1, input.value);
        this.taskToLocal("undoneTask", this.undoneTaskArr);
      }
    }
  }, {
    key: "checkTask",
    // Task status check
    value: function checkTask(target) {
      if (!target.classList.contains("todo-list__item")) return;

      if (target.classList.contains("todo-list__item--done")) {
        this.doTaskUndone(target);
      } else {
        this.doTaskDone(target);
      }
    } // Add "Done" status for task

  }, {
    key: "doTaskDone",
    value: function doTaskDone(target) {
      var index = _toConsumableArray(target.parentElement.children).indexOf(target);

      this.undoneTaskArr.splice(index - 1, 1);
      this.doneTaskArr.push(target.children[0].value);
      this.taskToLocal("undoneTask", this.undoneTaskArr);
      this.taskToLocal("doneTask", this.doneTaskArr);
      var task = new Task(target.children[0].value);
      this.taskListDone.appendChild(task.createDoneTask());
      target.remove();
      console.log(index);
    } // Add "Undone" status for task

  }, {
    key: "doTaskUndone",
    value: function doTaskUndone(target) {
      var index = _toConsumableArray(target.parentElement.children).indexOf(target);

      this.doneTaskArr.splice(index - 1, 1);
      this.undoneTaskArr.push(target.children[0].value);
      this.taskToLocal("undoneTask", this.undoneTaskArr);
      this.taskToLocal("doneTask", this.doneTaskArr);
      var task = new Task(target.children[0].value);
      this.taskListUnDone.appendChild(task.createUndoneTask());
      target.remove();
    } // Save information to localStorage

  }, {
    key: "taskToLocal",
    value: function taskToLocal(name, arr) {
      localStorage.setItem(name, JSON.stringify(arr));
    }
  }]);

  return List;
}();

;
var taskInput = document.querySelector(".todo-list__input");
var taskAdd = document.querySelector(".todo-list__btn-add");
var todo = document.querySelector(".todo-list");
var doneList = document.querySelector(".todo-list__items-done");
var undoneList = document.querySelector(".todo-list__items-undone");
var list = new List(taskInput, doneList, undoneList);
todo.addEventListener("click", function (e) {
  var target = e.target;
  list.removeTask(target);
  list.editTask(target);
  list.checkTask(target);
});
taskAdd.addEventListener("click", function () {
  list.addTask();
});
taskInput.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    list.addTask();
  }
});