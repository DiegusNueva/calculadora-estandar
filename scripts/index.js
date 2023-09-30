//Creamos la clase
class Calculator {
    //Pasamos los dos parámetros, donde hacemos la operacion y donde guardamos la anterior operación
    constructor(operator1Element, operator2Element){
        this.operator1Element = operator1Element;
        this.operator2Element = operator2Element;
        this.clearAll();
    }

    clearAll(){
        //Reseteamos todo
        this.operator1 = 0;
        this.operator2 = 0;
        this.operator = '';
        this.updateInterface();

    }

    //Actualicación de la interfaz
    updateInterface(){
        
        this.operator1Element.innerHTML = this.operator1 + this.operator;
        this.operator2Element.innerHTML = this.operator2;
    }

    //Insertar números
    appendNumber(number){
        //Evitar que incluya mas de una coma
        if(number === "," && this.operator2.includes(',')) return; //Hacemos un return para evitar que se vuelva a incluir
        
        this.operator2 = this.operator2 === 0 
        ? number //cambiamos el 0 por un numero si ese cero es el primer valor
        : this.operator2.toString() + number; //Si no es 0, debemos concatenar el anterior valor
        this.updateInterface(); //Para poder ver resultados en la interfaz de usuario
        switch(this.operator2){
            case "π":
                let pi =[5];
                this.operator2=Math.PI();
                for (let i = 0; i <pi.length; i++){
                    this.operator2*=this.operator2;
                }
                break;
        }
        }

        //Boorado de el ultimo numero
        delete(){
            if(this.operator2 === 0) return; //Si el valor es igual a 0 se cancela el borrado
            this.operator2 = +this.operator2.toString().slice(0,-1); //al añadir el simbolo +, se parsea a número
            //va eliminando desde el ultimo numero gracias a la funcion .slice()
            this.updateInterface(); //Para poder ver resultados en la interfaz de usuario
        }

        //Asignacion de los operadores
        operators(operator){
            //Comprobar que el operador ya existe
            if(this.operator){
                this.calculate();
            }
            this.operator = operator;
            this.operator1 = +this.operator2 === 0
            ? this.operator1
            : this.operator2 ; //Le pasamos el primer operador al segundo
            this.operator2 = 0; //El segundo lo ponemos a 0
            this.updateInterface();
        }
        //Añadimos la funcionalidad a cada operador
        calculate(){
            switch(this.operator){
                case "%":
                    this.operator1 = +this.operator1/100;
                    break;

                case "⅟ₓ":
                    this.operator1 = 1/+this.operator1;
                    break;
                case "ₓ²":
                    this.operator1 = +Math.pow(this.operator1,2);
                    break;
                case "²√ₓ":
                    this.operator1 = +Math.sqrt(this.operator1);
                break;

                case "÷": 
                this.operator1 = +this.operator1 / +this.operator2;
                break;

                case "✕":
                    this.operator1 = +this.operator1 * +this.operator2;
                break;

                case "-":
                    this.operator1 = +this.operator1 - +this.operator2;
                break;

                case "+":
                    this.operator1 = +this.operator1 + +this.operator2;
                break;

                case "±":
                    if (this.operator1 > 0){
                        this.operator1 = Math.abs(this.operator1) * -1;
                    }
                    else{
                        this.operator1 = Math.abs(this.operator1);
                    }
                break;
            }
            this.operator = "";
            this.operator2 = 0;
            this.updateInterface();
               }
}



//Llamadas del elemento HTML a nuestro código de JS
const saveOperationElement = document.querySelector("[data-last]"); 
const doOperationElement = document.querySelector("[data-final]"); 
const clearAllButton = document.querySelector("[data-clearAll]");
const numberButtons = document.querySelectorAll("[data-number]"); //Seleccionamos todos los números
const deleteButton = document.querySelector("[data-delete]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");

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

//Recorre todos los botones de funcines que tenemos
operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.operators(button.innerHTML);
    } )
});

equalsButton.addEventListener("click",()=>{
    calculator.calculate();
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