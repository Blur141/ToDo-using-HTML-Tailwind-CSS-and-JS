document.addEventListener("DOMContentLoaded", () => {
    const taskNameInput = document.getElementById('taskNameInput');
    const taskDescriptionInput = document.getElementById('taskDescriptionInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const addedTasks = document.getElementById('addedTasks');
    const completedTasks = document.getElementById('completedTasks');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  
    // Initially hide the Clear History button
    clearHistoryBtn.style.display = 'none';
  
    function addTask() {
      const taskName = taskNameInput.value.trim();
      const taskDescription = taskDescriptionInput.value.trim();
      const taskDate = dateInput.value;
      const taskTime = timeInput.value;
  
      if (taskName !== '' && (taskDate !== '' || taskTime !== '')) {
        const listItem = document.createElement('li');
        listItem.classList.add('border', 'border-gray-200', 'rounded', 'p-4', 'mb-2');
  
        const currentTime = new Date().toLocaleTimeString();
        const currentDate = new Date().toLocaleDateString();
        const taskDateTime = `${taskDate !== '' ? taskDate : currentDate} ${taskTime !== '' ? taskTime : currentTime}`;
  
        listItem.innerHTML = `
          <div class="font-semibold">${taskName}</div>
          <div class="text-gray-500 mb-2">${taskDateTime}</div>
          <div>${taskDescription}</div>
          <button class="text-green-500 cursor-pointer done-btn mt-2">Mark as Done</button>
        `;
  
        addedTasks.appendChild(listItem);
  
        const doneBtn = listItem.querySelector('.done-btn');
        doneBtn.addEventListener('click', function() {
          listItem.removeChild(doneBtn);
          completedTasks.appendChild(listItem);
          clearHistoryBtn.style.display = 'block'; // Show the Clear History button after a task is completed
          updateClearHistoryButtonVisibility(); // Call the function to update Clear History button visibility
        });
  
        // Clear input fields after adding a task
        taskNameInput.value = '';
        taskDescriptionInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
      } else {
        alert('Please enter a task name and select a date or time!');
      }
    }
  
    function updateClearHistoryButtonVisibility() {
      // Show or hide the Clear History button based on completed tasks
      if (completedTasks.querySelectorAll('li').length > 0) {
        clearHistoryBtn.style.display = 'block'; // Show the button if there are completed tasks
      } else {
        clearHistoryBtn.style.display = 'none'; // Hide the button if there are no completed tasks
      }
    }
  
    // Clear history button functionality
    clearHistoryBtn.addEventListener('click', function() {
      completedTasks.innerHTML = '';
      clearHistoryBtn.style.display = 'none'; // Hide the Clear History button after clearing history
    });
  
    // Event listener to add a task
    addTaskBtn.addEventListener('click', addTask);
  });
