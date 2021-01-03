import { getFilters } from './filters'
import { getTodos, saveTodos, toggleTodo, removeTodo } from './todos'

/*----function for rendering the list of existing todo items ----*/

// render the list of todo items based on text and completion filters specified by user
const renderToDoList = () => {
    const todoEl = document.querySelector('#filtered-tasks')
    const unfilteredTodos = getTodos()
    const { searchText, hideCompleted } = getFilters()
    const filteredTodos = unfilteredTodos.filter ((todo) => {
        const searchMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const completeMatch = !hideCompleted || !todo.complete
        return searchMatch && completeMatch
    })

    // creates an array containing only incomplete tasks (used for remaining task message display)
    const filteredIncompleteTodos = filteredTodos.filter ((task) => !task.complete)

    // blanks HTML element that displays the list to prepare for new display
    todoEl.innerHTML = ""

    // displays remaining tasks message
    todoEl.appendChild(generateSummaryDOM(filteredIncompleteTodos))
    
    // if any tasks exist after filtering, they are displayed
    if (filteredTodos.length > 0) {
        filteredTodos.forEach ((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const noTodos = document.createElement('p')
        noTodos.textContent = "No tasks to show"
        noTodos.classList.add('empty-message')
        todoEl.appendChild(noTodos)
    }
}

// create the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoResult = document.createElement('label')
    const containerEl = document.createElement('div')
    //setup checkbox
    const todoCheckbox = document.createElement('input')
    todoCheckbox.setAttribute('type', 'checkbox')
    todoCheckbox.checked = todo.complete
    containerEl.appendChild(todoCheckbox)
    todoCheckbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderToDoList()
    })
    //setup task text content
    const todoText = document.createElement('span')
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    //setup container
    todoResult.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoResult.appendChild(containerEl)

    //setup remove task button
    const removeButton = document.createElement('button')
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoResult.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo (todo.id)
        renderToDoList()
    })

    return todoResult
}

// get the DOM elements for remaining tasks summary
const generateSummaryDOM = (filteredIncompleteTodos) => {
    const plural = (filteredIncompleteTodos.length === 1) ? '' : 's'
    const summaryEl = document.createElement('h2')
    summaryEl.classList.add('list-title')
    summaryEl.textContent = `You have ${filteredIncompleteTodos.length} task${plural} left to do!`
    return summaryEl
}

export { renderToDoList, generateTodoDOM, generateSummaryDOM }