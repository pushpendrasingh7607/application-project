document.getElementById('addTaskButton').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = {
        text: taskText,
        completed: false,
        addedTime: new Date().toLocaleString(),
        completedTime: null
    };

    taskInput.value = ""; // Clear input
    renderTasks();
}

let tasks = [];

function renderTasks() {
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text + ' (Added: ' + task.addedTime + ')';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        if (task.completed) {
            listItem.classList.add('completed');
            listItem.textContent += ' (Completed: ' + task.completedTime + ')';
            completedTasksList.appendChild(listItem);
        } else {
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.onclick = () => completeTask(index);
            listItem.appendChild(completeButton);
            pendingTasksList.appendChild(listItem);
        }

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
    });
}

function completeTask(index) {
    tasks[index].completed = true;
    tasks[index].completedTime = new Date().toLocaleString();
    renderTasks();
}

function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText) {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}