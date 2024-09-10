/** 
 * Este archivo se encargará de la configuración inicial de la interfaz de usuario como la selección de elementos y la inicialización.
*/

//-------------------------------> SLECT ELEMENTOS 
const resultInput = document.getElementById('screen');  // Seleccionar el input de la calculadora


/**
 *  Función para actualizar el valor del display de la calculadora.
 * 
 *  @param {Event} event - El evento de clic que se dispara al presionar un botón.
 *  @description
 *  Modifica el valor del campo de entrada (`input`) que actúa como pantalla de la calculadora.
 *  También mapea los operadores a sus abreviaturas y controla el límite de caracteres en el display.
 *  @returns {void} - No retorna ningún valor.
*/
function actualizarDisplay(event) {
    const buttonValue = event.target.textContent;

    // Verificar longitud del Input. Si es menor que el límite máximo, agrega un nuevo carácter.
    if (resultInput.value.length < maxLength) {
        const displayValue = mapOperator(buttonValue); // Llamar a la función de mapeo
        if (resultInput.value === "0") {
            resultInput.value = displayValue;
        } else {
            resultInput.value += displayValue;
        }
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
}