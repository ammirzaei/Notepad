// notes key in localStorage
const key = 'notes';

// Select Elements
const form = document.getElementById('form-note');
const note = document.querySelector('#note');
const listNotes = document.getElementById('list-notes');
const statusNote = document.getElementById('status-note');
const count = document.getElementById('count');


// Event Listeners
myEvents();

// Functions

// Func : list EventListeners
function myEvents() {
    form.addEventListener('submit', addNote);
    window.addEventListener('load', initializeNotes);
}

// Func : Add Note
function addNote(e) {
    e.preventDefault();

    // get note value
    const noteValue = note.value.trim();

    if (noteValue != '') {
        // add to localStorage
        addNoteToLocalStorage(noteValue);

        // add to list Notes elements
        createNoteElement(noteValue);

        // show success message
        showStatusNote(true);
    } else {
        // show unsuccess message
        showStatusNote(false);
    }

    // reset form
    this.reset();
}

// Func : add note to LocalStorage
function addNoteToLocalStorage(note) {
    const notes = fetchNotes(); // get all notes in localStorage

    // validation for not duplicated
    if (!notes.find(n => n === note)) {
        // push to notes
        notes.push(note);

        // save all notes to localStorage
        saveNotes(notes);
    }
}

// Func : Fetching notes in LocalStorage
function fetchNotes() {
    const notes = localStorage.getItem(key);

    // checking is exist notes in localStorage
    if (notes)
        return JSON.parse(notes);
    else
        return [];
}

// Func : Saving notes to LocalStorage
function saveNotes(notes) {
    localStorage.setItem(key, JSON.stringify(notes));
}

// Func : Create note Element
function createNoteElement(note) {
    // create li : note
    const li = document.createElement('li');
    li.classList.add('note');

    // create span : note text
    const span = document.createElement('span');
    span.id = 'note';
    span.appendChild(document.createTextNode(note));

    // create i : removed note
    const i = document.createElement('i');
    i.id = 'remove-note';
    i.classList = 'fa fa-trash';

    // append span & i Element to li Element
    li.appendChild(span);
    li.appendChild(i);

    // append i Element to list Notes
    listNotes.appendChild(li);
}

// Func : Show status message
function showStatusNote(status) {
    if (status) {
        // Success
        statusNote.innerHTML = 'یادداشت را اضافه کردم.';
        statusNote.classList = 'label-note-success';
    } else {
        // Unsuccess
        statusNote.innerHTML = 'یادداشتی را وارد کن!';
        statusNote.classList = 'label-note-unsuccess';
    }
    setTimeout(() => {
        statusNote.innerHTML = '';
    }, 4000);
}

// Func : initialize notes
function initializeNotes() {
    const notes = fetchNotes();
    notes.forEach(note => {
        createNoteElement(note);
    });

    // set count notes
    count.innerHTML = notes.length;
}