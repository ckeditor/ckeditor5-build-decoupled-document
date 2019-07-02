import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import icon from '../icon/pagebreak.svg';

export default class PageBreakUI extends Plugin {
    init() {

        const editor = this.editor;
        const t = editor.t;

        editor.ui.componentFactory.add( 'pageBreak', locale => {
            const command = editor.commands.get( 'insertPageBreak' );
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                label: 'Inserir quebra de página',
                icon: icon,
                tooltip: true
            } );

            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            this.listenTo( buttonView, 'execute', () => editor.execute( 'insertPageBreak' ) );

            return buttonView;
        } );
    }
}