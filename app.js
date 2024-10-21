let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const categoryInput = document.getElementById('categoryInput');
    const text = taskInput.value.trim();
    const category = categoryInput.value;

    if (text) {
        tasks.push({ text: text, category: category, completed: false });
        updateTasksList();
        updateStats();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks / totalTasks) * 100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
};

const updateTasksList = () => {
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <p>${task.text}</p>
                <span class="category">${task.category}</span>
            </div>
            <div class="icons">
                <img src="./img/edit.png" class="edit-btn" data-index="${index}" />
                <img src="./img/bin.png" class="delete-btn" data-index="${index}" />
            </div>
        </div>
        `;
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        listItem.querySelector(".edit-btn").addEventListener("click", () => editTask(index));
        listItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(index));
        taskList.append(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

// Alterna entre os temas
document.getElementById('theme').addEventListener('change', function() {
    document.body.className = this.value;
});
