
import Command from '@ckeditor/ckeditor5-core/src/command';

export default class insertPageBreakCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            this.editor.model.insertContent( createPageBreak( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'pageBreakWrapper' );

        this.isEnabled = allowedIn !== null;
    }
}

function createPageBreak( writer ) {
    const pageBreakWrapper = writer.createElement( 'pageBreakWrapper' );
    const pageBreakContent = writer.createElement( 'pageBreakContent' );

    writer.append( pageBreakContent, pageBreakWrapper );

    return pageBreakWrapper;
}