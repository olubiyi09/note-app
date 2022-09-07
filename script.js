const noteTitle = document.getElementById("note-title"),
  noteText = document.getElementById("note-area"),
  addNote = document.querySelector(".add-btn"),
  form = document.querySelector("form"),
  noteElement = document.querySelector(".note-section"),
  clearBtn = document.querySelector(".clear-note-btn");

// GET NOTE FROM THE LOCAL STORAGE
// GET NOTE FROM THE LOCAL STORAGE
// GET NOTE FROM THE LOCAL STORAGE
function getNote() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
}

// ADD EVENT LISTENER TO THE ADD NOTE BUTTON
// ADD EVENT LISTENER TO THE ADD NOTE BUTTON
// ADD EVENT LISTENER TO THE ADD NOTE BUTTON
addNote.addEventListener("click", (e) => {
  e.preventDefault();
  if (noteTitle.value == "" || noteText.value == "") {
    return alert("Please add title and text!!!");
  }

  getNote();

  let newObj = {
    title: noteTitle.value,
    text: noteText.value,
  };
  notesObj.push(newObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  form.reset();
  displayNotes();
});

// DISPLAY NOTE
// DISPLAY NOTE
// DISPLAY NOTE
function displayNotes() {
  getNote();
  let myContent = "";

  notesObj.forEach(function (note, index) {
    myContent += `
    <div class="note">
                <div class="note-top">
                  <p class="note-index">Note <span class="num">${
                    index + 1
                  }</span></p>
                  <div class="btn-wrapper">
                    <button id"${index}" onclick="deleteNote(this.id)" class="btn del-btn">
                      <i class="fas fa-trash"></i>Delete
                    </button>
                    <button id"${index}" onclick="editNote(this.id)" class="btn edit-btn">
                      <i class="fas fa-edit"></i>Edit
                    </button>
                  </div>
                </div>

                <hr />
                <p class="note-title"><strong>Title:</strong> ${note.title}</p>
                <p class="note-content">${note.text}</p>
                <!-- </div> -->
              </div>
    `;
  });

  noteElement.innerHTML = myContent;

  if (notesObj.length != 0) {
    noteElement.innerHTML = myContent;
  } else {
    noteElement.innerHTML = `<p class="empty-note">Your Note is Empty, Please add Note...</p>`;
  }
}

//DELETE NOTE
//DELETE NOTE
//DELETE NOTE
function deleteNote(index) {
  let comDel = confirm("Delete this Note?");
  if (comDel) {
    getNote();
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    displayNotes();
  }
}

//CLEAR NOTE
//CLEAR NOTE
//CLEAR NOTE
clearBtn.addEventListener("click", () => {
  if (notesObj.length != 0) {
    let delAll = confirm("Do you want to Clear the Notes?");
    if (delAll) {
      localStorage.clear();
      displayNotes();
    }
  }
});

// EDIT NOTE
// EDIT NOTE
// EDIT NOTE
function editNote(index) {
  getNote();

  noteTitle.value = notesObj[index].title;
  noteText.value = notesObj.text;

  noteTitle.focus();
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  displayNotes();
}

displayNotes();
