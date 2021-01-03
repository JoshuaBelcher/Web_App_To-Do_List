import uuidv4 from 'uuid/v4'

let toDoList = []

// get saved todo list from local storage if one exists
const loadTodos = () => {
    const toDoListJSON = localStorage.getItem('toDoList')

    try {
        toDoList = toDoListJSON ? JSON.parse(toDoListJSON) : []
    } catch(e) {
        toDoList = []
    }
}

// populate the array that was created above
loadTodos()

// save new todo entries to local storage
const saveTodos = () => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
}


// getter function to expose notes from this module
const getTodos = () => toDoList

// function to create a new todo object:
// pass in user's text, assign unique id code, default to not completed, and add to array
const createTodo = (text) => {
    toDoList.push({
        id: uuidv4(),
        text: text,
        complete: false,
    })

    saveTodos()
}

// remove a todo object, as designatd by id code
const removeTodo = (id) => {
    const todoIndex = toDoList.findIndex ((todo) => todo.id===id)

    if (todoIndex > -1){
        toDoList.splice(todoIndex, 1)
    }
    saveTodos()
}

// toggle a task complete/incomplete, as designated by id code
const toggleTodo = (id) => {
    const todo = toDoList.find ((todo) => todo.id === id)

    if (todo) {
        todo.complete = !todo.complete
    }
    saveTodos()
}

export { saveTodos, loadTodos, getTodos, createTodo, removeTodo, toggleTodo }