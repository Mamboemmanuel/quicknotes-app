// Select elements with querySelector
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// Load notes from localStorage or initialize empty array
let notes = JSON.parse(localStorage.getItem("quicknotes_notes")) || [];

// Helper to format creation date
function getReadableDate() {
  const now = new Date();
  return now.toLocaleString();
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem("quicknotes_notes", JSON.stringify(notes));
}

// Update the note count message
function updateCount(filteredNotesCount, totalNotesCount) {
  if (totalNotesCount === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (totalNotesCount === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${totalNotesCount} notes.`;
  }
}

// Render notes list based on search filter
function render() {
  notesList.innerHTML = "";
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Filter notes based on search query
  const filteredNotes = notes.filter(note => 
    note.text.toLowerCase().includes(searchTerm)
  );

  updateCount(filteredNotes.length, notes.length);

  if (filteredNotes.length === 0) {
    const li = document.createElement("li");
    if (notes.length > 0) {
      li.textContent = "No notes match your search.";
      li.style.color = "#7f8c8d";
      li.style.fontStyle = "italic";
      li.style.textAlign = "center";
      li.style.padding = "1rem";
    }
    notesList.appendChild(li);
    return;
  }

  // Rebuild list using createElement and textContent (never innerHTML for user text)
  filteredNotes.forEach(note => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category}`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "note-content";

    const pText = document.createElement("p");
    pText.className = "note-text-body";
    pText.textContent = note.text; // Safe from XSS

    const metaDiv = document.createElement("div");
    metaDiv.className = "note-meta";

    const spanCategory = document.createElement("span");
    spanCategory.className = "category-badge";
    spanCategory.textContent = `Category: ${note.category}`;

    const spanDate = document.createElement("span");
    spanDate.className = "note-date";
    spanDate.textContent = note.createdAt;

    metaDiv.appendChild(spanCategory);
    metaDiv.appendChild(spanDate);

    contentDiv.appendChild(pText);
    contentDiv.appendChild(metaDiv);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      deleteNote(note.id);
    });

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

// Add note event handler with validation
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  const category = noteCategory.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear error message on successful validation
  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: getReadableDate()
  };

  notes.unshift(newNote);
  saveNotes();
  render();

  // Clear the input
  noteInput.value = "";
});

// Delete note function
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  render();
}

// Search event listener
searchInput.addEventListener("input", () => {
  render();
});

// Initial render on page load
render();