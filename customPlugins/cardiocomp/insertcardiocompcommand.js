import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertCardioCompCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
           this.editor.insertHtml( createCardioCompTable( writer, this.editor ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        // const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'cardio' );

        this.isEnabled = true;
    }
}

    function createCardioCompTable( writer, editor ) {

        const patientGender = editor.config.get('patientGender');
        const patientAge =  parseInt(editor.config.get('patientAge'));
        var references = {};

        if (patientAge > 15) {

            if (patientGender == 'M') {

            references = {
                reffmoe: '0,6 - 1,0 m/s',
                reffmoa: '0,3 - 0,7 m/s',
                refvsea: '< 0,5',
                refes: '< 0,06',
                refel: '< 0,08',
                refrea: '1,1 - 1,7',
                refmree: '> 6',
                reftdm: '180 +/- 31 ms',
                refpsap: '35 - 40 mmHg',
                refpead: '<5 mmHg',
                refvci: '< 21 mm',
                refvcie: 'colapso espontâneo = 0',
                refvvci: '> 50 %'

            };

            } else {

                references = {
                    reffmoe: '0,6 - 1,0 m/s',
                    reffmoa: '0,3 - 0,7 m/s',
                    refvsea: '< 0,5',
                    refes: '< 0,06',
                    refel: '< 0,08',
                    refrea: '1,1 - 1,7',
                    refmree: '> 6',
                    reftdm: '180 +/- 31 ms',
                    refpsap: '35 - 40 mmHg',
                    refpead: '<5 mmHg',
                    refvci: '< 21 mm',
                    refvcie: 'colapso espontâneo = 0',
                    refvvci: '> 50 %'

                };

            }
     

        return  '<table class="cardiocomp-wrapper">' +
                    '<tr class="cardiocomp-row"->' +
                        '<td class="cardiocomp-cell"><b>Parâmetros: Função Diastólica do VE:</b></td>' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">Fluxo Mitral Onda E:</td>' +
                        '<td class="cardiocomp-editable-field edt" id="fmoe"></td> ' +
                        '<td class="cardiocomp-cell">cm/s</td>' +
                        '<td class="cardiocomp-editable-field" id="reffmoe">'+(references['reffmoe'] || '-')+'</td> ' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">Fluxo Mitral Onda A:</td>' +
                        '<td class="cardiocomp-editable-field edt" id="fmoa"></td> ' +
                        '<td class="cardiocomp-cell">cm/s</td>' +
                        '<td class="cardiocomp-editable-field" id="reffmoa">'+(references['reffmoa'] || '-')+'</td> ' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">e\' Septal:</td>' +
                        '<td class="cardiocomp-editable-field edt" id="es"></td> ' +
                        '<td class="cardiocomp-cell">cm/s</td>' +
                        '<td class="cardiocomp-editable-field" id="refes">'+(references['refes'] || '-')+'</td> ' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">e\' Lateral:</td>' +
                        '<td class="cardiocomp-editable-field edt" id="esl"></td> ' +
                        '<td class="cardiocomp-cell">cm/s</td>' +
                        '<td class="cardiocomp-editable-field" id="refel">'+(references['refel'] || '-')+'</td> ' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">Relação E/A:</td>' +
                        '<td class="cardiocomp-editable-field edt" id="rea"></td> ' +
                        '<td class="cardiocomp-cell"> </td>' +
                        '<td class="cardiocomp-editable-field" id="refrea">'+(references['refrea'] || '-')+'</td> ' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">Média Rel E/e\':</td>' +
                        '<td class="cardiocomp-editable-field edt" id="mree"></td> ' +
                        '<td class="cardiocomp-cell"> </td>' +
                        '<td class="cardiocomp-editable-field" id="refmree">'+(references['refmree'] || '-')+'</td> ' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">TD Mitral:</td>' +
                        '<td class="cardiocomp-editable-field edt" id="tdm"></td> ' +
                        '<td class="cardiocomp-cell">ms</td>' +
                        '<td class="cardiocomp-editable-field" id="reftdm">'+(references['reftdm'] || '-')+'</td> ' +
                    '</tr>' +

                    '<tr class="cardiocomp-row"->' +
                        '<td class="cardiocomp-cell"><b>Pressão Sistólica da Artéria Pulmonar e Veia Cava:</b></td>' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">PSAP:</td>' +
                        '<td class="cardiocomp-editable-field edt" id="psap"></td> ' +
                        '<td class="cardiocomp-cell">mmHG</td>' +
                        '<td class="cardiocomp-editable-field" id="refpsap">'+(references['refpsap'] || '-')+'</td> ' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">Pressão Estimada do Átrio Direito:</td>' +
                        '<td class="cardiocomp-editable-field edt" id="pead"></td> ' +
                        '<td class="cardiocomp-cell">mmHG</td>' +
                        '<td class="cardiocomp-editable-field" id="refpead">'+(references['refpead'] || '-')+'</td> ' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">Veia Cava Inferior:</td>' +
                        '<td class="cardiocomp-editable-field edt" id="vci"></td> ' +
                        '<td class="cardiocomp-cell">mm</td>' +
                        '<td class="cardiocomp-editable-field" id="refvci">'+(references['refvci'] || '-')+'</td> ' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">Veia Cava Inferior (Expiração):</td>' +
                        '<td class="cardiocomp-editable-field edt" id="vcie"></td> ' +
                        '<td class="cardiocomp-cell">mm</td>' +
                        '<td class="cardiocomp-editable-field" id="refvcie">'+(references['refvcie'] || '-')+'</td> ' +
                    '</tr>' +

                    '<tr class="cardiocomp-row">' +
                        '<td class="cardiocomp-cell">Variação Veia Cava Inferior:</td>' +
                        '<td class="cardiocomp-editable-field edt" id="vvci"></td> ' +
                        '<td class="cardiocomp-cell">mm</td>' +
                        '<td class="cardiocomp-editable-field" id="refvvci">'+(references['refvvci'] || '-')+'</td> ' +
                    '</tr>' +
                '</table>';
        }

    }