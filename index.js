import { TodoList } from "./classes/list-todo.js";
import { Todo } from "./classes/todo.js";
import crearHtml from "./componenetes/componenetes.js";


export const todoList = new TodoList()

console.log(todoList);
todoList.todos.forEach(todo => {
    crearHtml(todo)
});