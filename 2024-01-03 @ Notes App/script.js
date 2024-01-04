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
    const index = notesArray.findIndex(
      (note) =>
        note.title === title && note.content === content && note.date === date
    );
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

// Open note (CSS class note-view)
document
  .getElementById("notesContainer")
  .addEventListener("click", function (e) {
    // Get note index from notesArray
    const noteIndex = Array.from(e.target.closest(".note").parentNode.children)
      .reverse()
      .indexOf(e.target.closest(".note"));

    // Get note from notesArray
    const note = notesArray[noteIndex];

    // Check if note is defined
    if (note) {
      // Get note title
      const noteTitle = note.title;

      // Get note content
      let noteContent = note.content;

      // Get note date
      const noteDate = note.date;

      // Display the note
      document.getElementById("note-view").style.display = "flex";

      // Add note to the note view
      document.getElementById("note-view").innerHTML = `
        <div class="note-view-title">
            <h2>${noteTitle}</h2>
            <p>${noteDate}</p>
        </div>
        <hr>
        <div class="note-view-content">
            <textarea>${noteContent}</textarea>
        </div>
      `;

      // Enable editing of note content
      const noteContentElement = document.querySelector(".note-view-content textarea");
      noteContentElement.addEventListener("input", function (e) {
        noteContent = e.target.value;
      });
    }
  });

// Close note view
// document.getElementById("note-view").addEventListener("click", function (e) {
//   // Hide the note view
//   document.getElementById("note-view").style.display = "none";
// });

// Change textarea size based on content inside .note-view-content > textarea
document.querySelector(".note-view-content textarea").addEventListener("change", function (e) {
  e.target.style.height = "auto";
  e.target.style.height = e.target.scrollHeight + "px";
});