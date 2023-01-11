// Select Elements
const form = document.getElementById('form-note');

// Event Listeners
myEvents();

// Functions

// Func : list EventListeners
function myEvents(){
    form.addEventListener('submit', addNote);
}
