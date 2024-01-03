// Notes array
let notesArray = [];
let notesStorage = JSON.parse(localStorage.getItem("notesArray")) || [];

// Open note form for its creation
document.getElementById("addNote").addEventListener("click", function () {
  // Display the form
  document.getElementById("formNote").style.display = "flex";
});

// Create note
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const data = new FormData(e.target);

  // Get form values
  const title = data.get("title");
  const content = data.get("content");
  const date = new Date().toLocaleString();

  // Create note
  createNote(title, content, date);

  // Close form
  closeForm();
});

function createNote(title, content, date) {
  // Note validation
  if (title === "" || content === "") {
    alert("Please fill in both fields!");
  } else if (title.length > 20) {
    alert("Title is too long! Maximum 20 characters!");
  } else {
    // Create note
    let note = {
      title: title,
      content: content,
      date: date,
    };

    // Add note to the container
    document.getElementById("notesContainer").innerHTML += `
        <div class="note">
            <div class="noteTitle">
                <h2>${note.title}</h2>
                <p>${note.date}</p>
            </div>
        </div>
    `;

    // Add note to the notes array
    notesArray.push(note);

    // Save the note to local storage
    localStorage.setItem("notesArray", JSON.stringify(notesArray));
    console.log(localStorage.getItem("notesArray"));
  }
}

// Delete note with right click on that note
document
  .getElementById("notesContainer")
  .addEventListener("contextmenu", function (e) {
    // Prevent default context menu
    e.preventDefault();

    // Get note title
    const noteTitle = e.target.closest(".note").querySelector("h2").innerHTML;

    // Get note content
    const noteContent = e.target.closest(".note").querySelector("p").innerHTML;

    // Get note date
    const noteDate = e.target.closest(".note").querySelector("p").innerHTML;

    // Delete note from the container
    e.target.closest(".note").remove();

    // Delete note from the notes array
    const index = notesArray.findIndex((note) => note.title === title && note.content === content && note.date === date);
    notesArray.splice(index, 1); // Use splice to remove the item
    localStorage.setItem("notesArray", JSON.stringify(notesArray));
  });

// Close form
function closeForm() {
  // Hide the form
  document.getElementById("formNote").style.display = "none";

  // Clean form values
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

// Cancel note creation
document.getElementById("cancelNote").addEventListener("click", function (e) {
  e.preventDefault();

  // Close form
  closeForm();
});

// Clear all notes
function clearAll() {
  // Clear notes container
  document.getElementById("notesContainer").innerHTML = "";

  // Clear notes array
  notesArray = [];

  // Clean local storage
  localStorage.clear();
}

// Load localStorage notes on page load
window.onload = function loadNotes() {
  // Load notes from localStorage
  notesArray = JSON.parse(localStorage.getItem("notesArray")) || [];

  notesArray.forEach((note) => {
    // Add note to the container
    document.getElementById("notesContainer").innerHTML += `
        <div class="note">
            <div class="noteTitle">
                <h2>${note.title}</h2>
                <p>${note.date}</p>
            </div>
        </div>
    `;
  });
};
