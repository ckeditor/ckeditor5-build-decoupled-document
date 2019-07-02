import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertCardioCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
           this.editor.insertHtml( createCardioTable( writer, this.editor ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'cardio' );

        this.isEnabled = allowedIn !== null;
    }
}

function createCardioTable( writer, editor ) {

    const patientGender = editor.config.get('patientGender');
    const patientAge =  parseInt(editor.config.get('patientAge'));
    var references = {};

    if (patientAge > 15) {
        if (patientGender == 'M') {
            references = {
                 refsao: '31 - 37 mm',
                 refjsn: '26 - 32 mm',
                 refaa: '26 - 34 mm',
                 refaesq: '30 - 40 mm',
                 refdbvd: '25 - 41 mm',
                 refdpvsvd: '20 - 30 mm',
                 refddfve: '42 - 58 mm',
                 refdsfve: '25 - 40 mm',
                 refeds: '06 - 10 mm',
                 refedppve: '06 - 10 mm',
                 refvaesc: '16 - 34 ml/m²',
                 refddfvesc: '22 - 30 mm/m²',
                 refdsfvesc: '13 - 21 mm/m²',
                 refvdf: '62 - 150 ml',
                 refvsf: '21 - 61 ml',
                 refvsfsc: '11 - 31 ml/m²',
                 refvdfsc: '34 - 74 ml/m²',
                 reffes: '52 - 72 %',
                 reffet: '52 - 72 %',
                 refpec: '25 - 43 %',
                 refmvesc: '45 - 115 g/m²',
                 refmve: '96 - 200 g',
                 referpve: '0,24 - 0,42 mm'
            };
        } else {

            references = {
                 refsao: '27 - 33 mm',
                 refjsn: '23 - 29 mm',
                 refaa: '23 - 31 mm',
                 refaesq: '27 - 38 mm',
                 refdbvd: '25 - 41 mm',
                 refdpvsvd: '20 - 30 mm',
                 refddfve: '38 - 52 mm',
                 refdsfve: '22 - 35 mm',
                 refeds: '06 - 09 mm',
                 refedppve: '06 - 09 mm',
                 refvaesc: '16 - 34 ml/m²',
                 refddfvesc: '23 -31 mm/m²',
                 refdsfvesc: '13 - 21 mm/m²',
                 refvdf: '46 - 106 ml',
                 refvsf: '14 - 42 ml',
                 refvsfsc: '8 - 24 ml/m²',
                 refvdfsc: '29-61 ml/m²',
                 reffes: '54 - 74 %',
                 reffet: '52 - 72 %',
                 refpec: '27 - 45 %',
                 refmvesc:'43 - 95 g/m²' ,
                 refmve: '66 - 150 g',
                 referpve: '0,22 - 0,42 mm'
            };
        }

    } else {

        if (patientAge < 1) {
            if (patientAge <= 3) {

                references = {
                    refddfve:'21,7 mm',
                    refaesq:'15,7 mm',
                    refeds:'4,2 mm',
                    refedppve:'4,2 mm'
                }
            } else if (patientAge > 3 && patientAge < 12) {

                references = {
                    refddfve:'26,4 mm',
                    refaesq:'19,2 mm',
                    refeds:'4,6 mm',
                    refedppve:'4,6 mm'
                }
            }
        } else if (patientAge >= 1 && patientAge <= 2) {

            references = {
                refddfve:'30,8 mm',
                refaesq:'21,2 mm',
                refeds:'5,6 mm',
                refedppve:'5,4 mm'
            }

        } else if (patientAge >= 3 && patientAge <= 5) {

            references = {
                refddfve:'35,9 mm',
                refaesq:'21,0 mm',
                refeds:'5,7 mm',
                refedppve:'6,1 mm',
            }

        } else if (patientAge >= 6 && patientAge <= 10) {

            references = {
                refddfve:'39,7 mm',
                refaesq:'23,4 mm',
                refeds:'7,0 mm',
                refedppve:'7,3 mm',
            }

        } else if (patientAge >= 11 && patientAge <= 15) {

            references = {
                refddfve:'46,3 mm',
                refaesq:'28,2 mm',
                refeds:'8,8 mm',
                refedppve:'8,8 mm',
            }

        }
    }

    return  '<table class="cardio-wrapper">' +
                '<tr class="cardio-row"->' +
                    '<td class="cardio-cell"><b>Dados do Paciente:</b></td>' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Altura:</td>' +
                    '<td class="cardio-editable-field  edt" id="altura"> </td> ' +
                    '<td class="cardio-cell">cm</td>' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Peso:</td>' +
                    '<td class="cardio-editable-field edt" id="peso"> </td> ' +
                    '<td class="cardio-cell">kg</td>' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Superfície Corporal:</td>' +
                    '<td class="cardio-editable-field edt" id="sc"> </td> ' +
                    '<td class="cardio-cell">m²</td>' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell"><b>Parâmetros Estruturais:</b></td>' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Seios Aórticos:</td>' +
                    '<td class="cardio-editable-field edt" id="sao"></td> ' +
                    '<td class="cardio-cell">mm</td>' +
                    '<td class="cardio-editable-field" id="refsao">'+(references['refsao'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Junção Sinotubular:</td>' +
                    '<td class="cardio-editable-field edt" id="jsn"></td> ' +
                    '<td class="cardio-cell">mm</td>' +
                    '<td class="cardio-editable-field" id="refjsn">'+(references['refjsn'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Aorta Ascendente:</td>' +
                    '<td class="cardio-editable-field edt" id="aasc"></td> ' +
                    '<td class="cardio-cell">mm</td>' +
                    '<td class="cardio-editable-field" id="refaa">'+(references['refaa'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Átrio Esquerdo:</td>' +
                    '<td class="cardio-editable-field edt" id="aesq"></td> ' +
                    '<td class="cardio-cell">mm</td>' +
                    '<td class="cardio-editable-field" id="refaesq">'+(references['refaesq'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Volume do Átrio Esquerdo:</td>' +
                    '<td class="cardio-editable-field edt" id="vae"></td> ' +
                    '<td class="cardio-cell">ml</td>' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Diâmetro Basal do Ventrículo Direito:</td>' +
                    '<td class="cardio-editable-field edt" id="dbvd"></td> ' +
                    '<td class="cardio-cell">mm</td>' +
                    '<td class="cardio-editable-field" id="refdbvd">'+(references['refdbvd'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell"> Diâmetro Proximal da Via de Saída do VD:</td>' +
                    '<td class="cardio-editable-field edt" id="dpvsvd"></td> ' +
                    '<td class="cardio-cell">mm</td>' +
                    '<td class="cardio-editable-field" id="refdpvsvd">'+(references['refdpvsvd'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Diâmetro Diastólico Final do VE:</td>' +
                    '<td class="cardio-editable-field edt" id="ddfve"></td> ' +
                    '<td class="cardio-cell">mm</td>' +
                    '<td class="cardio-editable-field" id="refddfve">'+(references['refddfve'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Diâmetro Sistólico Final do VE:</td>' +
                    '<td class="cardio-editable-field edt" id="dsfve"></td> ' +
                    '<td class="cardio-cell">mm</td>' +
                    '<td class="cardio-editable-field" id="refdsfve">'+(references['refdsfve'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Espessura Diastólica do Septo:</td>' +
                    '<td class="cardio-editable-field edt" id="eds"></td> ' +
                    '<td class="cardio-cell">mm</td>' +
                    '<td class="cardio-editable-field" id="refeds">'+(references['refeds'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Espessura Diastólica da PPVE:</td>' +
                    '<td class="cardio-editable-field edt" id="edppve"></td> ' +
                    '<td class="cardio-cell">mm</td>' +
                    '<td class="cardio-editable-field" id="refedppve">'+(references['refedppve'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell"> <b>Relações e Funções:</b></td>' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Volume do AE / Superfície Corporal:</td>' +
                    '<td class="cardio-editable-field edt" id="vaesc"></td> ' +
                    '<td class="cardio-cell">ml/m²</td>' +
                    '<td class="cardio-editable-field" id="refvaesc">'+(references['refvaesc'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Volume Diastólico Final:</td>' +
                    '<td class="cardio-editable-field edt" id="vdf"></td> ' +
                    '<td class="cardio-cell">ml</td>' +
                    '<td class="cardio-editable-field" id="refvdf">'+(references['refvdf'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Volume Sistólico Final:</td>' +
                    '<td class="cardio-editable-field edt" id="vsf"></td> ' +
                    '<td class="cardio-cell">ml</td>' +
                    '<td class="cardio-editable-field" id="refvsf">'+(references['refvsf'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Volume Diastólico Final / SC:</td>' +
                    '<td class="cardio-editable-field edt" id="vdfsc"></td> ' +
                    '<td class="cardio-cell">ml/m²</td>' +
                    '<td class="cardio-editable-field" id="refvdfsc">'+(references['refvdfsc'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Volume Sistólico Final / SC:</td>' +
                    '<td class="cardio-editable-field edt" id="vsfsc"></td> ' +
                    '<td class="cardio-cell">ml/m²</td>' +
                    '<td class="cardio-editable-field" id="refvsfsc">'+(references['refvsfsc'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Diâmetro Diastólico Final do VE / SC:</td>' +
                    '<td class="cardio-editable-field edt" id="ddfvesc"></td> ' +
                    '<td class="cardio-cell">mm/m²</td>' +
                    '<td class="cardio-editable-field" id="refddfvesc">'+(references['refddfvesc'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Diâmetro Sistólico Final do VE / SC:</td>' +
                    '<td class="cardio-editable-field edt" id="dsfvesc"></td> ' +
                    '<td class="cardio-cell">mm/m²</td>' +
                    '<td class="cardio-editable-field" id="refdsfvesc">'+(references['refdsfvesc'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Fração de Ejeção (Simpson):</td>' +
                    '<td class="cardio-editable-field edt" id="fes"></td> ' +
                    '<td class="cardio-cell">%</</td>' +
                    '<td class="cardio-editable-field" id="reffes">'+(references['reffes'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Fração de Ejeção:</td>' +
                    '<td class="cardio-editable-field edt" id="fet"></td> ' +
                    '<td class="cardio-cell">%</</td>' +
                    '<td class="cardio-editable-field" id="reffet">'+(references['reffet'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Percent. Encurt. Cavidade:</td>' +
                    '<td class="cardio-editable-field edt" id="pec"></td> ' +
                    '<td class="cardio-cell">%</</td>' +
                    '<td class="cardio-editable-field" id="refpec">'+(references['refpec'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Massa do VE / Superfície Corporal:</td>' +
                    '<td class="cardio-editable-field edt" id="mvesc"></td> ' +
                    '<td class="cardio-cell">g/m²</</td>' +
                    '<td class="cardio-editable-field" id="refmvesc">'+(references['refmvesc'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Massa Ventricular Esquerda:</td>' +
                    '<td class="cardio-editable-field edt" id="mve"></td> ' +
                    '<td class="cardio-cell">g</</td>' +
                    '<td class="cardio-editable-field" id="refmve">'+(references['refmve'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Espessura Relativa das Paredes do VE:</td>' +
                    '<td class="cardio-editable-field edt" id="erpve"></td> ' +
                    '<td class="cardio-cell">mm</</td>' +
                    '<td class="cardio-editable-field" id="referpve">'+(references['referpve'] || '-')+'</td> ' +
                '</tr>' +

                '<tr class="cardio-row">' +
                    '<td class="cardio-cell">Relação ERP e Massa VE i:</td>' +
                    '<td class="cardio-editable-field edt" id="rerp"></td> ' +
                    '<td class="cardio-cell></td>' +
                    '<td class="cardio-editable-field"</td>' +
                '</tr>' +
            '</table>';

}