//Creamos la clase
class Calculator {
    //Pasamos los dos parámetros, donde hacemos la operacion y donde guardamos la anterior operación
    constructor(saveOperationElement, doOperationElement){
        this.saveOperationElement = saveOperationElement;
        this.doOperationElement = doOperationElement;
        this.clearAll();
    }

    clearAll(){
        //Reseteamos todo
        this.saveOperation = 0;
        this.doOperation = 0;
        this.sign = '';
        this.updateInterface();

    }

    //Actualicación de la interfaz
    updateInterface(){
        
        this.saveOperationElement.innerHTML = this.saveOperation + this.sign;
        this.doOperationElement.innerHTML = this.doOperation;
    }

    //Insertar números
    appendNumber(number){
        //Evitar que incluya mas de una coma
        if(number === "," && this.doOperation.includes(',')) return; //Hacemos un return para evitar que se vuelva a incluir
        this.doOperation = this.doOperation === 0 
        ? number //cambiamos el 0 por un numero si ese cero es el primer valor
        : this.doOperation.toString() + number; //Si no es 0, debemos concatenar el anterior valor
        this.updateInterface(); //Para poder ver resultados en la interfaz de usuario
        }

        delete(){
            if(this.doOperation === 0) return; //Si el valor es igual a 0 se cancela el borrado
            this.doOperation = +this.doOperation.toString().slice(0,-1); //al añadir el simbolo +, se parsea a número
            //va eliminando desde el ultimo numero gracias a la funcion .slice()
            this.updateInterface(); //Para poder ver resultados en la interfaz de usuario
        }
}



//Llamadas del elemento HTML a nuestro código de JS
const saveOperationElement = document.querySelector("[data-last]"); 
const doOperationElement = document.querySelector("[data-final]"); 
const clearAllButton = document.querySelector("[data-clearAll]");
const numberButtons = document.querySelectorAll("[data-number]"); //Seleccinamos todos los números
const deleteButton = document.querySelector("[data-delete]");

//le pasamos los elementos de guardado de la ultima operacion y la operacion actual
const calculator = new Calculator(saveOperationElement,doOperationElement); 

//Cuando le demos click al boton de borrar todo, ejecutará la función
clearAllButton.addEventListener("click", () =>{
    calculator.clearAll();
})

//Recogemos los botones numericos y coma usando un forEach
numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerHTML); //Vinculamos a los botones con los numeros
    })
})

//Ejecuta la función de borrado uno a uno
deleteButton.addEventListener('click', () =>{
    calculator.delete();
})

/*
const createHistorial = (text) => {
    let newResult = [];
    while (true){
        if(newResult.length != 8){        
    newResult = document.createElement("li");
    newResult.classList.add(data-operators);
    newResult.innerHTML = `
        <span>${text}</span>
    `;
    data-operators.appendChild(newResult);
}
else{
    newResult.splice(newResult.length,-1);
    newResult = document.createElement("li");
    newResult.classList.add(data-operators);
    newResult.innerHTML = `
        <span></span>
    `;
    data-operators.appendChild(newResult);
}
    }
*/