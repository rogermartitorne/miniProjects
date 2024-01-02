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
  if (content === "" || content === null) {
    alert("You must write something!");
  } else if (content.length > 30) {
    alert("Todo content should not exceed 30 characters!");
  } else {
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
    todo.addEventListener("click", completeTodo);
    todo.addEventListener("touchstart", completeTodo);
    todo.addEventListener("touchend", completeTodo);

    function completeTodo() {
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

    let touchStartX;
    let touchStartY;
    const minMoveDistance = 150; // Puedes ajustar este valor según tus necesidades

    todo.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    let swipeDirection;

    todo.addEventListener("touchmove", function (e) {
      const touchMoveX = e.touches[0].clientX;
      const touchMoveY = e.touches[0].clientY;

      const distanceX = Math.abs(touchMoveX - touchStartX);
      const distanceY = Math.abs(touchMoveY - touchStartY);

      if (touchMoveX < touchStartX) {
        swipeDirection = "left";
      } else {
        swipeDirection = "right";
      }

      // Do not call deleteTodo here
    });

    todo.addEventListener("touchend", function (e) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const distanceX = Math.abs(touchEndX - touchStartX);
      const distanceY = Math.abs(touchEndY - touchStartY);

      if (distanceX > minMoveDistance || distanceY > minMoveDistance) {
        // The touch has moved far enough, call the deleteTodo function
        deleteTodo(e);
      }
    });

    function deleteTodo(e) {
      e.preventDefault();

      // Remove the todo from the array
      const index = todos.findIndex((todo) => todo.todoKey === todoKey);
      todos.splice(index, 1); // Use splice to remove the item
      localStorage.setItem("todos", JSON.stringify(todos));

      // Add the delete class to start the animation
      if (swipeDirection === "left") {
        todo.classList.add("todo-delete-left");
      } else {
        todo.classList.add("todo-delete-right");
      }

      // Remove the todo from the DOM after the animation is done
      setTimeout(() => {
        todo.remove();
      }, 500); // Adjust the delay time (in milliseconds) as needed

      // Restart variables
      touchStartX = null;
      touchStartY = null;
    }
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
