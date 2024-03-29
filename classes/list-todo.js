import { Todo } from "./todo.js";

export class TodoList {
    constructor(todo){
        //  this.todos = [];
       this. cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        for(const todo of this.todos){
            if(todo.id === id){

                todo.completado  = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    };

    eliminarTodo(id){
       this.todos = this.todos.filter(todo => todo.id != id);
       this.guardarLocalStorage();
    };

    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){

        if(localStorage.getItem('todo')){

            this.todos = JSON.parse(localStorage.getItem('todo')); 

        } else{
            this.todos =[];
        }

        this.todos = this.todos.map( obj => Todo.fromJson(obj) )
    }
    
}