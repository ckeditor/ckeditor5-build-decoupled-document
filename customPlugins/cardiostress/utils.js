// Efetua os cálculos de acordo com o elemento que foi alterado nos widgets Ecocardio e Ecocardio Complementar
export function makeCalculations(elementId, editor) {

    var values = [];
    var result = 0;

    if (elementId == 'altura' || elementId == 'peso') { // Superfície Corporal (m²)

        let sc = $('#sc');
        values = getFormattedValues('altura', 'peso');
        if (checkNumeric(values)) { 
            result = 0.007184 * (Math.pow(values[0], 0.725)) * (Math.pow(values[1], 0.425));
            // const position = new Position( editor.model.document.getRoot(), [ 0 ] );
            // const walker = new TreeWalker( { startPosition: position } );

            // for ( const element of walker ) {
            //     console.log(element);
            // }
            // sc.text(truncate(result, 2));
            // makeCalculations(sc);
        }
         else {
            sc.text('-');
        }
    }

    if (elementId == 'vae' || elementId == 'cae' || elementId == 'sc') { // Volume do AE / Superfície Corporal
        let vaesc = $('#vaesc');
        values = getFormattedValues('vae', 'sc');

        if (checkNumeric(values)) {
            result = values[0] / values[1];
            vaesc.text(truncate(result, 1));
        } else {
            vaesc.text('-');
        }
    }

    if (elementId == 'ddfve') { // Volume Diastólico Final
        let vdf = $('#vdf');
        values = getFormattedValues('ddfve');

        if (checkNumeric(values)) {
            result = (((7 * values[0] * values[0] * values[0]) / (2.4 + (values[0] / 10))) / 1000);
            vdf.text(truncate(result, 1));
        } else {
            vdf.text('-');
        }
    }

    if (elementId == 'dsfve') { // Volume Sistólico Final
        let vsf = $('#vsf');
        values = getFormattedValues('dsfve');

        if (checkNumeric(values)) {
            result = (((7 * values[0] * values[0] * values[0]) / (2.4 + (values[0] / 10))) / 1000);
            vsf.text(truncate(result, 1));
        } else {
            vsf.text('-');
        }
    }

    if (elementId == 'ddfve' || elementId == 'sc') { // Volume Diastólico Final /Superficie Corporal
        let vdfsc = $('#vdfsc');
        values = getFormattedValues('ddfve', 'sc');

        if (checkNumeric(values)) {
            result = (((7 * values[0] * values[0] * values[0]) / (2.4 + (values[0] / 10))) / 1000) / values[1]
            vdfsc.text(truncate(result, 1));
        } else {
            vdfsc.text('-');
        }
    }

    if (elementId == 'vdf') { // Volume Diastólico Final /Superficie Corporal (caso seja alterado o campo Volume Diastólico Final)
        let vdfsc = $('#vdfsc');
        values = getFormattedValues('vdf', 'sc');

        if (checkNumeric(values)) {
            result = values[0] / values[1]
            vdfsc.text(truncate(result, 1));
        } else {
            vdfsc.text('-');
        }
    }

    if (elementId == 'dsfve' || elementId == 'sc' || elementId == 'vsf') { // Volume Sistólico Final / Superfície Corporal
        let vsfsc = $('#vsfsc');
        values = getFormattedValues('dsfve', 'sc');

        if (checkNumeric(values)) {
            result = (((7 * values[0] * values[0] * values[0]) / (2.4 + (values[0] / 10))) / 1000) / values[1]
            vsfsc.text(truncate(result, 1));
        } else {
            vsfsc.text('-');
        }
    }

    if (elementId == 'vsf') { // Volume Sistólico Final /Superficie Corporal (caso seja alterado o campo Volume Sistólico Final)
        let vsfsc = $('#vsfsc');
        values = getFormattedValues('vsf', 'sc');

        if (checkNumeric(values)) {
            result = values[0] / values[1]
            vsfsc.text(truncate(result, 1));
        } else {
            vsfsc.text('-');
        }
    }

    if (elementId == 'ddfve' || elementId == 'sc') { // Diâmetro Diastólico Final do VE / SC
        let ddfvesc = $('#ddfvesc');
        values = getFormattedValues('ddfve', 'sc');

        if (checkNumeric(values)) {
            result = values[0] / values[1];
            ddfvesc.text(truncate(result, 1));
        } else {
            ddfvesc.text('-');
        }
    }

    if (elementId == 'dsfve' || elementId == 'sc') { // Diâmetro Sistólico Final do VE / SC
        let dsfvesc = $('#dsfvesc');
        values = getFormattedValues('dsfve', 'sc');

        if (checkNumeric(values)) {
            result = values[0] / values[1];
            dsfvesc.text(truncate(result, 1));
        } else {
            dsfvesc.text('-');
        }
    }

    if (elementId == 'ddfve' || elementId == 'dsfve') { // Fração de Ejeção (Teicholz)
        let fet = $('#fet');
        values = getFormattedValues('ddfve', 'dsfve');

        if (checkNumeric(values)) {
            result = ((Math.pow(values[0], 2) - Math.pow(values[1], 2)) / Math.pow(values[0], 2));
            result = 100.0 * (result + (1 - result) * 0.15);
            result = Math.round(result);
            fet.text(truncate(result, 1));
        } else {
            fet.text('-');
        }
    }

    if (elementId == 'vsf' || elementId == 'dsfve'|| elementId == 'ddfve' || elementId == 'vdf') { // Pecentual Encurtamento Cavidade
        let pec = $('#pec');
        values = getFormattedValues('ddfve', 'dsfve');

        if (checkNumeric(values)) {
            result = (values[0] - values[1]) * (100 / values[0]);
            pec.text(truncate(result, 1));
        } else {
            pec.text('-');
        }
    }

    if (elementId == 'eds' || elementId == 'edppve' || elementId == 'sc' || elementId == 'ddfve') { // Massa do VE/superficie Corporal
        let mvesc = $('#mvesc');
        values = getFormattedValues('eds', 'edppve', 'ddfve', 'sc');

        if (checkNumeric(values)) {
            let temp = values[0] + values[1] + values[2];
            result = ((0.8 * (1.04 * (Math.pow(temp, 3) - Math.pow(values[2], 3)) + 0.6)) / values[3]) / 1000;
            mvesc.text(truncate(result, 1));

        } else {
            mvesc.text('-');
        }
    }

    if (elementId == 'edppve' || elementId == 'vsf' || elementId == 'ddfve') { // Massa Ventricular Esquerda
        let mve = $('#mve');
        values = getFormattedValues('eds', 'edppve', 'ddfve');

        if (checkNumeric(values)) {
            result = ((0.8 * (1.04 * (Math.pow(values[0] + values[1] + values[2], 3) - Math.pow(values[2], 3)) + 0.6))) / 1000;
            mve.text(truncate(result, 1));
        } else {
            mve.text('-');
        }
    }

    if (elementId == 'edppve' || elementId == 'ddfve') { // Espessura Relativa das Paredes do VE
        let erpve = $('#erpve');
        values = getFormattedValues('edppve', 'ddfve');

        if (checkNumeric(values)) {
            result = (2 * values[0]) / values[1];
            erpve.text(truncate(result, 2));
            makeCalculations(erpve);
        } else {
            erpve.text('-');
        }
    }

    if (elementId == 'erpve' || elementId == 'mvesc'|| elementId == 'eds') { // Relação ERP e Massa VE i
        let rerp = $('#rerp');
        let patientGender = editor.config.get('patientGender');
        let patientAge = editor.config.get('patientAge')
        values = getFormattedValues('erpve', 'mvesc');

        if (checkNumeric(values)) {
            if (patientGender == 'M') {
                if (values[1] <= 115) {
                    if (values[0] <= 0.42) {
                        rerp.text('Geometria normal');
                    } else if (values[0] > 0.42) {
                        rerp.text('Remodelamento Concêntrico');
                    }
                } else {
                    if (values[0] <= 0.42) {
                        rerp.text('Hipertrofia Excêntrica');
                    } else if (values[0] > 0.42) {
                        rerp.text('Hipertrofia Concêntrica');
                    }
                }
            } else {
                if (values[1] <= 95) {
                    if (values[0] <= 0.42) {
                        rerp.text('Geometria normal');
                    } else if (values[0] > 0.42) {
                        rerp.text('Remodelamento Concêntrico');
                    }
                } else {
                    if (values[0] <= 0.42) {
                        rerp.text('Hipertrofia Excêntrica');
                    } else if (values[0] > 0.42) {
                        rerp.text('Hipertrofia Concêntrica');
                    }
                }
            }
        } else {
            rerp.text('-');
        }
    }

    if (elementId == 'fmoe' || elementId == 'fmoa') { // Relação E / A
        let rea = $('#rea');
        values = getFormattedValues('fmoe', 'fmoa');

        if (checkNumeric(values)) {
            result = values[0] / values[1];
            rea.text(truncate(result, 1));
        } else {
            rea.text('-');
        }
    }

    if (elementId == 'fmoe' || elementId == 'es' || elementId == 'el') { // Média Rel E / e'
        let mree = $('#mree');
        values = getFormattedValues('fmoe', 'es', 'el');

        if (checkNumeric(values)) {
            result = values[0] / ((values[1] + values[2]) / 2);
            mree.text(truncate(result, 1));
        } else {
            mree.text('-');
        }
    }

    if (elementId == 'vci' || elementId == 'vcie') { // Variação da Veia Cava Inferior
        let vvci = $('#vvci');
        values = getFormattedValues('vci', 'vcie');

        if (checkNumeric(values)) {
            result = (values[0] - values[1]) / values[1];
            if (result > 100) //Caso a divisão seja por 0, o resultado tende a infinito, então esse caso é tratado manualmente.
                result = 100;
            vvci.text(truncate(result, 1));
        } else {
            vvci.text('-');
        }
    }
}

// Transforma o valor de determinado campo do CKEditor em um valor float válido
// Devem ser passados como argumentos todos os ids dos campos dos quais se quer os valores
export function getFormattedValues() {
    let formattedValues = [];

    for (var i = 0; i < arguments.length; i++) { 
        let value = $('#'+arguments[i]).text();
        formattedValues[i] = value.match(/[a-z]/i) ? '' : parseFloat(value.replace(',', '.'));
    }
    return formattedValues;
}

// Deixa todos os resultados com o numero de casas decimais especificado. Caso o resultado não seja numérico, retorna 0.
export function truncate(numToBeTruncated, numOfDecimals) {
    var number = numToBeTruncated.toString();
    var pointIndex = number.indexOf('.');
    var truncatedNumber = +(number.slice(0, pointIndex > -1 ? ++numOfDecimals + pointIndex : undefined));
   
    if ($.isNumeric(truncatedNumber)) {
        return truncatedNumber;
    } else {
        return '-';
    }
}

// Checa se todos os argumentos passados são números(evita ter que ficar chamado isNumeric para todos os elementos manualmente)
export function checkNumeric(values) {
    for (var i = 0; i < values.length; i++) {
        if (!$.isNumeric(values[i])) {
            return false;
        }
    }
    return true;
}
