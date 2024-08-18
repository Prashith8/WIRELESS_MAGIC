document.addEventListener('DOMContentLoaded', () => {
    const addUpdateBtn = document.getElementById('AddUpdateClick');
    const todoText = document.getElementById('todoText');
    const listItems = document.getElementById('list-items');

    // Function to load items from localStorage
    const loadItems = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => createTodoElement(todo));
    };

    // Function to display a message to the user
    const displayMessage = (message, color = 'green') => {
        const messageElement = document.createElement('h5');
        messageElement.textContent = message;
        messageElement.style.color = color;
        listItems.before(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 2000);
    };

    // Function to create a todo element and append it to the DOM
    const createTodoElement = (text) => {
        const li = document.createElement('li');
        li.textContent = text;

        const editBtn = document.createElement('span');
        editBtn.innerHTML = '🖉';
        editBtn.classList.add('todo-controls');
        editBtn.addEventListener('click', () => {
            editTodoItem(li, text);
        });

        const deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.classList.add('todo-controls');
        deleteBtn.addEventListener('click', () => {
            deleteTodoItem(li, text);
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        listItems.appendChild(li);
    };

    // Function to handle the addition of a new todo item
    const addTodoItem = () => {
        const text = todoText.value.trim();

        if (text === '') {
            displayMessage('Please enter your todo text!', 'red');
            return;
        }

        let todos = JSON.parse(localStorage.getItem('todos')) || [];

        if (todos.includes(text)) {
            displayMessage('This item is already present in the list!', 'red');
            return;
        }

        todos.push(text);
        localStorage.setItem('todos', JSON.stringify(todos));
        createTodoElement(text);

        todoText.value = '';
        displayMessage('Todo item Created Successfully!');
    };

    // Function to edit a todo item
    const editTodoItem = (li, text) => {
        todoText.value = text;
        deleteTodoItem(li, text);
    };

    // Function to delete a todo item
    const deleteTodoItem = (li, text) => {
        li.remove();
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo !== text);
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Event listener for Add/Update button
    addUpdateBtn.addEventListener('click', addTodoItem);

    // Optional: Add item by pressing "Enter" key
    todoText.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodoItem();
        }
    });

    // Load existing items on page load
    loadItems();
});
