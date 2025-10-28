<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Handling in To-Do App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .todo-list {
            list-style-type: none;
            padding: 0;
        }
        .todo-item {
            margin: 10px 0;
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
        }
        .done {
            text-decoration: line-through;
            color: grey;
        }
        .edit-btn {
            background-color: #4CAF50;
            color: white;
            padding: 5px 10px;
            border: none;
            cursor: pointer;
        }
        .delete-btn {
            background-color: red;
            color: white;
            padding: 5px 10px;
            border: none;
            cursor: pointer;
        }
        .add-todo {
            padding: 10px;
            margin-bottom: 20px;
        }
        .new-todo {
            padding: 5px;
        }
    </style>
</head>
<body>

    <h1>To-Do List</h1>

    <div class="add-todo">
        <input type="text" class="new-todo" placeholder="Enter a new task...">
        <button class="add-btn">Add Task</button>
    </div>

    <ul class="todo-list">
        <!-- Todo items will be dynamically added here -->
    </ul>

    <script>
        // Elements
        const addBtn = document.querySelector('.add-btn');
        const newTodoInput = document.querySelector('.new-todo');
        const todoList = document.querySelector('.todo-list');

        // 1. Add Todo
        addBtn.addEventListener('click', function() {
            const todoText = newTodoInput.value.trim();
            if (todoText) {
                addTodoToList(todoText);
                newTodoInput.value = ''; // Clear the input after adding
            }
        });

        // 2. Event Delegation: Handle Edit and Delete actions
        todoList.addEventListener('click', function(event) {
            if (event.target.classList.contains('delete-btn')) {
                const todoItem = event.target.closest('.todo-item');
                todoItem.remove(); // Remove the todo item
            } else if (event.target.classList.contains('edit-btn')) {
                const todoItem = event.target.closest('.todo-item');
                const todoText = todoItem.querySelector('.todo-text');
                const newText = prompt("Edit your task:", todoText.textContent);
                if (newText !== null && newText.trim() !== "") {
                    todoText.textContent = newText;
                }
            } else if (event.target.classList.contains('todo-text')) {
                // 3. Toggle Done/Undone when clicking on the todo text
                event.target.classList.toggle('done');
            }
        });

        // 4. Adding a Todo Item (Separate Function)
        function addTodoToList(todoText) {
            const li = document.createElement('li');
            li.classList.add('todo-item');

            // Create the todo text
            const span = document.createElement('span');
            span.classList.add('todo-text');
            span.textContent = todoText;

            // Create the edit button
            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.textContent = 'Edit';

            // Create the delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Delete';

            // Append elements to the list item
            li.append(span, editBtn, deleteBtn);
            todoList.appendChild(li);
        }

        // 5. Listen for custom events (for example, after editing a task)
        document.addEventListener('taskEdited', function(event) {
            console.log('Task edited:', event.detail);
        });

        // Trigger a custom event after a task is edited
        function triggerTaskEditedEvent(taskText) {
            const event = new CustomEvent('taskEdited', {
                detail: taskText
            });
            document.dispatchEvent(event);
        }

        // Example of triggering the custom event
        // You could use this in the edit functionality if needed
        // triggerTaskEditedEvent('Edited task');
    </script>

</body>
</html>
