const form = document.querySelector("form");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the form data
  const data = new FormData(event.target);

  // Get form data values
  const content = data.get("todo");
  const todoKey = Date.now().toString();
  const done = false;

  // Create the todo
  createTodo(todoKey, content, done);
});

function createTodo(todoKey, content, done) {
  const existingTodo = todos.find((todo) => todo.todoKey === todoKey);
  // Get the container where the cards will be added
  const container = document.getElementById("todosContainer");

  // Create the card
  const todo = document.createElement("div");

  // Set the class based on the "done" status
  todo.className = `todo ${done ? "done" : ""}`;

  // Put the content inside the card
  todo.textContent = content;

  // Add the card to the container
  let firstChild = container.firstChild;
  container.insertBefore(todo, firstChild);

  // Save the todo content to localStorage
  if (!existingTodo) {
    todos.push({ todoKey, content }); // Store the todo with its key
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Clear the form
  form.reset();

  // Add the event listener to the card for both click and touchstart events
  todo.addEventListener("click", handleTodoToggle);
  todo.addEventListener("touchstart", handleTodoToggle);
  todo.addEventListener("touchend", handleTodoToggle);

  function handleTodoToggle() {
    todo.classList.toggle("done");

    // Update the corresponding todo object in the array
    const updatedTodo = todos.find((item) => item.todoKey === todoKey);
    if (updatedTodo) {
      updatedTodo.done = todo.classList.contains("done");
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  // Add the event listener to the card
  todo.addEventListener("contextmenu", deleteTodo);
  todo.addEventListener("touchmove", deleteTodo);

  function deleteTodo(e) {
    e.preventDefault();

    // Remove the todo from the array
    const index = todos.findIndex((todo) => todo.todoKey === todoKey);
    todos.splice(index, 1); // Use splice to remove the item
    localStorage.setItem("todos", JSON.stringify(todos));

    // Remove the todo from the DOM
    todo.remove();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded", todos);

  // Check if there are todos in localStorage
  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
  }

  // Retrieve the todos content from localStorage
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Loop through the todos array
  todos.forEach((todo) => {
    createTodo(todo.todoKey, todo.content, todo.done);
  });
});

function clearAll() {
  // Clear the localStorage for todos
  localStorage.clear();

  // Clear the todos array
  todos.length = 0;

  // Clear the DOM container
  document.getElementById("todosContainer").innerHTML = "";
}
