import { setFilters } from './filters'
import { saveTodos, loadTodos, createTodo } from './todos'
import { renderToDoList } from './views'

// initial rendering of mutable application elements

renderToDoList()

/*----event listeners for static elements of application that do not require re-rendering upon updating input or filters----*/

// changes filter value to the input typed by user
document.querySelector ('#filter-task').addEventListener ('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderToDoList()
})

// submits new task input by user, adds to todo array, saves list to storage,
// re-renders list display, then blanks input field
document.querySelector ('#new-task-form').addEventListener ('submit', (e) => {
    e.preventDefault()
    const inputText = e.target.elements.newTaskInput.value.trim()
    if (inputText) {
        createTodo(inputText)
        saveTodos()
        renderToDoList()
        e.target.elements.newTaskInput.value = ""
    }
})

// toggle whether tasks flagged as completed will be displayed or not, then re-render list
document.querySelector ('#hide-completed').addEventListener ('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderToDoList()
    
})

// watcher for a list previously saved in local storage

window.addEventListener('storage', (e) => {
    if (e.key === 'toDoList') {
        loadTodos()
        renderToDoList()
    }
})