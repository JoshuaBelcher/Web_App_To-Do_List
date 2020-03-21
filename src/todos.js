import uuidv4 from 'uuid/v4'

let toDoList = []

// Get saved todo list from local storage if one exists
const loadTodos = () => {
    const toDoListJSON = localStorage.getItem('toDoList')

    try {
        toDoList = toDoListJSON ? JSON.parse(toDoListJSON) : []
    } catch(e) {
        toDoList = []
    }
}

//populate the array that was created above
loadTodos()

// Save new todo entries to local storage
const saveTodos = () => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
}


//Expose notes from module
const getTodos = () => toDoList

//function to create a new todo
const createTodo = (text) => {
    toDoList.push({
        id: uuidv4(),
        text: text,
        complete: false,
    })

    saveTodos()
}

// remove a todo
const removeTodo = (id) => {
    const todoIndex = toDoList.findIndex ((todo) => todo.id===id)

    if (todoIndex > -1){
        toDoList.splice(todoIndex, 1)
    }
    saveTodos()
}

// toggle a task complete/incomplete
const toggleTodo = (id) => {
    const todo = toDoList.find ((todo) => todo.id === id)

    if (todo) {
        todo.complete = !todo.complete
    }
    saveTodos()
}

export { saveTodos, loadTodos, getTodos, createTodo, removeTodo, toggleTodo }