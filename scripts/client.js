// Handles all of the array methods
// Meat N' Taters of the program

var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    this.todos.forEach(function(todo){
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    // Toggles everything to true - or false if everything is already true.
  this.todos.forEach(function(todo) {
    if (completedTodos === totalTodos) {
      todo.completed = false;
    } else {
      todo.completed = true;
    }
   });
  }
};

// This adds all of the buttons, user input and their functionality.
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  // Supposed to allow Enter to submit input fields. 
  // Duplicates input - don't know why.
  keyPress: function() {
    var input = document.getElementById('addTodoTextInput');
    input.addEventListener("keydown", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('addTodoBtn').click();
      }
    });
  },
};

// Displays the contents of the list ontop the webpage for users to see.
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
//     for (var i = 0; i < todoList.todos.length; i++) {
//     }
      todoList.todos.forEach(function(todo, position) {
         
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  // Makes a delete button appear next to every list item.
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.idName = 'deleteBtn';
    return deleteButton;
  },
// Adding event listeners and button modifications (such as delete button deleting).
  setUpEventListeners: function() {
  var todosUl = document.querySelector('ul')

  todosUl = addEventListener('click', function(event){  
    var elementClicked = event.target;
    if (elementClicked.className === 'delete-button') {
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
  });
 }
};

view.setUpEventListeners();