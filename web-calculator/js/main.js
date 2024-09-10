/** 
 *  Este archivo manejará la inicialización y asignación de eventos a los elementos También puede importar funciones de otros archivos.
*/

//-------------------------------> CONFIGURACIÓN
const maxLength = 16;  // Limitar caracteres en el display

//-------------------------------> INICIALIZAR CALCULADORA
function initCalculator() {
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('btn-ac');

    // Asignar eventos a los botones
    buttons.forEach(button => {
        button.addEventListener('click', actualizarDisplay);
    });

    // Asignar evento al botón de "AC"
    clearButton.addEventListener('click', resetDisplay);
}

//-------------------------------> EJECUTAR
document.addEventListener('DOMContentLoaded', initCalculator);
