let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = task;
        listItem.onclick = () => toggleDone(index);

        const closeButton = document.createElement('span');
        closeButton.innerText = '×';
        closeButton.className = 'close';
        closeButton.onclick = () => deleteTask(index);

        listItem.appendChild(closeButton);
        taskList.appendChild(listItem);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function newElement() {
    const input = document.getElementById('task');
    const taskText = input.value.trim();

    if (taskText !== '') {
        tasks.push(taskText);
        input.value = '';
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleDone(index) {
    const taskList = document.getElementById('list');
    const listItem = taskList.getElementsByTagName('li')[index];

    if (listItem.classList.contains('checked')) {
        listItem.classList.remove('checked');
    } else {
        listItem.classList.add('checked');
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function showToast(message, type) {
    const toastContainer = document.getElementById('toastContainer');

    const toastDiv = document.createElement('div');
    toastDiv.classList.add('toast');
    toastDiv.setAttribute('role', 'alert');
    toastDiv.setAttribute('aria-live', 'assertive');
    toastDiv.setAttribute('aria-atomic', 'true');

    const toastBody = document.createElement('div');
    toastBody.classList.add('toast-body');
    toastBody.innerText = message;

    toastDiv.appendChild(toastBody);
    toastContainer.appendChild(toastDiv);

    const toast = new bootstrap.Toast(toastDiv, { delay: 4000 });

    // İlgili tipe göre toast rengini belirleyelim
    if (type === 'success') {
        toastDiv.classList.add('bg-success', 'text-white');
    } else if (type === 'error') {
        toastDiv.classList.add('bg-danger', 'text-white');
    }

    toast.show();

    setTimeout(() => {
        toastContainer.removeChild(toastDiv);
    }, 4000);
}

function newElement() {
    const input = document.getElementById('task');
    const taskText = input.value.trim();

    if (taskText !== '') {
        tasks.push(taskText);
        input.value = '';
        renderTasks();
        showToast('Listeye eklendi.', 'success'); // Başarılı ekleme bildirimi göster
    } else {
        showToast('Listeye boş ekleme yapamazsınız!', 'error'); // Hata bildirimi göster
    }
}
// Sayfa yüklendiğinde görevleri listelemek için renderTasks çağırıyoruz
renderTasks();
