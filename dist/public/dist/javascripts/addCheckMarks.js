const tasks = document.getElementsByClassName("tasks")[0].children

const checkmark = "<img class='tasks_checkmark' src='/images/icons/checkmark.svg' alt='checkmark'/>"

// Insert html element after X element begins (inside)
for (let i=0; i<tasks.length; i++){ 
tasks[i].insertAdjacentHTML("afterbegin", checkmark);
}

