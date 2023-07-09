var countdown;
var timerDisplay = document.querySelector('.timer');
var startBtn = document.getElementById('startBtn');
var pauseBtn = document.getElementById('pauseBtn');
var resetBtn = document.getElementById('resetBtn');
var mode5Btn = document.getElementById('mode5Btn');
var mode15Btn = document.getElementById('mode15Btn');
var mode25Btn = document.getElementById('mode25Btn');
var mode = 25;
var counter = 0;
var taskList = document.getElementById('taskList');
var newTaskInput = document.getElementById('newTaskInput');
var addTaskBtn = document.getElementById('addTaskBtn');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
mode5Btn.addEventListener('click', setMode5);
mode15Btn.addEventListener('click', setMode15);
mode25Btn.addEventListener('click', setMode25);
addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskListClick);

if (localStorage.getItem('taskList')) {
    taskList.innerHTML = localStorage.getItem('taskList');
}

function startTimer() {
    var presentTime = timerDisplay.textContent;
    var timeArray = presentTime.split(':');
    var minutes = parseInt(timeArray[0]);
    var seconds = parseInt(timeArray[1]);

    countdown = setInterval(function () {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdown);
                timerDisplay.textContent = '00:00';
                playAlertSound(function () {
                    if (mode === 5) {
                        showAlert('Bạn đã hoàn thành 5 phút nghỉ giải lao. Giờ hãy quay lại làm việc nào!');
                    } else if (mode === 15) {
                        showAlert('Bạn đã hoàn thành 15 phút nghỉ giải lao. Giờ hãy quay lại làm việc nào!');
                    } else if (mode === 25) {
                        counter++;
                        if (counter % 4 === 0) {
                            showAlert('Bạn đã hoàn thành 4 lần làm việc 25 phút. Giờ bạn hãy nghỉ giải lao 15 phút!');
                        } else {
                            showAlert('Bạn đã hoàn thành 25 phút làm việc. Giờ hãy nghỉ giải lao 5 phút!');
                        }
                    }
                });
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        timerDisplay.textContent = formatTime(minutes) + ':' + formatTime(seconds);
    }, 1000);

    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
}

function pauseTimer() {
    clearInterval(countdown);
    pauseBtn.style.display = 'none';
    startBtn.style.display = 'inline-block';
    pauseBtn.textContent = 'Tạm dừng';
}

function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = formatTime(mode) + ':00';
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    pauseBtn.textContent = 'Tạm dừng';
}

function setMode5() {
    mode = 5;
    resetTimer();
}

function setMode15() {
    mode = 15;
    resetTimer();
}

function setMode25() {
    mode = 25;
    resetTimer();
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function playAlertSound(callback) {
    var alertSound = document.getElementById('alertSound');
    alertSound.play();
    alertSound.onended = callback;
}

function showAlert(message) {
    playAlertSound(function () {
        alert(message);
    });
}

// function addTask() {
//     var taskText = newTaskInput.value.trim();
//     if (taskText !== '') {
//         var taskItem = document.createElement('li');
//         taskItem.className = 'task-item';

//         var checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';

//         var taskLabel = document.createElement('label');
//         taskLabel.textContent = taskText;

//         var editButton = document.createElement('button');
//         editButton.className = 'editBtn';
//         editButton.textContent = 'Sửa';

//         var deleteButton = document.createElement('button');
//         deleteButton.className = 'deleteBtn';
//         deleteButton.textContent = 'Xóa';

//         taskItem.appendChild(checkbox);
//         taskItem.appendChild(taskLabel);
//         taskItem.appendChild(editButton);
//         taskItem.appendChild(deleteButton);

//         taskList.appendChild(taskItem);

//         newTaskInput.value = '';
//     }
// }

// function handleTaskListClick(event) {
//     var target = event.target;
//     if (target.matches('.editBtn')) {
//         var taskItem = target.parentNode;
//         var taskLabel = taskItem.querySelector('label');
//         var newText = prompt('Nhập nội dung công việc mới', taskLabel.textContent);
//         if (newText !== null) {
//             taskLabel.textContent = newText;
//         }
//     } else if (target.matches('.deleteBtn')) {
//         var taskItem = target.parentNode;
//         taskList.removeChild(taskItem);
//     }
// }

function addTask() {
    var taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        var taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        var taskLabel = document.createElement('label');
        taskLabel.textContent = taskText;

        var editButton = document.createElement('button');
        editButton.className = 'editBtn';
        editButton.textContent = 'Sửa';

        var deleteButton = document.createElement('button');
        deleteButton.className = 'deleteBtn';
        deleteButton.textContent = 'Xóa';

        var noteInput = document.createElement('textarea');
        noteInput.type = 'text';
        noteInput.placeholder = 'Ghi chú';
        noteInput.className = 'noteInput';

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(noteInput);

        taskList.appendChild(taskItem);

        newTaskInput.value = '';

        localStorage.setItem('taskList', taskList.innerHTML);
    }
}

function handleTaskListClick(event) {
    var target = event.target;
    if (target.matches('.editBtn')) {
        var taskItem = target.parentNode;
        var taskLabel = taskItem.querySelector('label');
        var newText = prompt('Nhập nội dung công việc mới', taskLabel.textContent);
        if (newText !== null) {
            taskLabel.textContent = newText;
        }
    } else if (target.matches('.deleteBtn')) {
        var taskItem = target.parentNode;
        var taskLabel = taskItem.querySelector('label');
        var confirmDelete = confirm('Bạn có chắc chắn muốn xóa công việc "' + taskLabel.textContent + '" không?');
        if (confirmDelete) {
            taskList.removeChild(taskItem);
        }
    }
    localStorage.setItem('taskList', taskList.innerHTML);

    // cho item vừa check xuống cuối danh sách
    // else if (target.type === 'checkbox') {
    //     var taskItem = target.parentNode;
    //     taskList.removeChild(taskItem);
    //     taskList.appendChild(taskItem);
    //     target.checked = false;
    // }
}



