import { setFilters } from './filters'
import { saveTodos, loadTodos, createTodo } from './todos'
import { renderToDoList } from './views'

//initial rendering of mutable application elements

renderToDoList()

// static elements of application that do not require re-rendering upon updating input or filters

document.querySelector ('#filter-task').addEventListener ('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderToDoList()
})

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

document.querySelector ('#hide-completed').addEventListener ('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderToDoList()
    
})

//watcher for local storage

window.addEventListener('storage', (e) => {
    if (e.key === 'toDoList') {
        loadTodos()
        renderToDoList()
    }
})