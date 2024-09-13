/** 
 * Este archivo se encargará de la configuración inicial de la interfaz de usuario como la selección de elementos y la inicialización.
*/

//-------------------------------> SLECT ELEMENTOS 
const resultInput = document.getElementById('screen');  // Seleccionar el input de la calculadora
const buttons = document.querySelectorAll('.btn');      // Seleccionar todos los botones
const clearButton = document.getElementById('btn-ac');  // Seleccionar el botón AC

//-------------------------------> VARIABLES GLOBALES
let currentNumber = '';             // Número actual que se está ingresando
let previousNumber = '';            // Primer número ingresado
let operator = '';                  // Operador seleccionado
let shouldResetDisplay = false;     // Controla si el display debe resetearse en la próxima entrada

/**
 *  Función para actualizar el valor del display de la calculadora basado en el valro de entrada.
 * 
 *  @param {Event} event - El evento de clic que se dispara al presionar un botón.
 *  
 *  @description
 *  Esta función gestiona la entrada de números y operadores en la calculadora. 
 *  - Si el botón clicado es un número, se actualiza el display con el nuevo número. 
 *    Si el display está en estado de reset (cuando se presiona un operador previamente), el número reemplaza el valor actual del display.
 *  - Si el botón clicado es un operador (`+`, `-`, `X`, `/`, `%`), se guarda el número actual y el operador, y se muestra la abreviatura del operador en el display.
 *  - Si el botón clicado es (`√`), se realizara el calculo utilizando el número ingresado anteriormente y se muestra el resultado en el display.
 *  - Si el botón clicado es el signo igual (`=`), se realiza el cálculo utilizando el número y operador guardados, y se muestra el resultado en el display.
 *  
 *  La función también controla el límite de caracteres en el display y prepara la calculadora para la siguiente entrada.
 * 
 *  @example
 *  - Si el display muestra "0" y se hace clic en el botón "5", el display mostrará "5".
 *  - Si el display muestra "5" y se hace clic en el botón "+", el display mostrará "SUM". 
 *  - Si el display muestra "81" y se hace clic en el botón "√", el display mostrará el resultado (9). 
 *  - Al presionar "=", se realizará el cálculo con los números y operadores guardados.
 *  
 *  @returns {void} - No retorna ningún valor.
*/
function actualizarDisplay(event) {
    // Obtener valor del btn clicado
    const buttonValue = event.target.textContent;

    // Verificar si el botón es un número o punto decimal
    if (!isNaN(buttonValue) || buttonValue === '.') {
        // Asegurar que no se agreguen más de un punto decimal en el mismo número
        if (buttonValue === '.' && resultInput.value.includes('.')) {
            return;
        }

        // Verificar si se debe reiniciar el display después de una operación
        if (shouldResetDisplay) {
            resultInput.value = buttonValue;
            shouldResetDisplay = false;
        } else {
            // Verificar el límite de 16 caracteres antes de agregar nuevos números o puntos decimales
            if (resultInput.value.length < maxLength) {
                resultInput.value = resultInput.value === "0" ? buttonValue : resultInput.value + buttonValue;
            }
        }
        currentNumber = resultInput.value; // Actualiza el número actual
        console.log(resultInput.value)
    
    } else if (buttonValue === '.') {
        // Solo agregar un punto decimal si no hay uno en el número actual
        if (!resultInput.value.includes('.')) {
            resultInput.value += '.';
        }
        currentNumber = resultInput.value;
    
    } else if (['+', '-', 'X', '/', '%'].includes(buttonValue)) {
        previousNumber = currentNumber;               // Guarda el número anterior
        operator = buttonValue;                       // Guarda el operador
        resultInput.value = mapOperator(buttonValue); // Muestra la abreviatura del operador
        shouldResetDisplay = true;                    // Prepara para el siguiente número
    
    } else if (buttonValue === '=') {
        if (previousNumber !== '' && operator !== '') {
             // Calcula el resultado y lo muestra en el display
            currentNumber = calculate(previousNumber, currentNumber, operator);
            resultInput.value = currentNumber;
            previousNumber = '';    // Limpia el número anterior
            operator = '';          // Limpia el operador
        }

    } else if (buttonValue === '√') {
        // Realiza el cálculo inmediato
        currentNumber = calculate(currentNumber, 0, '√');
        resultInput.value = currentNumber;
        previousNumber = '';
        operator = '';
        shouldResetDisplay = true;
    }
    
}

/**
 *  Función para calcular el resultado basado en la operación seleccionada.
 * 
 *  @param {string} num1 - Primer número.
 *  @param {string} num2 - Segundo número.
 *  @param {string} op - Operador seleccionado.
 * 
 *  @description
 *  Esta función toma dos números y un operador como entrada y realiza el cálculo correspondiente.
 *  - Si el operador es `+`, se realiza una suma.
 *  - Si el operador es `-`, se realiza una resta.
 *  - Si el operador es `X`, se realiza una multiplicación.
 *  - Si el operador es `/`, se realiza una división. 
 *  - Si el operador es `√`, se realiza una raiz cuadrada. 
 *  - Si el operador es `%`, se realiza el calculo de porcentaje. 
 *  
 *  La función devuelve el resultado de la operación matemática.
 *  Si el operador no es válido o se intenta dividir por cero, se maneja el error devolviendo un mensaje adecuado.
 * 
 *  @example
 *  calculate(5, 3, '+'); // Devuelve 8
 *  calculate(10, 2, '/'); // Devuelve 5
 *  calculate(7, 0, '/'); // Devuelve 'Error: División por cero'
 *  @returns {string} - El resultado de la operación.
 */
function calculate(num1, num2, op) {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    switch (op) {
        case '+':
            return (number1 + number2).toString();
        case '-':
            return (number1 - number2).toString();
        case 'X':
            return (number1 * number2).toString();
        case '/':
            if(num2 === 0){
                return 'SINTAX ERROR'; // Manejo de división por cero
            }
            return ((number1 / number2).toFixed(2)).toString();
        case '%':
            return (((number1 * number2)/100).toFixed(2)).toString();
        case '√':
            return (Math.sqrt(number1).toFixed(3)).toString();
        default:
            return '';
    }
}

/**
 *  Función para resetear el display de la calculadora al valor inicial.
 * 
 *  @description
 *  Restablece el valor del campo de entrada (`input`) que actúa como pantalla al valor "0".
 * 
 *  @returns {void} - No retorna ningún valor.
*/
function resetDisplay() {
    resultInput.value = "0";
    currentNumber = '';
    previousNumber = '';
    operator = '';
    shouldResetDisplay = false;
}
