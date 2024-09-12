/**
 * Este archivo contendrá la lógica de las funciones relacionadas con el cálculo y la manipulación de la pantalla de la calculadora.
 */

/**
 *  Función que mapea los operadores a sus abreviaturas.
 * 
 *  @param {string} operator - El valor del botón clicado.
 *  @returns {string} - El valor o la abreviatura correspondiente al operador.
 */
function mapOperator(operator) {
    const operatorMap = {
        '+': 'SUM',
        '-': 'RES',
        'X': 'MUL',
        '/': 'DIV',
        '%': 'PCT',
        '√': 'SQRT'
    };

    // Retorna la abreviatura o el valor del botón si no es un operador
    return operatorMap[operator] || operator;
}
