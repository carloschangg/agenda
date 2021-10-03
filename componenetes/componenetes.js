
import { Todo } from "../classes/todo.js";
import { todoList } from "../index.js";


const $todoList             = document.querySelector(".todo-list"),
      $input                = document.querySelector(".new-todo"),
      $btnBorrarCompletados = document.querySelector(".clear-completed"),
      $ulFilter             = document.querySelector(".filters"),
      $filtros              = document.querySelectorAll(".filtro");

export default function crearHtml (todo){
    const CreandoHTML = `
    <li  data-id=${todo.id} class=${(todo.completada) ? "completed" : ""}>
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completada) ? "checked" : ""}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const $div =  document.createElement("div");

    $div.innerHTML =  CreandoHTML;
    $todoList.appendChild($div.firstElementChild);

    
}

$input.addEventListener("keyup", (e) => {

    if(e.keyCode === 13 && $input.value.length > 0){
        
        const nuevoTodo = new Todo($input.value);

        todoList.nuevoTodo(nuevoTodo)
        crearHtml(nuevoTodo)
        $input.value = "";
    }
})

$todoList.addEventListener("click", (e)=> {
    // console.log(e.target.localName);

    const nombreElemento = e.target.localName;
    const todoElemento   = e.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute("data-id"); 
    
    // console.log(todoId,todoElemento);

    if(nombreElemento.includes("input")){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle("completed");
    }

    if(nombreElemento.includes("button")){
        todoList.eliminarTodo(todoId);
        $todoList.removeChild(todoElemento)
    }

});

$btnBorrarCompletados.addEventListener("click", e => {
    // console.log(e.target.localName);

    todoList.eliminarCompletados();
    for(let i = $todoList.children.length - 1; i >= 0; i-- ){

        const elemento = $todoList.children[i];
        
        if(elemento.classList.contains("completed")){
            $todoList.removeChild(elemento);
        }

    }
});

$ulFilter.addEventListener("click", e => {

    const filtro = e.target.text;

    if(!filtro) {
        return
    };

    $filtros.forEach(el => {el.classList.remove("selected")});
    e.target.classList.add("selected");



    for(const elemento of $todoList.children){
       
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains("completed");

        switch(filtro){
            case "Pendientes":
                if(completado){
                    elemento.classList.add("hidden")
                };
            break;
               
            case "Completados":
                if(!completado){
                    elemento.classList.add("hidden")
                }
            break;
        }

    }

})
