import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'all',
    completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Gema del Espacio'),
        new Todo('Gema de la Mente'),
        new Todo('Gema de la Realidad'),
        new Todo('Gema del Poder'),
        new Todo('Gema del Tiempo'),
        new Todo('Gema del Alma'),

    ],
    filter: Filters.All,
}



const initStore = () => {
    loadStore();
    console.log('InitStore');
}

const loadStore = () =>{
    // console.log( localStorage.getItem('state'));//Muestra el local storage
    if( !localStorage.getItem('state')) return;

    const { todos = [] , filter = Filters.All } = JSON.parse(localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocoalStorage = () => {
    // console.log(JSON.stringify(state));//Visualiza JSON.stringify(state)
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * 
 * @param {String} filter Object requiredd, default value Filters.All
 */
const getTodos = (filter = Filters.All) => {
    switch( filter ) {
        case Filters.All:
            return [...state.todos];

        case Filters.completed:
            return state.todos.filter( todo => todo.done);

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);

        default:
            throw new Error(`Optino ${ filter } is not valid.`);
    }
}

/**
 * 
 * @param {String} description Description of todo
 */
const addTodo = ( description) =>{
    if( !description ) throw new Error ('Description is required');
    state.todos.push( new Todo(description) );

    saveStateToLocoalStorage();
}

/**
 * 
 * @param {String} todoId Todo identifier
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map(todo => {
        if( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    }),
    saveStateToLocoalStorage();
}

/**
 * 
 * @param {String} todoId  Todo identifier
 */
const deleteTodo = ( todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocoalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocoalStorage();
}

/**
 * 
 * @param {Filters} newFilter default Filters.All
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocoalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}